<template>
  <q-card class="col-3 q-pa-md no-shadow no-border">
    <q-card-section class="bg-primary">
      <q-item class="q-pa-none row">
        <q-item-section class="text-white col-3">
          <q-icon :name="icon"
                  color="white"
                  size="36px"></q-icon>
        </q-item-section>
        <q-item-section class="text-white col-8 text-center">
          <q-item-label class="text-white text-h4 text-weight-bolder">{{value}} {{unit}}</q-item-label>
          <q-item-label>{{ucFirstStat}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props  : {
    character: {
      type    : String,
      required: true,
    },
    stat     : {
      type    : String,
      required: true
    },
    value     : null,
    icon: {
      type: String,
      required: false,
    },
    unit: {
      type: String,
      required: false,
    }
  },
  computed: {
    ucFirstStat() {
      return this.stat.charAt(0).toUpperCase() + this.stat.slice(1);
    }
  }
}
</script>
