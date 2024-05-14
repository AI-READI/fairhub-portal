export default (requestid: string) =>
  useFetch(`/api/downloads/request/${requestid}`, {
    headers: useRequestHeaders(["cookie"]),
  });
