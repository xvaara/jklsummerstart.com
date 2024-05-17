<template>
  <div class="mb-1 mt-3 d-flex" :class="props.noLogo && 'mt-3'">
    <Block class="mx-auto">
      <p>
        Kysymykset ja yhteydenotot: <a href="mailto:jss@sleepwalkers.fi">jss@sleepwalkers.fi</a>
      </p>
      <p>
        Turnaus- ja peliaikataulut: Ilari Nurmela, <a href="mailto:ilari.nurmela@gmail.com">
          ilari.nurmela@gmail.com
        </a>
        , 040 734 5892
      </p>
    </Block>
  </div>
  <div class="text-center">
    &copy; 2024 Jyväskylä Sleepwalkers ry
  </div>
</template>

<script setup>
const props = defineProps({
  noLogo: [Boolean, String],
})
</script>
