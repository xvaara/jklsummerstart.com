<template>
  <div>
    <div class="bg-block text-center mx-auto col-12 col-lg-6 p-3 mb-3">
      <h1>Tulokset {{ year }}</h1>
    </div>
    <div v-if="doc" class="bg-block p-3 col-12 col-lg-6 mx-auto">
      <ContentRenderer :value="doc" />
    </div>
    <div v-else class="bg-block p-3 col-12 col-lg-6 mx-auto">
      <p>No content found.</p>
    </div>

    <ResultsLegacy v-if="year <= 2023 && data" :data="data" />
    <Results v-if="year > 2023 && data" :data="data" />
  </div>
</template>

<script setup>
const { path } = useRoute()
const year = computed(() => path.split('/')[2])
useHead({
  title: `Tulokset ${year.value}`,
})

const { data: doc } = await useAsyncData(`results-${path}`, () => queryCollection('content').path(path).first())

const data = ref(null)
onMounted(() => {
  fetch(`/data/data-${year.value}.json`)
    .then(response => response.json())
    .then(json => data.value = json)
})
</script>
