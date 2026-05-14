<template>
  <BContainer>
    <Block>
      <h2 id="tulokset">
        Tulokset
      </h2>
      <div v-for="winner in winners" :key="winner.title">
        <h6>{{ winner.title }}</h6>
        <Comark :markdown="winner.markdown" />
      </div>
    </Block>
  </BContainer>
</template>

<script setup>
useHead({
  title: 'Tulokset',
})

const winners = useContent().list('/winners/').sort((a, b) => b.title.localeCompare(a.title))
</script>
