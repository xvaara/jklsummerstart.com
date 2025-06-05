<template>
  <div>
    <Transition name="page">
      <video v-if="route.meta.video" id="bgvid" poster="/images/bg/bg1.jpg" playsinline autoplay muted loop>
        <!-- <source src="bg-video.webm" type="video/webm"> -->
        <source src="/images/bg-video.mp4" type="video/mp4">
      </video>
    </Transition>

    <!-- foo -->
    <div id="bg1" ref="bg1" :style="style1">
      &nbsp;
    </div>
    <!-- foo -->
    <div id="bg2" ref="bg2" :style="style2">
      &nbsp;
    </div>
    <!-- foo -->
    <div class="bg-overlay">
      &nbsp;
    </div>
    <!-- foo -->

    <BContainer fluid>
      <Header :no-logo="route.meta.noLogo" :large-logo="route.meta.largeLogo" />
      <slot />
      <Footer />
    </BContainer>
  </div>
</template>

<script setup>
const route = useRoute()

const bg1 = ref(null)
const bg2 = ref(null)

const style1 = ref({
  backgroundImage: 'url(/images/bg/bg1.jpg)',
  opacity: 1,
})

const style2 = ref({
  backgroundImage: 'url(/images/bg/bg2.jpg)',
  opacity: 0,
})

const maxImage = 21

let currentImage = null
let current = 0
const pics = Array.from({ length: maxImage }).fill(0).map((_, i) => i + 1).sort(() => Math.random() - 0.5)
let nextImage = pics[current]

function changeBackgroundImage() {
  // if (route.meta.video) {
  //   return;
  // }
  currentImage = nextImage
  nextImage = pics[current++ % maxImage]
  // console.log("changing:", current, current % maxImage, currentImage, nextImage);
  if (style1.value.opacity === 1) {
    style1.value.opacity = 0
    style2.value = {
      backgroundImage: `url(/images/bg/bg${currentImage}.jpg)`,
      opacity: 1,
    }
  }
  else {
    style2.value.opacity = 0
    style1.value = {
      backgroundImage: `url(/images/bg/bg${currentImage}.jpg)`,
      opacity: 1,
    }
  }

  const ig = new Image()
  ig.src = `/images/bg${nextImage}.jpg`
}
let timer
onMounted(() => {
  changeBackgroundImage()
  timer = setInterval(changeBackgroundImage, 5000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
