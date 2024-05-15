<template>
  <div>
    Realiaikaiset tulokset ja aikataulu
  </div>
  <!-- <ResultsLegacy :data="data" v-if="data" /> -->
</template>

<script setup>
definePageMeta({
  noLogo: true
})
const data = ref(null);
onMounted(() => {
  fetch('/data/data-2023.json')
    .then(response => response.json())
    .then(json => data.value = json)
})
</script>