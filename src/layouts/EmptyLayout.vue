<template>
  <q-layout view="lHh Lpr lFf"
            class="app-background">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
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
import packageInfo from '../../package.json'
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
      version: packageInfo.version,
      name: packageInfo.name,
    }
  }
})
</script>
