<template>
  <BContainer>
    <div class="bg-block p-3">
      <Comark v-if="page" :markdown="page.markdown" />
    </div>
  </BContainer>
</template>

<script lang="ts" setup>
const route = useRoute()
const page = useContent().get(route.path)
</script>
