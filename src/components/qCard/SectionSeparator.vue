<template>
  <div class="q-pa-md full-width">
    <div class="col-12 bg-primary text-white text-h5 text-center q-pa-md text-uppercase">
      {{title}}
    </div>
  </div>
</template>
<script>
export default {
  props:{
    title: {
      type: String,
      required: true
    }
  }
}
</script>
