<template>
  <q-card flat>
    <div class="full-width">
      <slot></slot>
      <q-inner-loading :showing="showing"
                       @click="preview">
        <div class="bg-grey text-white text-uppercase text-center q-pa-md">
          {{ title }}
          <div v-if="enablePreview" class="text-subtitle2">Click for an early preview</div>
        </div>
      </q-inner-loading>
    </div>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      showing: true,
    }
  },
  props  : {
    title        : {
      type    : String,
      required: true,
    },
    enablePreview: {
      type    : Boolean,
      required: false,
      default : false,
    }
  },
  methods: {
    preview() {
      if (this.enablePreview)
        {
          this.showing = false;
        }
    }
  }
}
</script>
