<template>
  <div class="bg-block text-center mx-auto col-12 col-lg-6 p-3 mb-3">
    <h1>Tulokset {{ year }}</h1>
  </div>
    <ContentDoc>
      <template #default="{ doc }">
        <div class="bg-block p-3 col-12 col-lg-6 mx-auto">
          <ContentRenderer :value="doc" />
        </div>
      </template>
      <template #empty />
      <template #not-found />
    </ContentDoc>
  
  <ResultsLegacy :data="data" v-if="data" />
</template>

<script setup>
const { path } = useRoute()
const year = computed(() => path.split('/')[2])

const { data: resultsDoc } = await useAsyncData(`results-${path}`, () => queryContent(path).findOne())

const data = ref(null);
onMounted(() => {
  fetch(`/data/data-${year.value}.json`)
    .then(response => response.json())
    .then(json => data.value = json)
})
</script>