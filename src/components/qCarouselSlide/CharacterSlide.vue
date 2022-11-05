<template>
    <q-btn class="full-height col-1 rounded-borders q-mr-md"
           :to="character"
           :disable="wip"
           padding="0">
      <q-img class="rounded-borders full-height"
             :src="imgSrc">
        <div :class="
        {
          'absolute-bottom text-subtitle1 text-center': !wip,
          'absolute-full text-subtitle1 flex justify-center items-center': wip
        }">
          {{wip ? "Work in progress" : character}}
        </div>
      </q-img>
    </q-btn>
</template>
<script>
export default {
  props   : {
    character: {
      name: {
        type    : String,
        required: true
      }
    },
    wip: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  computed: {
    imgSrc() {
      return './img/character/'+this.character+'.png';
    }
  }
}
</script>
