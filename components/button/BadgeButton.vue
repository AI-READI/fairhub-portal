<script setup lang="ts">
interface Identifier {
  affiliationIdentifier?: string;
  affiliationIdentifierScheme?: string;
  affiliationValue?: string;
  nameIdentifierScheme?: string;
  nameIdentifierValue?: string;
  schemeURI?: string;
}

const _props = defineProps({
  type: {
    required: true,
    type: Object as PropType<Identifier>,
  },
});

function directToIdentifierPage(identifier: Identifier) {
  let url = "";
  let urlCheck = "";
  const rorUrl = "https://ror.org";
  const gridUrl = "https://grid.ac";
  const orcidUrl = "https://orcid.org";

  // Return the appropriate url based on the identifier
  if (identifier?.nameIdentifierValue) {
    if (identifier?.nameIdentifierScheme === "ORCID") {
      if (identifier?.nameIdentifierValue.includes("https")) {
        url = identifier?.nameIdentifierValue;
      } else {
        urlCheck = `${orcidUrl}/${identifier?.nameIdentifierValue}`;
        if (urlCheck === identifier?.schemeURI) {
          url = identifier?.schemeURI;
        }
        url = urlCheck;
      }
    }
    if (identifier?.nameIdentifierScheme === "ROR") {
      if (identifier?.nameIdentifierValue.includes("https")) {
        url = identifier?.nameIdentifierValue;
      } else {
        urlCheck = `${rorUrl}/${identifier?.nameIdentifierValue}`;
        if (urlCheck === identifier?.schemeURI) {
          url = identifier?.schemeURI;
        }
        url = urlCheck;
      }
    }
    if (identifier?.nameIdentifierScheme === "INSI") {
      if (identifier?.nameIdentifierValue.includes("https")) {
        url = identifier?.nameIdentifierValue;
      } else {
        urlCheck = `${gridUrl}/${identifier?.nameIdentifierValue}`;
        if (urlCheck === identifier?.schemeURI) {
          url = identifier?.schemeURI;
        }
        url = urlCheck;
      }
    }
  } else if (identifier?.affiliationValue) {
    if (identifier?.affiliationIdentifierScheme === "ORCID") {
      urlCheck = `${orcidUrl}/${identifier?.affiliationIdentifier}`;
      if (urlCheck === identifier.schemeURI) {
        url = identifier?.schemeURI;
      }
      url = urlCheck;
    }
    if (identifier?.affiliationIdentifierScheme === "ROR") {
      urlCheck = `${rorUrl}/${identifier?.affiliationIdentifier}`;
      if (urlCheck === identifier.schemeURI) {
        url = identifier?.schemeURI;
      }
      url = urlCheck;
    }
    if (identifier?.affiliationIdentifierScheme === "INSI") {
      urlCheck = `${gridUrl}/${identifier?.affiliationIdentifier}`;
    }
    if (urlCheck === identifier.schemeURI) {
      url = identifier?.schemeURI;
    }
    url = urlCheck;
  }

  if (url) {
    return url;
  }
}
</script>

<template>
  <div class="flex w-auto flex-row">
    <NuxtLink
      v-if="
        _props.type?.nameIdentifierScheme === 'ORCID' ||
        _props.type?.affiliationIdentifierScheme === 'ORCID'
      "
      :to="directToIdentifierPage(_props.type)"
      target="_blank"
    >
      <n-button
        text
        class="rounded-full p-1 transition-all hover:!bg-cyan-100"
        type="info"
      >
        <Icon name="simple-icons:orcid" color="#a6ce39" size="20" />
      </n-button>
    </NuxtLink>

    <NuxtLink
      v-else-if="
        _props.type?.nameIdentifierScheme === 'ROR' ||
        _props.type?.affiliationIdentifierScheme === 'ROR'
      "
      :to="directToIdentifierPage(_props.type)"
      target="_blank"
    >
      <n-button
        text
        class="rounded-full p-1 transition-all hover:!bg-cyan-100"
        type="info"
      >
        <Icon name="academicons:ror" color="#53baa1" size="20" />
      </n-button>
    </NuxtLink>

    <NuxtLink
      v-else-if="
        _props.type?.nameIdentifierScheme === 'INSI' ||
        _props.type?.affiliationIdentifierScheme === 'INSI'
      "
      :to="directToIdentifierPage(_props.type)"
      target="_blank"
    >
      <n-button
        text
        class="rounded-full p-1 transition-all hover:!bg-cyan-100"
        type="info"
        @click="directToIdentifierPage(_props.type)"
      >
        <Icon name="academicons:isni" color="#312783" size="20" />
      </n-button>
    </NuxtLink>
  </div>
</template>
