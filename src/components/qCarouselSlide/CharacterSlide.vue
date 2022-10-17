<template>
    <q-btn class="full-height col-1 rounded-borders q-mr-md"
           @click="routeTo(character)"
           padding="0">
      <q-img class="rounded-borders full-height"
             src="~assets/img/character/Ashe.png">
        <div class="absolute-bottom text-subtitle1 text-center">
          {{ character }}
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
    }
  },
  methods : {
    routeTo(page) {
      this.$router.push(page);
    }
  },
  computed: {
    imgSrc() {
      return `~assets/img/character/${this.character}.png`;
    }
  }
}
</script>
