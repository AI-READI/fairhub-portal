import JsonViewer from "vue-json-viewer";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("JsonViewer", JsonViewer);
});
