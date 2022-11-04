<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <!-- TODO: Add logo here -->
          {{ name }} v{{version}}
        </q-toolbar-title>
        <button @click="routeTo('download-tracker')">Download tracker</button>
        <button @click="userStore.logout()">Logout</button>
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
