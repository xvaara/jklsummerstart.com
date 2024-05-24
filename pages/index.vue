<template>
  <BContainer>
    <h2 v-if="!!countdown" class="text-center bg-block mb-3">
      Pelien alkuun <br>{{ countdown }}
    </h2>
    <div class="text-center bg-block mb-3">
      <NuxtLink to="/live" class="btn btn-primary btn-lg mx-5 my-3">
        Aikataulut ja tulosseuranta <IconChevron />
      </NuxtLink>
    </div>
    <BRow>
      <div class="col-12 col-lg">
        <Block>
          <ContentDoc path="welcome" />
        </Block>
        <!-- <Block class="mt-3">
          <h2>Ilmoittautuminen</h2>
          <a href="https://forms.gle/zViL9sVBAKKF9GvA7" class="btn btn-primary btn-lg mx-5 d-block my-3" target="_blank">
            Joukkueilmoittautuminen <IconChevron />
          </a>

          <a href="https://forms.gle/zJZrgPNWqhi39Are6" class="btn btn-primary btn-lg mx-5 d-block my-3" target="_blank">
            Pelaajailmoittautuminen<IconChevron />
          </a>
        </Block> -->
        <Block class="mt-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1857.794740781158!2d25.731889116705585!3d62.248744082773776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46857439493f3dcf%3A0x831a9d6951556837!2sViitaniemen+kentt%C3%A4!5e0!3m2!1sfi!2sfi!4v1453467822468"
            width="100%" height="350" frameborder="0" style="border:0" allowfullscreen
          />
        </Block>
      </div>
      <div class="col col-lg-6 mt-3 mt-lg-0">
        <img src="/images/asko.jpg" alt="" class="img-fluid rounded">
      </div>
    </BRow>
    <BRow class="my-5">
      <div class="col-12 col-lg-6">
        <Block>
          <ContentRenderer :value="history">
            <template #empty />
          </ContentRenderer>
        </Block>
      </div>
      <BCol class="mt-3 mt-lg-0">
        <Block>
          <h2 id="tulokset">
            Viimeisimmät voittajat
          </h2>
          <div v-for="winner in winners">
            <h6>{{ winner.title }}</h6>
            <ContentRenderer :value="winner">
              <template #empty />
            </ContentRenderer>
          </div>
          <NuxtLink to="/tulokset" class="btn btn-primary btn-lg mx-5 d-block my-3">
            Kaikki tulokset <IconChevron />
          </NuxtLink>
        </Block>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
definePageMeta({
  // layout: 'video'
  video: true,
})

useHead({
  title: 'Etusivu',
})

const { data: winners } = await useAsyncData(`winners`, () => queryContent('winners')
  .sort({ title: -1 })
  .limit(2)
  .find())

const { data: history } = await useAsyncData(`history`, () => queryContent('history').findOne())

const countdown = ref(null)

// 24.05.2024 klo 16
const end = new Date('05/25/2024 10:00 PM')

const _second = 1000
const _minute = _second * 60
const _hour = _minute * 60
const _day = _hour * 24
const _week = _hour * 24 * 7
let timer

function showRemaining() {
  const now = new Date()
  const distance = end - now
  if (distance < 0) {
    clearInterval(timer)
    countdown.value = null

    return
  }

  const weeks = Math.floor(distance / _week)
  const days = Math.floor(distance / _day) - (weeks * 7)
  const hours = Math.floor((distance % _day) / _hour)
  const minutes = Math.floor((distance % _hour) / _minute)
  const seconds = Math.floor((distance % _minute) / _second)

  let cd = ''
  if (weeks > 0)
    cd = `${weeks} viikkoa `

  if (days > 0)
    cd += `${days} päivää `

  if (hours > 0)
    cd += `${hours} tuntia `

  cd += `${minutes} minuuttia `
  cd += `${seconds} sekuntia`
  countdown.value = cd
}
onMounted(() => {
  showRemaining()
  timer = setInterval(showRemaining, 1000)
})
</script>
