const viewCount: { [key: string]: string } = {
  url: "https://umami.aireadi.org/api/websites/",
};

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
    console.error("Login failed");
  }
  const r = await response.json();
  const token = r.token;

  const res = await fetch(
    `https://umami.aireadi.org/api/websites/${process.env.UMAMI_WEBSITE_ID}/pageviews?unit=year&endAt=1715631787000&startAt=1704137873000&url=/datasets/${datasetid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    },
  );
  if (response.ok) {
    const data = await res.json();
    console.log(
      "total statistics are",
      data,
      "and total count is",
      data.pageviews[0].y,
    );
    return data;
  } else {
    console.error("view count failed");
  }
  return res;
});
