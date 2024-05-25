<template>
  <div>
    <ScheduleNext v-if="data" :data="data" />

    <div class="d-flex justify-content-center">
      <div ref="weatherContainer" class="bg-block" style="width: min(100%, 829px);">
        <!-- <iframe ref="weather" src="/api/weather" width="100%" :height="weatherHeight" frameborder="0" @load="fixIframe" /> -->
        <iframe ref="weather" width="100%" src="about:blank" :height="weatherHeight" frameborder="0" @load="fixIframe" />
      </div>
      <div>
      <!-- <img
        ref="weatherImage" :src="img" class="svgobj emb" style="height: 300px;"
        > -->
        <!-- <img ref="weatherImage" class="svgobj emb" src="/api/weatherimage"> -->
        <!-- <object ref="weatherImage" class="svgobj emb" type="image/svg+xml" data="/api/weatherimage" /> -->
      </div>
    </div>

    <Results v-if="data" :data="data" />
  </div>
</template>

<script setup>
const weather = ref(null)
const weatherContainer = ref(null)
const weatherHeight = ref(300)

function fixIframe() {
  // console.log('fixing iframe')
  weatherHeight.value = weather.value.contentWindow.document.body.scrollHeight
  globalThis.test = weather.value.contentWindow
}

function writeWeather(data) {
  // console.log('writing weather')
  // weather.value.contentWindow.document.open()
  // weather.value.contentWindow.document.write(
  weather.value.srcdoc
    = data
      .replace('--theme-background-color: #020a14;', '--theme-background-color: transparent;')
      .replace(/\.header \{.*?\}/g, '.header { display: none; }')
      .replace(/\.subheading \{.*?\}/g, '.subheading { display: none; }')
  // )
  // weather.value.contentWindow.document.close()
}

let resizeObserver
definePageMeta({
  noLogo: true,
})
useHead({
  title: 'Live',
})
const data = ref(null)
onMounted(() => {
  const e = new EventSource('https://data.mhx.fi/jss-data')
  e.onmessage = (event) => {
    data.value = JSON.parse(event.data)
  }

  const w = new EventSource('https://data.mhx.fi/jss-weather')
  w.onmessage = (event) => {
    writeWeather(event.data)
  }

  resizeObserver = new ResizeObserver(fixIframe)
  window.addEventListener('resize', fixIframe)
  resizeObserver.observe(weatherContainer.value)
})

onUnmounted(() => {
  resizeObserver.disconnect()
})
</script>
