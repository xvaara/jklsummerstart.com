<template>
  <div>
    Realiaikaiset tulokset ja aikataulu
    <!-- <ResultsLegacy :data="data" v-if="data" /> -->
  </div>
</template>

<script setup>
definePageMeta({
  noLogo: true
})
useHead({
  title: 'Live'
})
const data = ref(null);
onMounted(() => {
  fetch('/data/data-2023.json')
    .then(response => response.json())
    .then(json => data.value = json)
})
</script>