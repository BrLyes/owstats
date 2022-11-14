<template>
  <div class="q-ma-md">
    <q-img width="60px"
           :src="src">
      <q-tooltip class="bg-red"
                 :offset="[10, 10]">
        {{ title }}
      </q-tooltip>
    </q-img>
  </div>
</template>
<script>
export default {
  props:{
    src  : {
      type    : String,
      required: true,
    },
    title: {
      type    : String,
      required: true,
    }
  }
}
</script>
