<template>
  <input v-if="test" v-model="now" type="datetime-local" class="form-control">
  <div v-if="next" class="container-fluid">
    <h2 class="text-center">
      {{ current?.[0]?.datename }}
    </h2>
    <h3 v-if="current[0] !== next[0]" class="text-center">
      Now {{ now }}
    </h3>
    <div v-if="current[0] !== next[0]" class="d-flex my-3 gap-3 justify-content-center flex-wrap">
      <div v-for="e in current" :key="e" class="card bg-dark fs-4 flex-shrink-1">
        <div class="card-header">
          {{ e.time }}
        </div>
        <div v-if="e.type === 'game'" class="card-body d-flex justify-content-center aling-items-center">
          <div class="schedule-team-name">
            {{ e.team1 || e.pool1 }}
          </div>
          <div class="mx-2 border-end" style="margin-top: calc(-1 * var(--bs-card-spacer-y)); margin-bottom: calc(-1 * var(--bs-card-spacer-y)); " />
          <div class="schedule-team-name">
            {{ e.team2 || e.pool2 }}
          </div>
        </div>
        <div v-if="e.type === 'game'" class="card-footer">
          {{ e.field }}
        </div>
        <div v-if="e.type === 'info'" class="card-body d-flex justify-content-center aling-items-center">
          {{ e.text }}
        </div>
        <div v-if="e.place" class="card-footer">
          {{ e.place }}
        </div>
      </div>
    </div>
    <h3 class="text-center">
      Next
    </h3>
    <div class="d-flex my-3 gap-3 justify-content-center flex-wrap">
      <div v-for="e in next" :key="e" class="card bg-dark fs-4 flex-shrink-1">
        <div class="card-header">
          {{ e.time }}
        </div>
        <div v-if="e.type === 'game'" class="card-body d-flex justify-content-center aling-items-center">
          <div class="schedule-team-name">
            {{ e.team1 || e.pool1 }}
          </div>
          <div class="mx-2 border-end" style="margin-top: calc(-1 * var(--bs-card-spacer-y)); margin-bottom: calc(-1 * var(--bs-card-spacer-y)); " />
          <div class="schedule-team-name">
            {{ e.team2 || e.pool2 }}
          </div>
        </div>
        <div v-if="e.type === 'game'" class="card-footer">
          {{ e.field }}
        </div>
        <div v-if="e.type === 'info'" class="card-body d-flex justify-content-center aling-items-center">
          <div class="">
            {{ e.text }}
          </div>
        </div>
        <div v-if="e.place" class="card-footer">
          {{ e.place }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
})

const timetable = ref([])
const now = ref(new Date().toISOString().slice(0, 16)) // '2024-05-25T11:59' format
setInterval(() => {
  // console.log('check', now.value)
  if (new Date(now.value).getTime() + 60000 < new Date().getTime()) {
    // console.log('now', now.value)
    now.value = new Date()// .toISOString().slice(0, 16)
  }
}, 1000)

const test = ref(window.location.search.includes('link'))

watch(props, () => {
  timetable.value = props.data.timetable.map((d) => {
    return d.rows.flatMap((r) => {
      const _d = new Date(d.date)
      _d.setHours(r.time.split(':')[0])
      _d.setMinutes(r.time.split(':')[1])
      return {
        datename: d.name,
        date: _d,
        ...r,
      }
    })
  }).flat()
}, { immediate: true })

const next = computed(() => {
  const first = timetable.value.find((slot) => {
    return new Date(slot.date) > new Date(now.value)
  })
  if (!first)
    return null

  const arr = timetable.value.filter((slot) => {
    return new Date(slot.date) >= new Date(first.date) && new Date(slot.date) < new Date(first.date).setMinutes(new Date(first.date).getMinutes() + 30)
  })
  if (arr.length === 0)
    return [first]
  return arr
})
const current = computed(() => {
  const first = timetable.value.find((slot) => {
    return new Date(slot.date) > new Date(now.value).setMinutes(new Date(now.value).getMinutes() - 30)
  })
  if (!first)
    return null

  return timetable.value.filter((slot) => {
    return new Date(slot.date) >= new Date(first.date) && new Date(slot.date) < new Date(first.date).setMinutes(new Date(first.date).getMinutes() + 30)
  })
})
</script>
