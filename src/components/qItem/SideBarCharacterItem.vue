<template>
  <transition
    appear
    enter-active-class="animated lightSpeedInLeft"
    leave-active-class="animated lightSpeedOutLeft"
    duration="600"
  >
    <q-item v-show="!filtered"
            class="ow-hover"
            clickable
            active-class="text-secondary bg-white"
            :to="'/character/'+character"
    >
      <div class="full-width flex">
        <q-item-section avatar>
          <q-img height="60px"
                 width="50px"
                 class="bg-white"
                 style="border: 1px solid white"
                 :src="imgSrc" />
        </q-item-section>
        <q-item-section>
          <div class="text-title">
            {{ this.character }}
          </div>
          <div class="text-subtitle1 text-h6">
            {{ this.total }} - games
          </div>
        </q-item-section>
      </div>
    </q-item>
  </transition>
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
    total    : {
      name: {
        type    : Number,
        required: true,
        default : 0
      }
    },
    filtered : {
      name: {
        type    : Number,
        required: true,
        default : 0
      }
    },
  },
  methods : {
    routeTo() {
      /** This is hacky but only temporary until each character get it's own page **/
      window.location.href = '/#/character/' + this.character;
      window.location.reload();
    }
  },
  computed: {
    imgSrc() {
      return 'img/character/' + this.character + '.png';
    },
  }
}
</script>
