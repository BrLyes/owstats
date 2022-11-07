<template>
  <q-layout view="lHh Lpr lFf"
            class="app-background">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          {{ name }} v{{ version }}
        </q-toolbar-title>
        <q-btn class="bg-secondary text-white q-ma-md"
               to="download-tracker">Download tracker
        </q-btn>
        <q-btn class="bg-secondary text-white q-ma-md"
               @click="userStore.logout()">Logout
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <CardWithTitle title="Select character">
        <q-carousel
          v-model="slide"
          transition-prev="swipe-right"
          transition-next="swipe-left"
          swipeable
          animated
          control-color="primary"
          arrows
          height="300px"
          class="bg-grey-1 shadow-2 rounded-borders ">
          <q-carousel-slide :name="1"
                            class="column no-wrap overflow-hidden-y">
            <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap ">
              <character-slide v-for="character in characters"
                               :key="character.id"
                               :character="character.name"/>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </CardWithTitle>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {api} from 'boot/axios';
import {name, version} from '../../package.json'
import CharacterSlide from 'components/qCarouselSlide/CharacterSlide';
import CardWithTitle from 'components/qCard/CardWithTitle';
import {userStore} from 'stores/user';

export default defineComponent(
  {
    name      : 'MainLayout',
    components: {
      CharacterSlide,
      CardWithTitle,
    },
    setup() {
      return {
        slide: ref(1),
      }
    },
    mounted(){
      this.getSupportedCharacters();
    },
    data() {
      return {
        userStore: userStore(),
        version,
        name,
        characters: [],
      }
    },
    methods:{
      getSupportedCharacters(){
        api.get('/chars').then((response) => {
          this.characters = response.data;
        })
      }
    }
  })
</script>
