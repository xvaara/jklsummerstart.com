<template>
  <BContainer>
    <div class="bg-block p-3">
      <ContentRenderer v-if="page" :value="page" />
    </div>
  </BContainer>
</template>

<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>
