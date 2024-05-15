<template>
  
  <video poster="/images/bg/bg1.jpg" id="bgvid" playsinline autoplay muted loop>
    <!-- <source src="bg-video.webm" type="video/webm"> -->
    <source src="/images/bg-video.mp4" type="video/mp4">
  </video>

  <div class="bg-overlay"></div>

  <main>
    <slot />
  </main>
</template>
<script setup>


</script>