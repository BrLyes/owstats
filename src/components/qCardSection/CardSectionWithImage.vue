<template>
  <q-card-section>
    <slot></slot>
    <div class="text-center">
      <a v-if="hasHref" :href="href" target="_blank">
        <q-img class="rounded-borders full-height"
               :width="width"
               :src="src" />
      </a>
      <q-img v-else class="rounded-borders full-height"
             :width="width" :src="src" />
    </div>
    <div v-if="hasHref" class="text-center">
      <i>Click the image to open in a new tab</i>
    </div>
  </q-card-section>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: false
    },
    href:{
      type: String,
      required: false,
      default: null
    },
    width: {
      type: String,
      required: false,
      default: "715px"
    }
  },
  computed:{
    hasHref(){
      return this.href !== undefined && this.href!== null && this.href!=="";
    }
  }
}
</script>
