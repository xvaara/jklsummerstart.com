<template>
  <div class="">
    <div class="mb-5 d-flex" :class="props.largeLogo && 'flex-column-reversess'">
      <div class="col">
        <img src="/images/logo.png" alt="logo" class="img-fluid logo" :class="props.largeLogo ? 'logo-large' : 'logo-small'">
      </div>
      <div class="ms-auto mt-3 col-auto">
        <BNav class="bg-block shadow border border-secondary p-1" pills>
          <BNavItem to="/" active-class="active">
            Etusivu
          </BNavItem>
          <BNavItem to="/info" active-class="active">
            Info 2025
          </BNavItem>
          <!-- <BNavItem to="/live" active-class="active">
            Live
          </BNavItem> -->
          <BNavItem to="/tulokset" active-class="active">
            Tulokset
          </BNavItem>
        </BNav>
      </div>
    </div>
    <!-- <Transition name="slide-fade">
      <div v-if="!props.noLogo" class="d-flex logo-container">
        <img src="/images/logo.png" alt="logo" class="img-fluid mx-auto" :class="{ 'w-50': props.smallLogo }">
      </div>
    </Transition> -->
  </div>
</template>

<script setup>
const props = defineProps({
  noLogo: [Boolean, String],
  largeLogo: [Boolean, String],
})
</script>
