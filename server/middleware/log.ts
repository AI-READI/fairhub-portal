export default defineEventHandler((event) => {
  fetch(`https://logwatch.aireadi.org/api/log/cm1bg6iw70004yk6cqx5v0oyq`, {
    body: new URLSearchParams({
      level: "trace",
      message: `New request: ${event.node.req.url}`,
    }),
    method: "POST",
  });

  console.log("New request: " + event.node.req.url);
});
