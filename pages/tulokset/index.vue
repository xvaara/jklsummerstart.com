<template>
  <BContainer>
    <Block>
      <h2 id="tulokset">Tulokset</h2>
      <div v-for="winner in winners">
        <h6>{{ winner.title }}</h6>
        <ContentRenderer :value="winner">
          <template #empty />
        </ContentRenderer>
  
      </div>
    </Block>
  </BContainer>
</template>
<script setup>

const { data: winners, error } = await useAsyncData(`winners`, () => queryContent('winners')
  .sort({ title: -1})
  .find())

</script>