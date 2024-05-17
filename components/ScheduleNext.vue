<template>
  <div class="container-fluid">
    <div class="d-flex my-3">
    
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: Object
})

const timetable = ref( [])
const now = ref(new Date())
    
watch(props, () => {
  timetable.value = props.data.timetable;
}, { immediate: true }
)


</script>