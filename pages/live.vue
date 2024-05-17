<template>
  <div>
    <ScheduleNext v-if="data" :data="data" />
    <Results v-if="data" :data="data" />
  </div>
</template>

<script setup>
definePageMeta({
  noLogo: true,
})
useHead({
  title: 'Live',
})
const data = ref(null)
onMounted(() => {
  const e = new EventSource('https://data.mhx.fi/jss-data')
  e.onmessage = (event) => {
    data.value = JSON.parse(event.data)
  }
})
</script>
