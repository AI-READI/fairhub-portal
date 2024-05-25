import type { QueryValue } from "ufo";

/**
 * Attempts to parse the value of the given query parameter to a numeric value.
 *
 * @param param query parameter value
 * @param defaultValue default value to return if the parameter cannot be parsed
 * @returns the parsed numeric value of the parameter, or the default value
 */
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

  const selectProps = {
    id: true,
    dataset_id: true,
    download_user_details: {
      select: {
        id: true,
        family_name: true,
        given_name: true,
      },
    },
    research_purpose: true,
  };

  const totalCount = await prisma.download_agreement.count({
    where: {
      dataset_id: datasetId,
      download_request: {
        some: {
          approval: {
            approval_status: "APPROVED",
          },
        },
      },
    },
  });

  const agreements = await prisma.download_agreement.findMany({
    orderBy: [
      {
        download_user_details: {
          family_name: "asc",
        },
      },
      {
        download_user_details: {
          given_name: "asc",
        },
      },
      {
        id: "asc",
      },
    ],
    select: selectProps,
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      dataset_id: datasetId,
      download_request: {
        some: {
          approval: {
            approval_status: "APPROVED",
          },
        },
      },
    },
  });

  return {
    data: agreements.map((item) => ({
      id: item.id,
      name: `${item.download_user_details.given_name} ${item.download_user_details.family_name}`,
      research_purpose: item.research_purpose,
    })),
    page,
    pageSize,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
});
