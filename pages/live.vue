<template>
  <div>
    <ScheduleNext v-if="data.teams" :data="data" />

    <div class="d-flex justify-content-center">
      <div ref="weatherContainer" class="bg-block weather-container" style="width: min(100%, 829px);">
        <!-- <iframe ref="weather" src="/api/weather" width="100%" :height="weatherHeight" frameborder="0" @load="fixIframe" /> -->
        <!-- <KeepAlive>
          <iframe key="weather" ref="weather" width="100%" src="about:blank" :height="weatherHeight" frameborder="0" @load="fixIframe" />
        </KeepAlive> -->
        <div v-html="weatherHTML" />
      </div>
      <div>
      <!-- <img
        ref="weatherImage" :src="img" class="svgobj emb" style="height: 300px;"
        > -->
        <!-- <img ref="weatherImage" class="svgobj emb" src="/api/weatherimage"> -->
        <!-- <object ref="weatherImage" class="svgobj emb" type="image/svg+xml" data="/api/weatherimage" /> -->
      </div>
    </div>

    <Results v-if="data.teams" :data="data" />
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'

definePageMeta({
  noLogo: true,
})
useHead({
  title: 'Live',
})

// const weather = ref(null)
const weatherContainer = ref(null)
// const weatherHeight = ref(300)

const data = useStorage('live-data', {})
const weatherData = useStorage('live-weather-data', null)

// function fixIframe() {
//   // console.log('fixing iframe')
//   if (!weather.value || !weatherContainer.value || !weather.value.contentWindow) {
//     return
//   }
//   weatherHeight.value = weather.value.contentWindow.document.body.scrollHeight
//   globalThis.test = weather.value.contentWindow
// }

// watch(weatherData, (newValue) => {
//   if (!weather.value) {
//     return
//   }
//   weather.value.srcdoc = newValue
// }, { immediate: true })

function writeWeather(data) {
  // console.log('writing weather')
  // weather.value.contentWindow.document.open()
  // weather.value.contentWindow.document.write(

  weatherData.value
    = data
      .replace('--theme-background-color: #020a14;', '--theme-background-color: transparent;')
      .replace(/\.header \{.*?\}/g, '.header { display: none; }')
      .replace(/\.subheading \{.*?\}/g, '.subheading { display: none; }')
      .replace(/https:\/\/www\.yr\.no\/assets\/images\/weather-symbols\/dark-mode\/default\//g, '/images/weather/')
  // )
  // weather.value.contentWindow.document.close()
}

const weatherHTML = computed(() => {
  return weatherData.value
    ? weatherData.value
        .replace(/.*<body>/, '')
        .replace(/<\/body>.*/, '')
    : ''
})

// let resizeObserver

onMounted(() => {
  const e = new EventSource('https://data.mhx.fi/jss/data')
  // const e = new WebSocket('wss://data.mhx.fi/jss/data')
  e.onmessage = (event) => {
    data.value = JSON.parse(event.data)
  }

  const w = new EventSource('https://data.mhx.fi/jss/weather')
  // const w = new WebSocket('wss://data.mhx.fi/jss/weather')
  w.onmessage = (event) => {
    writeWeather(event.data)
  }

  // resizeObserver = new ResizeObserver(fixIframe)
  // window.addEventListener('resize', fixIframe)
  // resizeObserver.observe(weatherContainer.value)
  // if (weather.value && weatherData.value) {
  //   weather.value.srcdoc = weatherData.value
  // }
})

// onUnmounted(() => {
//   resizeObserver.disconnect()
// })
</script>
