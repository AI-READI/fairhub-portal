import Cite from "citation-js";

const additionalFormats: { [key: string]: string } = {
  chicago:
    "https://cdn.jsdelivr.net/gh/citation-style-language/styles/chicago-note-bibliography.csl",
  ieee: "https://cdn.jsdelivr.net/gh/citation-style-language/styles/ieee.csl",
  mla: "https://cdn.jsdelivr.net/gh/citation-style-language/styles/modern-language-association.csl",
};

export default defineEventHandler(async (event) => {
  const { datasetid } = event.context.params as { datasetid: string };

  console.log(`Citation for dataset ${datasetid}`);

  const { format } = getQuery(event);

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

  // Check if the requested format is in the additional formats
  if (Object.keys(additionalFormats).includes(format as unknown as string)) {
    // register the format

    // download the file and add it to the config
    const csl = await fetch(
      additionalFormats[format as unknown as string],
    ).then((res) => res.text());

    const config = Cite.plugins.config.get("@csl");
    config.templates.add(format, csl);
  }

  const cite = new Cite("10.60775/fairhub.1");

  const requestedCitationFormatText: string = cite.format("bibliography", {
    template: format,
  });

  return {
    formattedText: requestedCitationFormatText,
  };
});
