<template>
  <div>
    <video id="bgvid" poster="/images/bg/bg1.jpg" playsinline autoplay muted loop>
      <!-- <source src="bg-video.webm" type="video/webm"> -->
      <source src="/images/bg-video.mp4" type="video/mp4">
    </video>

    <div class="bg-overlay" />
    <slot />
  </div>
</template>

<script setup>

</script>
