<script setup lang="ts">
const push = usePush();
const route = useRoute();

const { datasetid } = route.params as { datasetid: string };

const url = ref<string>("sftp://user@1.1.1.1//home/user/a.txt");

const { data: dataset, error } = await useFetch(`/api/datasets/${datasetid}`, {
  headers: useRequestHeaders(["cookie"]),
});

if (error.value) {
  console.error(error.value);

  push.error({
    title: "Something went wrong",
    message: "Failed to fetch dataset",
  });

  throw new Error("Failed to fetch dataset");
}

const demoVersions = [
  {
    id: 1,
    title: "Version v5.4.2",
    date: "2021-05-01",
    doi: "10.5281/fairhub.1234567",
    selected: true,
  },
  {
    id: 2,
    title: "Version v5.4.1",
    date: "2021-04-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
  {
    id: 3,
    title: "Version v5.4.0",
    date: "2021-03-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
  {
    id: 4,
    title: "Version v5.3.0",
    date: "2021-02-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
  {
    id: 5,
    title: "Version v5.2.0",
    date: "2021-01-01",
    doi: "10.5281/fairhub.1234567",
    selected: false,
  },
];
</script>

<template>
  <main
    class="h-max min-h-full bg-gradient-to-b from-slate-50 to-purple-50 px-4"
  >
    <div class="mt-10 flex h-36 items-center">
      <div
        class="mx-auto flex w-full max-w-screen-xl items-center justify-between px-2"
      >
        <n-space vertical>
          <h1>{{ dataset?.title }}</h1>

          <p>{{ dataset?.description }}</p>

          <n-button size="large" type="info" secondary class="my-3">
            <template #icon>
              <Icon name="line-md:download-loop" />
            </template>
            Download this dataset
          </n-button>
        </n-space>

        <n-image
          :src="`https://api.dicebear.com/7.x/shapes/svg?seed=${dataset?.id}`"
          :alt="dataset?.title"
          class="size-32 h-32 w-32 rounded-lg"
        />
      </div>
    </div>

    <div class="mx-auto flex w-full max-w-screen-xl flex-col px-3 py-5">
      <n-tabs type="line" animated size="large">
        <n-tab-pane name="About" tab="About">
          <div class="grid grid-cols-7 gap-10">
            <n-space vertical class="col-span-5 mt-3">
              <h2 id="dataset-access-restrictions">
                Dataset access/restrictions
              </h2>

              <p>
                <em
                  >In this section, explain how the dataset can be accessed and
                  any conditions/restrictions for accessing it.</em
                >
              </p>

              <h2 id="overview-of-the-study">Overview of the study</h2>

              <p>
                <em
                  >In this section, provide a high-level description of the
                  study associated with the dataset. Include for instance
                  identifiers of the study, a brief overview of the study
                  protocol, external links (website, manuscripts, protocols,
                  etc.) to find out more about the study, etc.</em
                >
              </p>

              <h2 id="description-of-the-dataset">
                Description of the dataset
              </h2>

              <p>
                <em
                  >In this section, provide a detailed description of the
                  dataset. Include the number of study participants (refer to
                  the participants.tsv file in your dataset for additional
                  information), the data types collected, data deidentification
                  approaches if any, the overall number of files and total size
                  of the dataset, etc.</em
                >
              </p>

              <h2 id="data-standards-followed">Data standards followed</h2>

              <p>
                <em
                  >In this section, indicate the standards followed to structure
                  the dataset, format the data files, etc. Make sure to include
                  identifiers of the standards when available and/or link to the
                  associated documentation.</em
                >
              </p>

              <h2 id="resources">Resources</h2>

              <p>
                <em
                  >In this section, mention any specific resources (software,
                  documentation, manuscripts, etc.) that are required/useful for
                  using the data. Make sure to include identifiers and/or links
                  to the resources.</em
                >
              </p>

              <h2 id="how-to-cite">How to cite</h2>

              <p>
                <em
                  >In this section, provide instructions on how to cite the
                  dataset if reused. Using the American Psychological
                  Association (APA) style is suggested.</em
                >
              </p>

              <h2 id="contact">Contact</h2>

              <p>
                <em
                  >In this section, provide contact information of someone who
                  can be reached out with questions regarding the dataset. You
                  can also refer to the study_description.json and
                  dataset_description.json metadata files for information about
                  contact person/entity, authors, and contributors of the
                  dataset.</em
                >
              </p>

              <h2 id="acknowledgement">Acknowledgement</h2>

              <p>
                <em
                  >In this section, provide acknowledgement to the funding
                  source and other with identifiers and/or links as
                  applicable.</em
                >
              </p>

              <!-- eslint-disable vue/no-v-html -->
              <!-- <div
                class="prose mt-10 min-h-[300px] max-w-none bg-white text-black"
                v-html="markdownToHtml"
              /> -->
              <!-- eslint-enable vue/no-v-html -->
            </n-space>

            <n-space vertical class="col-span-2">
              <n-space
                vertical
                class="rounded-xl border border-purple-200 bg-slate-50 px-4 pb-5 pt-3"
              >
                <n-space vertical>
                  <h3>License</h3>

                  <NuxtLink
                    to="https://spdx.org/licenses/MIT.html"
                    target="_blank"
                    class="underline transition-all hover:text-slate-600"
                  >
                    MIT
                  </NuxtLink>
                </n-space>

                <n-space vertical class="mt-3">
                  <h3>Keywords</h3>

                  <n-space>
                    <n-tag type="info" size="small">Apple</n-tag>

                    <n-tag type="info" size="small">Banana</n-tag>

                    <n-tag type="info" size="small">Orange</n-tag>

                    <n-tag type="info" size="small">Pineapple</n-tag>

                    <n-tag type="info" size="small">Watermelon</n-tag>

                    <n-tag type="info" size="small">Grape</n-tag>

                    <n-tag type="info" size="small">Strawberry</n-tag>

                    <n-tag type="info" size="small">Cherry</n-tag>
                  </n-space>
                </n-space>
              </n-space>

              <n-space
                vertical
                class="rounded-xl border border-purple-200 bg-slate-50 pb-5 pt-3"
              >
                <n-space vertical :size="[0, 0]">
                  <h3 class="mb-3 px-4">Versions</h3>

                  <n-space
                    v-for="version in demoVersions"
                    :key="version.id"
                    justify="space-between"
                    align="start"
                    class="p-2 transition-all hover:bg-purple-50"
                    :class="{
                      '!bg-purple-200': version.selected,
                    }"
                  >
                    <div class="flex flex-col space-y-1">
                      <NuxtLink
                        to="#"
                        target="_blank"
                        class="text-sm font-medium transition-all hover:text-slate-600 hover:underline"
                      >
                        {{ version.title }}
                      </NuxtLink>

                      <NuxtLink
                        to="#"
                        target="_blank"
                        class="text-sm transition-all hover:text-slate-600 hover:underline"
                      >
                        {{ version.doi }}
                      </NuxtLink>
                    </div>

                    <p class="text-right text-xs text-gray-500">
                      {{ version.date }}
                    </p>
                  </n-space>
                </n-space>
              </n-space>
            </n-space>
          </div>
        </n-tab-pane>

        <n-tab-pane name="Datasheet" tab="Datasheet">
          <h1 id="datasheet-your-dataset-name-here-">Datasheet</h1>

          <p>Author: <em>Your Name Here</em></p>

          <p>Organization: <em>Your Organization Here</em></p>

          <h2 id="motivation">Motivation</h2>

          <p>
            <em
              >The questions in this section are primarily intended to encourage
              dataset creators to clearly articulate their reasons for creating
              the dataset and to promote transparency about funding
              interests.</em
            >
          </p>

          <ol>
            <li>
              <p>
                <strong>For what purpose was the dataset created?</strong> Was
                there a specific task in mind? Was there a specific gap that
                needed to be filled? Please provide a description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Who created this dataset (e.g. which team, research group)
                  and on behalf of which entity (e.g. company, institution,
                  organization)</strong
                >?
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong>What support was needed to make this dataset?</strong>
                (e.g. who funded the creation of the dataset? If there is an
                associated grant, provide the name of the grantor and the grant
                name and number, or if it was supported by a company or
                government agency, give those details.)
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p><strong>Any other comments?</strong></p>

              <p><em>Your Answer Here</em></p>
            </li>
          </ol>

          <h2 id="composition">Composition</h2>

          <p>
            <em
              >Dataset creators should read through the questions in this
              section prior to any data collection and then provide answers once
              collection is complete. Most of these questions are intended to
              provide dataset consumers with the information they need to make
              informed decisions about using the dataset for specific tasks. The
              answers to some of these questions reveal information about
              compliance with the EU’s General Data Protection Regulation (GDPR)
              or comparable regulations in other jurisdictions.</em
            >
          </p>

          <ol>
            <li>
              <p>
                <strong
                  >What do the instances that comprise the dataset represent
                  (e.g. documents, photos, people, countries)?</strong
                >
                Are there multiple types of instances (e.g. movies, users, and
                ratings; people and interactions between them; nodes and edges)?
                Please provide a description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >How many instances are there in total (of each type, if
                  appropriate)?</strong
                >
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Does the dataset contain all possible instances or is it a
                  sample (not necessarily random) of instances from a larger
                  set?</strong
                >
                If the dataset is a sample, then what is the larger set? Is the
                sample representative of the larger set (e.g. geographic
                coverage)? If so, please describe how this representativeness
                was validated/verified. If it is not representative of the
                larger set, please describe why not (e.g. to cover a more
                diverse range of instances, because instances were withheld or
                unavailable).
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong>What data does each instance consist of?</strong>
                &quot;Raw&quot; data (e.g. unprocessed text or images) or
                features? In either case, please provide a description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Is there a label or target associated with each
                  instance?</strong
                >
                If so, please provide a description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Is any information missing from individual instances?</strong
                >
                If so, please provide a description, explaining why this
                information is missing (e.g. because it was unavailable). This
                does not include intentionally removed information, but might
                include, e.g. redacted text.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Are relationships between individual instances made explicit
                  (e.g. users&#39; movie ratings, social network links)?</strong
                >
                If so, please describe how these relationships are made
                explicit.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Are there recommended data splits (e.g. training,
                  development/validation, testing)?</strong
                >
                If so, please provide a description of these splits, explaining
                the rationale behind them.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Are there any errors, sources of noise, or redundancies in
                  the dataset?</strong
                >
                If so, please provide a description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Is the dataset self-contained, or does it link to or
                  otherwise rely on external resources (e.g. websites, tweets,
                  other datasets)?</strong
                >
                If it links to or relies on external resources, a) are there
                guarantees that they will exist, and remain constant, over time;
                b) are there official archival versions of the complete dataset
                (i.e., including the external resources as they existed at the
                time the dataset was created); c) are there any restrictions
                (e.g. licenses, fees) associated with any of the external
                resources that might apply to a future user? Please provide
                descriptions of all external resources and any restrictions
                associated with them, as well as links or other access points,
                as appropriate.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Does the dataset contain data that might be considered
                  confidential (e.g. data that is protected by legal privilege
                  or by doctor-patient confidentiality, data that includes the
                  content of individuals&#39; non-public
                  communications)?</strong
                >
                If so, please provide a description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Does the dataset contain data that, if viewed directly, might
                  be offensive, insulting, threatening, or might otherwise cause
                  anxiety?</strong
                >
                If so, please describe why.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong>Does the dataset relate to people?</strong> If not, you
                may skip the remaining questions in this section.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Does the dataset identify any subpopulations (e.g. by age,
                  gender)?</strong
                >
                If so, please describe how these subpopulations are identified
                and provide a description of their respective distributions
                within the dataset.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Is it possible to identify individuals (i.e., one or more
                  natural persons), either directly or indirectly (i.e., in
                  combination with other data) from the dataset?</strong
                >
                If so, please describe how.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Does the dataset contain data that might be considered
                  sensitive in any way (e.g. data that reveals racial or ethnic
                  origins, sexual orientations, religious beliefs, political
                  opinions or union memberships, or locations; financial or
                  health data; biometric or genetic data; forms of government
                  identification, such as social security numbers; criminal
                  history)?</strong
                >
                If so, please provide a description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p><strong>Any other comments?</strong></p>

              <p><em>Your Answer Here</em></p>
            </li>
          </ol>

          <h2 id="collection">Collection</h2>

          <p>
            <em
              >As with the previous section, dataset creators should read
              through these questions prior to any data collection to flag
              potential issues and then provide answers once collection is
              complete. In addition to the goals of the prior section, the
              answers to questions here may provide information that allow
              others to reconstruct the dataset without access to it.</em
            >
          </p>

          <ol>
            <li>
              <p>
                <strong
                  >How was the data associated with each instance
                  acquired?</strong
                >
                Was the data directly observable (e.g. raw text, movie ratings),
                reported by subjects (e.g. survey responses), or indirectly
                inferred/derived from other data (e.g. part-of-speech tags,
                model-based guesses for age or language)? If data was reported
                by subjects or indirectly inferred/derived from other data, was
                the data validated/verified? If so, please describe how.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >What mechanisms or procedures were used to collect the data
                  (e.g. hardware apparatus or sensor, manual human curation,
                  software program, software API)?</strong
                >
                How were these mechanisms or procedures validated?
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >If the dataset is a sample from a larger set, what was the
                  sampling strategy (e.g. deterministic, probabilistic with
                  specific sampling probabilities)?</strong
                >
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Who was involved in the data collection process (e.g.
                  students, crowdworkers, contractors) and how were they
                  compensated (e.g. how much were crowdworkers paid)?</strong
                >
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong>Over what timeframe was the data collected?</strong>
                Does this timeframe match the creation timeframe of the data
                associated with the instances (e.g. recent crawl of old news
                articles)? If not, please describe the timeframe in which the
                data associated with the instances was created. Finally, list
                when the dataset was first published.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Were any ethical review processes conducted (e.g. by an
                  institutional review board)?</strong
                >
                If so, please provide a description of these review processes,
                including the outcomes, as well as a link or other access point
                to any supporting documentation.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong>Does the dataset relate to people?</strong> If not, you
                may skip the remainder of the questions in this section.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Did you collect the data from the individuals in question
                  directly, or obtain it via third parties or other sources
                  (e.g. websites)?</strong
                >
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Were the individuals in question notified about the data
                  collection?</strong
                >
                If so, please describe (or show with screenshots or other
                information) how notice was provided, and provide a link or
                other access point to, or otherwise reproduce, the exact
                language of the notification itself.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Did the individuals in question consent to the collection and
                  use of their data?</strong
                >
                If so, please describe (or show with screenshots or other
                information) how consent was requested and provided, and provide
                a link or other access point to, or otherwise reproduce, the
                exact language to which the individuals consented.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >If consent was obtained, were the consenting individuals
                  provided with a mechanism to revoke their consent in the
                  future or for certain uses?</strong
                >
                If so, please provide a description, as well as a link or other
                access point to the mechanism (if appropriate).
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Has an analysis of the potential impact of the dataset and
                  its use on data subjects (e.g. a data protection impact
                  analysis) been conducted?</strong
                >
                If so, please provide a description of this analysis, including
                the outcomes, as well as a link or other access point to any
                supporting documentation.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p><strong>Any other comments?</strong></p>

              <p><em>Your Answer Here</em></p>
            </li>
          </ol>

          <h2 id="preprocessing-cleaning-labeling">
            Preprocessing / Cleaning / Labeling
          </h2>

          <p>
            <em
              >Dataset creators should read through these questions prior to any
              pre-processing, cleaning, or labeling and then provide answers
              once these tasks are complete. The questions in this section are
              intended to provide dataset consumers with the information they
              need to determine whether the “raw” data has been processed in
              ways that are compatible with their chosen tasks. For example,
              text that has been converted into a “bag-of-words” is not suitable
              for tasks involving word order.</em
            >
          </p>

          <ol>
            <li>
              <p>
                <strong
                  >Was any preprocessing/cleaning/labeling of the data done
                  (e.g. discretization or bucketing, tokenization,
                  part-of-speech tagging, SIFT feature extraction, removal of
                  instances, processing of missing values)?</strong
                >
                If so, please provide a description. If not, you may skip the
                remainder of the questions in this section.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Was the &quot;raw&quot; data saved in addition to the
                  preprocessed/cleaned/labeled data (e.g. to support
                  unanticipated future uses)?</strong
                >
                If so, please provide a link or other access point to the
                &quot;raw&quot; data.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Is the software used to preprocess/clean/label the instances
                  available?</strong
                >
                If so, please provide a link or other access point.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p><strong>Any other comments?</strong></p>

              <p><em>Your Answer Here</em></p>
            </li>
          </ol>

          <h2 id="uses">Uses</h2>

          <p>
            <em
              >These questions are intended to encourage dataset creators to
              reflect on the tasks for which the dataset should and should not
              be used. By explicitly highlighting these tasks, dataset creators
              can help dataset consumers to make informed decisions, thereby
              avoiding potential risks or harms.</em
            >
          </p>

          <ol>
            <li>
              <p>
                <strong
                  >Has the dataset been used for any tasks already?</strong
                >
                If so, please provide a description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Is there a repository that links to any or all papers or
                  systems that use the dataset?</strong
                >
                If so, please provide a link or other access point.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >What (other) tasks could the dataset be used for?</strong
                >
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Is there anything about the composition of the dataset or the
                  way it was collected and preprocessed/cleaned/labeled that
                  might impact future uses?</strong
                >
                For example, is there anything that a future user might need to
                know to avoid uses that could result in unfair treatment of
                individuals or groups (e.g. stereotyping, quality of service
                issues) or other undesirable harms (e.g. financial harms, legal
                risks) If so, please provide a description. Is there anything a
                future user could do to mitigate these undesirable harms?
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Are there tasks for which the dataset should not be
                  used?</strong
                >
                If so, please provide a description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p><strong>Any other comments?</strong></p>

              <p><em>Your Answer Here</em></p>
            </li>
          </ol>

          <h2 id="distribution">Distribution</h2>

          <p>
            <em
              >Dataset creators should provide answers to these questions prior
              to distributing the dataset either internally within the entity on
              behalf of which the dataset was created or externally to third
              parties.</em
            >
          </p>

          <ol>
            <li>
              <p>
                <strong
                  >Will the dataset be distributed to third parties outside of
                  the entity (e.g. company, institution, organization) on behalf
                  of which the dataset was created?</strong
                >
                If so, please provide a description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >How will the dataset will be distributed (e.g. tarball on
                  website, API, GitHub)?</strong
                >
                Does the dataset have a digital object identifier (DOI)?
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p><strong>When will the dataset be distributed?</strong></p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Will the dataset be distributed under a copyright or other
                  intellectual property (IP) license, and/or under applicable
                  terms of use (ToU)?</strong
                >
                If so, please describe this license and/or ToU, and provide a
                link or other access point to, or otherwise reproduce, any
                relevant licensing terms or ToU, as well as any fees associated
                with these restrictions.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Have any third parties imposed IP-based or other restrictions
                  on the data associated with the instances?</strong
                >
                If so, please describe these restrictions, and provide a link or
                other access point to, or otherwise reproduce, any relevant
                licensing terms, as well as any fees associated with these
                restrictions.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Do any export controls or other regulatory restrictions apply
                  to the dataset or to individual instances?</strong
                >
                If so, please describe these restrictions, and provide a link or
                other access point to, or otherwise reproduce, any supporting
                documentation.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p><strong>Any other comments?</strong></p>

              <p><em>Your Answer Here</em></p>
            </li>
          </ol>

          <h2 id="maintenance">Maintenance</h2>

          <p>
            <em
              >As with the previous section, dataset creators should provide
              answers to these questions prior to distributing the dataset.
              These questions are intended to encourage dataset creators to plan
              for dataset maintenance and communicate this plan with dataset
              consumers.</em
            >
          </p>

          <ol>
            <li>
              <p>
                <strong
                  >Who is supporting/hosting/maintaining the dataset?</strong
                >
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >How can the owner/curator/manager of the dataset be contacted
                  (e.g. email address)?</strong
                >
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong>Is there an erratum?</strong> If so, please provide a
                link or other access point.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Will the dataset be updated (e.g. to correct labeling errors,
                  add new instances, delete instances)?</strong
                >
                If so, please describe how often, by whom, and how updates will
                be communicated to users (e.g. mailing list, GitHub)?
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >If the dataset relates to people, are there applicable limits
                  on the retention of the data associated with the instances
                  (e.g. were individuals in question told that their data would
                  be retained for a fixed period of time and then
                  deleted)?</strong
                >
                If so, please describe these limits and explain how they will be
                enforced.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >Will older versions of the dataset continue to be
                  supported/hosted/maintained?</strong
                >
                If so, please describe how. If not, please describe how its
                obsolescence will be communicated to users.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p>
                <strong
                  >If others want to extend/augment/build on/contribute to the
                  dataset, is there a mechanism for them to do so?</strong
                >
                If so, please provide a description. Will these contributions be
                validated/verified? If so, please describe how. If not, why not?
                Is there a process for communicating/distributing these
                contributions to other users? If so, please provide a
                description.
              </p>

              <p><em>Your Answer Here</em></p>
            </li>

            <li>
              <p><strong>Any other comments?</strong></p>

              <p><em>Your Answer Here</em></p>
            </li>
          </ol>
        </n-tab-pane>

        <n-tab-pane name="Study Metadata" tab="Study Metadata">
          Study Metadata
        </n-tab-pane>

        <n-tab-pane name="Dataset Metadata" tab="Dataset Metadata">
          Dataset Metadata
        </n-tab-pane>

        <n-tab-pane name="Datatype Metadata" tab="Datatype Metadata">
          Datatype Metadata
        </n-tab-pane>

        <n-tab-pane name="Files" tab="Files"> File Viewer </n-tab-pane>

        <n-tab-pane name="Dashboard" tab="Dashboard"> Dashboard </n-tab-pane>

        <n-tab-pane name="Access Data" tab="Access Data">
          Please complete the requirements below to access the dataset

          <n-divider />

          <n-collapse>
            <n-collapse-item title="Step 1: Login to the portal" name="1">
              <n-space vertical>
                <p>
                  Please login to the portal using your login.gov account to
                  access the dataset.
                </p>

                <n-button type="info" secondary class="my-3">
                  <template #icon>
                    <Icon name="line-md:login" />
                  </template>
                  Login through login.gov
                </n-button>
              </n-space>
            </n-collapse-item>

            <n-collapse-item title="Step 2: Sign attestation" name="2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                quod laboriosam vero, possimus molestiae delectus! Autem sunt
                voluptatibus delectus quisquam ut inventore, reprehenderit
                perferendis amet. Veritatis, voluptatibus. Neque, iste
                temporibus?
              </p>

              <n-space>
                <n-input placeholder="Enter your name" class="mt-3" />

                <n-button type="info" secondary class="my-3">
                  <template #icon>
                    <Icon name="mdi:abjad-arabic" />
                  </template>
                  Sign
                </n-button>
              </n-space>
            </n-collapse-item>

            <n-collapse-item title="Step3: Select data types" name="3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Exercitationem dicta laudantium eum consequatur perferendis
                omnis, id, possimus quisquam asperiores dolorum at?
                Necessitatibus facilis fuga maiores. Non, quod temporibus!
                Animi, esse!
              </p>
            </n-collapse-item>

            <n-collapse-item title="Step 4: Get access link" name="4">
              <n-input-group>
                <n-input v-model:value="url" />

                <n-button type="info" secondary>
                  <template #icon>
                    <Icon name="mdi:content-copy" />
                  </template>
                  Copy to clipboard
                </n-button>
              </n-input-group>
            </n-collapse-item>
          </n-collapse>
        </n-tab-pane>
      </n-tabs>
    </div>
  </main>
</template>
