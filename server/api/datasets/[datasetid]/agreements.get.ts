import { sqltag, raw } from "@prisma/client/runtime/library";
import type { QueryValue } from "ufo";
import dayjs from "dayjs";
const sql = sqltag;

type Agreement = {
  id: string;
  affiliation?: string;
  created_at: string;
  dataset_id?: string;
  family_name: string;
  given_name: string;
  organization: string;
  research_purpose: string;
  version_title: string;
};

function parseNumericParamWithDefault(
  param: QueryValue,
  defaultValue: number,
): number {
  let parsedValue = NaN;
  if (typeof param === "string") {
    parsedValue = Number.parseInt(param);
  }
  return Number.isFinite(parsedValue) ? parsedValue : defaultValue;
}

export default defineEventHandler(async (event) => {
  const datasetId = event.context.params?.datasetid;
  const query = getQuery(event);
  const page = parseNumericParamWithDefault(query.page, 1);
  const pageSize = parseNumericParamWithDefault(query.pageSize, 10);

  const filteredWords = query.filteredWord?.toString().trim().toLowerCase();
  const shouldSearch = !!filteredWords?.trim();

  if (!datasetId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Dataset ID parameter is required",
    });
  }

  if (page <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Page parameter must be greater than 0, but was ${page}`,
    });
  }

  if (pageSize <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Page size parameter must be greater than 0, but was ${pageSize}`,
    });
  }

  const selectProps = [
    "da.id::text AS id",
    "da.created_at::text AS created_at",
    "da.research_purpose",
    "dud.given_name",
    "dud.family_name",
    "dud.organization",
    "pd.version_title",
    "a.updated_on::text AS updated_on",
  ];

  const totalCount = await prisma.download_agreement.count({
    where: {
      download_request: {
        some: {
          approval: {
            approval_status: "APPROVED",
          },
        },
      },
      ...(shouldSearch
        ? {
            OR: [
              {
                download_user_details: {
                  given_name: { contains: filteredWords, mode: "insensitive" },
                },
              },
              {
                download_user_details: {
                  family_name: { contains: filteredWords, mode: "insensitive" },
                },
              },
              {
                download_user_details: {
                  affiliation: { contains: filteredWords, mode: "insensitive" },
                },
              },
              {
                download_user_details: {
                  organization: {
                    contains: filteredWords,
                    mode: "insensitive",
                  },
                },
              },
              {
                published_dataset: {
                  version_title: {
                    contains: filteredWords,
                    mode: "insensitive",
                  },
                },
              },
              {
                research_purpose: {
                  contains: filteredWords,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
  });

  const offset = (page - 1) * pageSize;

  const agreements = await prisma.$queryRaw<Agreement[]>(
    sql`
    SELECT ${raw(selectProps.join(", "))}
    FROM download.download_agreement da
    LEFT JOIN download.download_user_details dud ON da.user_details_id = dud.id
    LEFT JOIN public.published_dataset pd ON da.dataset_id = pd.id
    LEFT JOIN download.download_request dr ON dr.download_agreement_id = da.id
    LEFT JOIN download.download_request_approval a ON dr.approval_id = a.id
    WHERE a.approval_status = 'APPROVED'
    ${
      shouldSearch
        ? sql`
        AND (
          LOWER(dud.given_name) LIKE LOWER(${`%${filteredWords}%`}) OR
          LOWER(dud.family_name) LIKE LOWER(${`%${filteredWords}%`}) OR
          LOWER(dud.affiliation) LIKE LOWER(${`%${filteredWords}%`}) OR
          LOWER(dud.organization) LIKE LOWER(${`%${filteredWords}%`}) OR
          LOWER(pd.version_title) LIKE LOWER(${`%${filteredWords}%`}) OR
          LOWER(da.research_purpose) LIKE LOWER(${`%${filteredWords}%`}) OR
          TO_CHAR(TO_TIMESTAMP(a.updated_on::bigint), 'FMMonth FMDD, YYYY') ILIKE ${`%${filteredWords}%`}
        )`
        : sql``
    }
    ORDER BY a.updated_on DESC, dud.family_name ASC, dud.given_name ASC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `,
  );

  function serializeBigInts<T>(obj: T): T {
    if (Array.isArray(obj)) {
      return obj.map(serializeBigInts) as T;
    } else if (obj && typeof obj === "object") {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key,
          typeof value === "bigint"
            ? value.toString()
            : serializeBigInts(value),
        ]),
      ) as T;
    }
    return obj;
  }

  const serializedRows = serializeBigInts(agreements) as Agreement[];

  return {
    data: serializedRows.map((row: any) => ({
      id: row.id,
      name: `${row.given_name} ${row.family_name}`,
      affiliation: row.affiliation,
      approval_date: dayjs.unix(Number(row.updated_on)).format("MMM D, YYYY"),
      dataset_id: row.dataset_id,
      organization: row.organization,
      research_purpose: row.research_purpose,
      version_title: row.version_title,
    })),
    page,
    pageSize,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
});
