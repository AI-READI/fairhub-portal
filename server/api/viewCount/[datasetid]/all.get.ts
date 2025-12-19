export default defineEventHandler(async (event) => {

  const { datasetid } = event.context.params as { datasetid: string };

  const dataset = await prisma.published_dataset.findUnique({
    where: {
      id: datasetid,
    },
  });

  if (!dataset) {
    console.log(`Dataset ${datasetid} not found`);

    throw createError({
      message: `Dataset ${datasetid} not found`,
      statusCode: 404,
    });
  }

  const allVersions = await prisma.published_dataset.findMany({
    where: {
      dataset_id: dataset?.dataset_id,
    },
  });

  const response = await fetch(`https://umami.aireadi.org/api/auth/login`, {
    body: JSON.stringify({
      username: process.env.UMAMI_USERNAME,
      password: process.env.UMAMI_PASSWORD,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  if (response.ok) {
    console.log("Login successful");
  } else {
    throw createError({
      message: "Error",
      statusCode: 401,
    });
  }

  const r = await response.json();
  // sourcery skip: use-object-destructuring
  const token = r.token;
  const currentTime: number = Date.now();

  let total = 0;

  for (const version of allVersions) {
    const res = await fetch(
      `https://umami.aireadi.org/api/websites/${process.env.UMAMI_WEBSITE_ID}/pageviews?unit=year&endAt=${currentTime}&startAt=1709149073000&path=/datasets/${version.id}&timezone=America/Los_Angeles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      },
    );
    if (res.ok) {
      const data = await res.json();
      console.log("BODY:", data);

      total += data.pageviews.reduce(
        (
          acc: number,
          totalNum: {
            y: number;
          },
        ) => acc + totalNum.y,
        0,
      );
      // return data
    } else {
      console.error("error");
    }
    console.log(version, "***")

  }

  return total;
});
