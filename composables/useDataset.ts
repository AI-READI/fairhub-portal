export default (datasetid: string) =>
  useFetch(`/api/datasets/${datasetid}`, {
    headers: useRequestHeaders(["cookie"]),
  });
