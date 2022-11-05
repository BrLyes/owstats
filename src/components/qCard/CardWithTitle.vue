<template>
  <div class="row col-12 q-pa-md">
    <q-card class="col-12">
      <q-card-section class="text-center col-12 bg-secondary text-white text-uppercase ow-font">
        <div class="text-h4">{{title}}</div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <slot></slot>
      </q-card-section>
      <q-card-section class="bg-secondary"/>
    </q-card>
  </div>
</template>
<script>
export default {
  props:{
    title:{
      type: String,
      required: true,
    }
  }
}
</script>
