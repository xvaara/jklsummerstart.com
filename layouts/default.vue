<template>
  <div>
    <Transition name="page">
      <video v-if="route.meta.video" poster="/images/bg/bg1.jpg" id="bgvid" playsinline autoplay muted loop>
        <!-- <source src="bg-video.webm" type="video/webm"> -->
        <source src="/images/bg-video.mp4" type="video/mp4">
      </video>
    </Transition>

      <div id="bg1" ref="bg1">
        <div class="bg-overlay"></div>
      </div>
    
      <div id="bg2" ref="bg2">
        <div class="bg-overlay"></div>
      </div>
    
    <BContainer fluid>
      <Header :no-logo="route.meta.noLogo" />
      <slot />
      <Footer />
    </BContainer>
  </div>
</template>
<script setup>

const route = useRoute()

const bg1 = ref(null)
const bg2 = ref(null)


var maxImage = 21

var currentImage = null;
var nextImage = Math.floor(Math.random() * maxImage) + 1;
var currentElem = 1;


function changeBackgroundImage() {
  if (route.meta.video) {
    return;
  }
  currentImage = nextImage;
  nextImage = Math.floor(Math.random() * maxImage) + 1;
  //console.log("changing to:", currentImage);
  if (currentElem == 1) {
    bg1.value.style.opacity = 0;
    bg2.value.style.backgroundImage = "url(/images/bg/bg" + currentImage + ".jpg)";
    bg2.value.style.opacity = 1;
    currentElem = 2;
  } else {
    bg2.value.style.opacity = 0;
    bg1.value.style.backgroundImage = "url(/images/bg/bg" + currentImage + ".jpg)";
    bg1.value.style.opacity = 1;
    currentElem = 1;
  }


  
    var ig = new Image();
    ig.src = "/images/bg" + nextImage + ".jpg"
  


}
let timer
onMounted(() => {
  changeBackgroundImage();
  timer = setInterval(changeBackgroundImage, 5000);
})

onBeforeUnmount(() =>{
  clearInterval(timer)
})


</script>