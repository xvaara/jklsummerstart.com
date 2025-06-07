<template>
  <div class="d-flex my-3">
    <BDropdown type="success" class="mx-auto" :text="filterTeam || 'Valitse joukkue'">
      <BDropdownItem @click="teamSelect('')">
        Kaikki
      </BDropdownItem>
      <BDropdownItem v-for="xteam in teams" :key="xteam" @click="teamSelect(xteam)">
        {{ xteam }}
      </BDropdownItem>
    </BDropdown>
  </div>
  <div class="row">
    <div class="col-12 col-lg-auto flex-grow-1">
      <div v-for="g in filteredTimetable " :key="g.name" class="my-3 bg-block p-1">
        <h3>{{ g.name }}</h3>

        <table class="table table-condensed table-striped-columns w-100 table-sm timetable" style="--bs-body-bg: transparent; --bs-emphasis-color: white;">
          <tbody>
            <template v-for="row in g.rows">
              <tr v-if="row.type === 'game'" :key="row.tpool">
                <th>
                  <span class="fw-bold">{{ row.time }} </span> <span style="white-space: nowrap;"> {{ row.field }}</span>
                </th>
                <td class="teamname">
                  {{ row.team1 }} <span v-if="row.pool1"> ({{ row.pool1 }})</span>
                </td>
                <td style="white-space: nowrap; text-align: center;">
                  <span v-if="row.score1 !== ''"> {{ row.score1 }} - {{ row.score2 }} </span>
                </td>
                <td class="teamname">
                  {{ row.team2 }} <span v-if="row.pool2"> ({{ row.pool2 }})</span>
                </td>
                <td class="d-none d-lg-inline-block">
                  <span class="badge bg-secondary text-wrap"> {{ row.pool }}</span>
                </td>
              </tr>
              <tr v-else-if="row.type === 'info'" :key="row.time" class="timetable-info">
                <th>
                  <span class="fw-bold">{{ row.time }}</span> <span> {{ row.place }}</span>
                </th>
                <td colspan="4">
                  <span class="info-text">
                    {{ row.text }}
                  </span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-auto" style="width: min-content">
      <div class="bg-block my-3 p-1 p-lg-3">
        <h1>Lohkot</h1>
        <div v-for="g in filteredSlots" :key="g.name">
          <div class="mt-3">
            <h3>{{ g.name }}</h3>
            <div class="table-respssonsive">
              <table class="table  table-sm slots " :class="{ 'table-bordered  slots-rotate': g.rows[0].c }" style="--bs-body-bg: transparent; --bs-emphasis-color: white;">
                <tbody class="">
                  <tr v-for="row in g.rows" :key="g.name + row.a">
                    <td> <span>{{ row.a }}</span> </td>

                    <td v-if="row.b === 'XXXX'" style="background-color: rgba(204,204,204,0.5);" />
                    <td v-else>
                      <span>{{ row.b }}</span>
                    </td>

                    <td v-if="row.c === 'XXXX'" style="background-color: rgba(204,204,204,0.5);" />
                    <td v-else-if="g.rows[0].c">
                      <span>{{ row.c }}</span>
                    </td>

                    <td v-if="row.d === 'XXXX'" style="background-color: rgba(204,204,204,0.5);" />
                    <td v-else-if="g.rows[0].d">
                      <span>{{ row.d }}</span>
                    </td>

                    <td v-if="row.e === 'XXXX'" style="background-color: rgba(204,204,204,0.5);" />
                    <td v-else-if="g.rows[0].e">
                      <span>{{ row.e }}</span>
                    </td>

                    <td v-if="row.f === 'XXXX'" style="background-color: rgba(204,204,204,0.5);" />
                    <td v-else-if="g.rows[0].f">
                      <span>{{ row.f }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="g.notes.length > 0" class="ms-5" style="margin-bottom: 40px;">
              <span v-for="n in g.notes" :key="n"> {{ n }} <br></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="bg-block p-3">
      <template v-for="(r, i) in rules">
        <ul v-if="r[0] === 'li'" :key="i" class="rules mb-0">
          <li v-html="r[1]" />
        </ul>
        <template v-else>
          <component :is="r[0] || 'span'" :key="i" v-html="r[1]" /><br :key="i">
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
})

// const showLink = ref(window.location.search === '?link')

const timetable = ref([])
const teams = ref([])
const news = ref([])
const rules = ref([])
const slots = ref([])
const filterTeam = ref(decodeURI(window.location.search.substring(1)))

watch(props, () => {
  // console.log(filterTeam.value)
  // console.log(props.data)
  teams.value = [...props.data.teams].sort()
  news.value = props.data.news
  rules.value = props.data.rules
  slots.value = props.data.slots
  timetable.value = props.data.timetable
}, { immediate: true })

function teamSelect(team) {
  // console.log(team)
  filterTeam.value = team
  history.pushState(null, null, `?${team}`)
}

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

function anyFieldMatch(row, team) {
  for (const key in row) {
    // console.log(row[key], key, team)
    if (typeof row[key] !== 'string')
      continue
    if (row[key].includes(team))
      return true
  }
  return false
}

const filteredTimetable = computed(() => {
  // console.log(filterTeam.value)
  if (!filterTeam.value || filterTeam.value === 'link')
    return timetable.value
  return timetable.value.map((g) => {
    return {
      ...g,
      rows: g.rows.filter((row) => {
        return anyFieldMatch(row, filterTeam.value)
      }),
    }
  })
})

const filteredSlots = computed(() => {
  if (!filterTeam.value || filterTeam.value === 'link')
    return slots.value
  return slots.value.filter((slot) => {
    return slot.rows.some((row) => {
      return anyFieldMatch(row, filterTeam.value)
    })
  })
})
</script>
