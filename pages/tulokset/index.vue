<template>
  <BContainer>
    <Block>
      <h2 id="tulokset">
        Tulokset
      </h2>
      <div v-for="winner in winners" :key="winner.title">
        <h6>{{ winner.title }}</h6>
        <ContentRenderer :value="winner">
          <template #empty />
        </ContentRenderer>
      </div>
    </Block>
  </BContainer>
</template>

<script setup>
useHead({
  title: 'Tulokset',
})

const { data: winners } = await useAsyncData(`winners`, () => queryCollection('content')
  .where('path', 'LIKE', '/winners/%')
  .order('title', 'DESC')
  .all())
</script>
