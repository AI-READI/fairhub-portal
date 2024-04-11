export default (datasetid: string) =>
  useFetch(`/api/downloads/agreement/${datasetid}`, {
    headers: useRequestHeaders(["cookie"]),
  });
