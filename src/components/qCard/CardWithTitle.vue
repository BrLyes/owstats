<template>
  <div class="row col-12 q-pa-md">
    <q-card class="col-12">
      <q-card-section class="text-center col-12 bg-primary text-white text-uppercase">
        <div class="text-h5">{{title}}</div>
      </q-card-section>
      <q-card-section>
        <slot></slot>
      </q-card-section>
      <q-card-section class="bg-primary"/>
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
