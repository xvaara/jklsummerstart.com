<template>
  <div class="container-fluid">
    <div class="d-flex my-3">
      <BDropdown type="success" class="mx-auto" :text="filterTeam || 'Valitse joukkue'">
  
        <BDropdownItem @click="teamSelect('')">Kaikki</BDropdownItem>
        <BDropdownItem v-for="xteam in teams" @click="teamSelect(xteam)">{{ xteam }}</BDropdownItem>
      </BDropdown>
    </div>
      <div class="row">
      
        <div class="col-12 col-lg-6">
          <div class="">
            <div v-for="g in filteredTimetable " class="my-3 bg-block p-1">
              <h3>{{ g.name }}</h3>
  
              <table class="table table-condensed table-striped-columns" style="--bs-body-bg: transparent; --bs-emphasis-color: white;">
                <tbody>
                  <template v-for="row in g.rows">
                    <tr v-if="row.type === 'game'">
                      <td> <strong>{{ row.time }}</strong> <span style="white-space: nowrap;"> {{ row.field }}</span> </td>
                      <td> {{ row.team1 }} <span v-if="row.pool1"> ({{ row.pool1 }})</span> </td>
                      <td style="white-space: nowrap;"> <span v-if="row.score1"> {{ row.score1 }} - {{ row.score2 }} </span> </td>
                      <td> {{ row.team2 }} <span v-if="row.pool2"> ({{ row.pool2 }})</span> </td>
                      <td class="sshideextra">
                        <a v-if="row.link && showLink" :href="row.link">
                          <span class="badge bg-secondary text-wrap"> {{ row.tpool }} </span>
                        </a>
                        <span v-else class="badge bg-secondary text-wrap"> {{ row.tpool }}</span>
                      </td>
                    </tr>
                    <tr v-else-if="row.type === 'info'" class="timetable-info">
                      <td width="20%"> <strong>{{ row.time }}</strong> <span style="white-space: nowrap;"> {{ row.place }}</span> </td>
                      <td colspan="4"> {{ row.text }} </td>

                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>


        </div>
        <div class="col-12 col-lg-6">
          <div class="bg-block my-3 p-1 p-lg-3">
            <h1>Lohkot</h1>
            <div v-for="g in filteredSlots">
              <div class="mt-3">
                <h3>{{ g.name }}</h3>
  
                <table class="table table-bordered" style="--bs-body-bg: transparent; --bs-emphasis-color: white;">
                  <tbody class="">
  
                    <tr v-for="row in g.rows ">
                      <td> {{ row.a }} </td>
                      
                      <td v-if="row.b ==='XXXX'" style="background-color: rgba(204,204,204,0.5);"> </td>
                      <td v-else> {{ row.b }} </td>
                      
                      <td v-if="row.c ==='XXXX'" style="background-color: rgba(204,204,204,0.5);"> </td>
                      <td v-else> {{ row.c }} </td>
                      
                      <td v-if="row.d ==='XXXX'" style="background-color: rgba(204,204,204,0.5);"> </td>
                      <td v-else-if="row.d"> {{ row.d }} </td>
                      
                      <td v-if="row.e ==='XXXX'" style="background-color: rgba(204,204,204,0.5);"> </td>
                      <td v-else-if="row.e"> {{ row.e }} </td>
                      
                      <td v-if="row.f ==='XXXX'" style="background-color: rgba(204,204,204,0.5);"> </td>
                      <td v-else-if="row.f"> {{ row.f }} </td>
                    </tr>
                  </tbody>
                </table>
                <div class="ms-5" style="margin-bottom: 40px;" v-if="g.notes.length > 0">
                  <span v-for="n in g.notes"> {{ n }} <br></span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-block p-3">
            <template v-for="(r,i) in rules">
              <ul class="rules mb-0" v-if="r[0] === 'li'">
                <li v-html="r[1]"></li>
              </ul>
              <template v-else>
                <component :is="r[0] || 'span'" v-html="r[1]"></component><br>
              </template>
            </template>

          </div>

        </div>
      </div>
    </div>
</template>
<script setup>


const props = defineProps({
  data: Object
})


const showLink = ref( window.location.search === '?link' )

      const timetable = ref( [])
      const teams = ref( [])
      const news = ref( [])
      const rules = ref( [])
      const slots = ref( [])
      const filterTeam = ref( decodeURI(window.location.search.substring(1)))
      const test = ref('')
    
    



    
      watch(props, () => {
        
          console.log(filterTeam.value);
            console.log(props.data);
            teams.value = props.data.teams.sort();
            news.value = props.data.news;
            rules.value = props.data.rules;
            slots.value = props.data.slots;
            timetable.value = props.data.timetable;
      

      }, { immediate: true })

      function teamSelect(team) {
        console.log(team);
        filterTeam.value = team;
        history.pushState(null, null, '?' + team);
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
    console.log(row[key], key, team)
    if (typeof row[key] !== 'string') continue
    if (row[key].includes( team)) return true
  }
  return false
}

const filteredTimetable = computed(() => {
  console.log(filterTeam.value)
  if (!filterTeam.value || filterTeam.value === 'link') return timetable.value
  return timetable.value.map((g) => {
    return {
      ...g,
      rows: g.rows.filter((row) => {
        return anyFieldMatch(row, filterTeam.value)
      })
    }
  })
})

const filteredSlots = computed(() => {
  if (!filterTeam.value) return slots.value
  return slots.value.filter((slot) => {
    return slot.rows.some((row) => {
      return anyFieldMatch(row, filterTeam.value)
    })
  })
})

</script>