<template>
  <div class="container">
    <BFormCheckbox v-model="showAll" switch>
      Näytä kaikki
    </BFormCheckbox>
    <div class="row">
      <div class="col">
        <div class="">
          <div v-for="g in filteredTimetable " :key="g.name" class="my-3 bg-block p-1">
            <h3>{{ g.name }}</h3>

            <table class="table table-condensed table-striped-columns" style="--bs-body-bg: transparent; --bs-emphasis-color: white;">
              <tbody>
                <template v-for="row in g.rows">
                  <tr v-if="row.type === 'game'" :key="row.tpool" class="cursor-pointer" @click="selectGame(row)">
                    <td> <strong>{{ row.time }}</strong> <span style="white-space: nowrap;"> {{ row.field }}</span> </td>
                    <td> {{ row.team1 }} <span v-if="row.pool1"> ({{ row.pool1 }})</span> </td>
                    <td style="white-space: nowrap; text-align: center;">
                      <span v-if="row.score1"> {{ row.score1 }} - {{ row.score2 }} </span>
                    </td>
                    <td> {{ row.team2 }} <span v-if="row.pool2"> ({{ row.pool2 }})</span> </td>
                    <td class="">
                      <span class="d-none d-lg-inline-block badge bg-secondary text-wrap"> {{ row.tpool }}</span>
                    </td>
                  </tr>
                  <tr v-else-if="row.type === 'info'" :key="row.time" class="timetable-info">
                    <td width="20%">
                      <strong>{{ row.time }}</strong> <span style="white-space: nowrap;"> {{ row.place }}</span>
                    </td>
                    <td colspan="4">
                      <span class="info-text">
                        {{ row.text }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="row === selected" :key="`${row.tpool}form`">
                    <td colspan="5">
                      <div class="d-flex justify-content-center">
                        <span class="d-none d-lg-inline-block bg-secondary text-wrap px-3 py-1 rounded mx-3 fs-3">
                          {{ row.tpool }}
                        </span>
                        <span class="fs-3">{{ row.team1 }} - {{ row.team2 }}</span>
                      </div>

                      <iframe :src="`${row.link}&embedded=true`" width="100%" height="900px" onload="resizeIframe(this)" />
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
})

const showLink = ref(window.location.search === '?link')

const timetable = ref([])
const teams = ref([])
const showAll = ref(false)
const rules = ref([])
const selected = ref(null)

globalThis.resizeIframe = (obj) => {
  console.log('o', obj.contentWindow.window)
  obj.addEventListener('message', (e) => {
    console.log('e', e)
  })
  globalThis.obj = obj
  // obj.style.height = `${obj.contentWindow.document.body.scrollHeight}px`
}

watch(props, () => {
  // console.log(filterTeam.value)
  // console.log(props.data)
  teams.value = [...props.data.teams].sort()
  timetable.value = props.data.timetable
}, { immediate: true })

// created: function () {
//   var vm = this;
//   this.loadData();
//   var sub = new NchanSubscriber('/sub');
//   sub.on("message", function (message, message_metadata) {
//     var nd = JSON.parse(message);
//     console.log(nd);
//     vm.teams = nd.teams;
//     vm.news = nd.news;
//     vm.rules = nd.rules;
//     vm.slots = nd.slots;
//     vm.timetable = nd.timetable;
//   });
//   sub.start();

function selectGame(row) {
  if (selected.value === row)
    selected.value = null
  else
    selected.value = row
}

const filteredTimetable = computed(() => {
  return timetable.value.map((g) => {
    return {
      ...g,
      rows: g.rows.filter((row) => {
        if (row.type !== 'game')
          return false
        return !(row.score1 || row.score2) || showAll.value
      }),
    }
  }).filter(g => g.rows.length > 0)
})
</script>
