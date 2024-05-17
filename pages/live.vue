<template>
  <div>
    <ScheduleNext :data="data" v-if="data"/>
    <Results :data="data" v-if="data" />
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
  const e = new EventSource('https://data.mhx.fi/jss-data');
  e.onmessage = (event) => {
    data.value = JSON.parse(event.data);
  };
})
</script>