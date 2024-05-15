<template>
   <div v-if="!props.noLogo" class="mt-3 d-flex">
     <img src="/images/logo.png" alt="logo" class="img-fluid mx-auto"/>
    </div>
    <div class="mb-5 d-flex" :class="props.noLogo && 'mt-3'">
      <BNav class="mx-auto bg-block">
        <BNavItem to="/">Etusivu</BNavItem>
        <BNavItem to="/info">Info</BNavItem>
        <!-- <BNavItem to="/live">Live</BNavItem> -->
        <BNavItem to="/tulokset">Tulokset</BNavItem>
      </BNav>
    </div>
</template>
<script setup>
const props = defineProps({
  noLogo: [Boolean, String]
})
</script>