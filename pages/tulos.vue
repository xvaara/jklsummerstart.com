<template>
  <div>
    <SubmitResults v-if="data" :data="data" />
  </div>
</template>

<script setup>
definePageMeta({
  noLogo: true,
})
useHead({
  title: 'Ilmoita tulokset',
})
const data = ref(null)
onMounted(() => {
  const e = new EventSource('https://data.mhx.fi/jss/data')
  e.onmessage = (event) => {
    data.value = JSON.parse(event.data)
  }
})
</script>
