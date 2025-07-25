import dayjs from "dayjs";

export default defineEventHandler(async (_event) => {
  protectRoute(_event);
  const userDetails = _event.context.userDetails;

  const userRequests = await prisma.download_request.findMany({
    orderBy: [
      {
        published_dataset: {
          study_title: "asc",
        },
      },
      {
        published_dataset: {
          title: "asc",
        },
      },
      {
        published_dataset: {
          version_title: "desc",
        },
      },
      {
        created_at: "asc",
      },
    ],
    select: {
      id: true,
      approval: {
        select: {
          approval_status: true,
        },
      },
      created_at: true,
      dataset_id: true,
      download_uri: true,
      expires_at: true,
      folders_selected: true,
      published_dataset: {
        select: {
          title: true,
          study_title: true,
          version_title: true,
        },
      },
      status: true,
    },
    where: {
      user_details_id: userDetails.id,
    },
  });

  return {
    data: userRequests.map((request) => ({
      id: request.id,
      approval_status: request.approval.approval_status,
      created_at: dayjs
        .unix(Number(BigInt(request.created_at)))
        .format("MMM D, YYYY"),
      dataset_id: request.dataset_id.trim(),
      dataset_title: request.published_dataset?.title || "N/A",
      download_uri: request.download_uri,
      expires_at: request.expires_at
        ? dayjs.unix(Number(BigInt(request.expires_at))).format("MMM D, YYYY")
        : null,
      folders_selected: request.folders_selected,
      status: request.status,
      study_title: request.published_dataset?.study_title || "N/A",
      version_title: request.published_dataset?.version_title || "N/A",
    })),
  };
});
