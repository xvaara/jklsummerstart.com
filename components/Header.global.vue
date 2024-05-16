<template>
  <div class="mt-3">
    <div class="mb-5 d-flex" >
      <BNav class="mx-auto bg-block">
        <BNavItem to="/">Etusivu</BNavItem>
        <BNavItem to="/info">Info</BNavItem>
        <!-- <BNavItem to="/live">Live</BNavItem> -->
        <BNavItem to="/tulokset">Tulokset</BNavItem>
      </BNav>
    </div>
    <Transition name="slide-fade">
      <div v-if="!props.noLogo" class="d-flex logo-container">
        <img src="/images/logo.png" alt="logo" class="img-fluid mx-auto"/>
      </div>
    </Transition>
  </div>
</template>
<script setup>
const props = defineProps({
  noLogo: [Boolean, String]
})
</script>