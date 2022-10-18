<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <!-- TODO: Add logo here -->
          {{ name }}
        </q-toolbar-title>
        <div>{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md full-width">
        <q-carousel
          v-model="slide"
          transition-prev="swipe-right"
          transition-next="swipe-left"
          swipeable
          animated
          control-color="primary"
          arrows
          height="300px"
          class="bg-grey-1 shadow-2 rounded-borders">
          <q-carousel-slide :name="1"
                            class="column no-wrap">
            <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap ">
              <character-slide character="Ashe"/>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {name, version} from '../../package.json'
import CharacterSlide from 'components/qCarouselSlide/CharacterSlide';
import {userStore} from 'stores/user';

export default defineComponent({
  name   : 'MainLayout',
  components:{
    CharacterSlide
  },
  setup() {
    return {
      slide: ref(1),
    }
  },
  methods: {
    routeTo(page) {
      this.$router.push(page);
    },
  },
  data() {
    return {
      userStore: userStore(),
      version,
      name,
    }
  }
})
</script>
