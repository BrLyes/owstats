<template>
  <q-layout view="lHh Lpr lFf"
            class="appBackground">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <!-- TODO: Add logo here -->
          {{ name }} v{{version}}
        </q-toolbar-title>
        <q-btn class="bg-secondary text-white q-ma-md"
               @click="goBack()">Return
        </q-btn>
        <q-btn class="bg-secondary text-white q-ma-md"
               @click="userStore.logout()">Logout
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-md q-pt-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {api} from 'boot/axios';
import {name, version} from '../../package.json'
import CharacterSlide from 'components/qCarouselSlide/CharacterSlide';
import {userStore} from 'stores/user';

export default defineComponent({
  name   : 'MainLayout',
  setup() {
    return {
      slide: ref(1),
    }
  },
  methods: {
    goBack() {
      window.history.back();
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
