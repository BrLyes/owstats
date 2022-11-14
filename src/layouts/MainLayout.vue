<template>
  <q-layout view="lHh LpR lfr"
            class="app-background">
    <q-header reveal
              bordered>
      <q-toolbar>
        <q-btn dense
               flat
               round
               icon="menu"
               @click="leftDrawerOpen=!leftDrawerOpen" />
        <q-toolbar-title to="/" >
          <q-btn to="/" class="ow-font text-h4  q-ma-none" flat dense>
            {{ name }}
          </q-btn>
        </q-toolbar-title>
        <q-btn class="bg-secondary text-white q-ma-md"
               @click="userStore.logout()">Logout
        </q-btn>
      </q-toolbar>
    </q-header>


    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="260"
      :breakpoint="800"
      class="bg-primary text-white text-uppercase ow-font text-h5"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 135px;" dark>
        <q-list padding>
          <side-bar-character-item v-for="game in gamesByCharacter"
                                   :filtered="roleFilter!==null && game.character.role!==roleFilter"
                                   :key="game.character.id"
                                   :character="game.character.name"
                                   :total="game.total"
          />
        </q-list>
      </q-scroll-area>

      <div class="absolute-top bg-secondary text-center q-pa-md">
        <div class="text-h4"
             style="transform: skew(10deg)">SELECT CHARACTER
        </div>
      </div>
      <div class="absolute-top bg-primary text-center q-pa-md" style="height: 55px; margin-top: 65px;" v-if="gamesByCharacter.length>0">
        <transition
          appear
          enter-active-class="animated lightSpeedInLeft"
          leave-active-class="animated lightSpeedOutLeft"
          duration="600"
        >
        <q-tabs align="left">
          <q-item active-class="text-secondary" :active="roleFilter==='tank'" clickable @click="roleFilter='tank'">
            <q-icon name="shield"/>
          </q-item>
          <q-item active-class="text-secondary" :active="roleFilter==='damage'"  clickable @click="roleFilter='damage'">
            <q-icon name="whatshot"/>
          </q-item>
          <q-item active-class="text-secondary" :active="roleFilter==='support'" clickable @click="roleFilter='support'">
            <q-icon name="local_hospital"/>
          </q-item>
          <q-item active-class="text-secondary" :active="roleFilter===null" clickable @click="roleFilter=null">
            <q-icon name="group_work"/>
          </q-item>
        </q-tabs>
        </transition>
      </div>
      <q-inner-loading :showing="gamesByCharacter.length===0" label="Loading..." label-class="text-primary" class="text-primary" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-h6 ow-font">
          Version {{version}}
        </q-toolbar-title>
        <q-toolbar-title align="right" class="text-h6 ow-font">
          <q-btn flat href="https://www.upwork.com/freelancers/~0127016b65801d3ec3" target="_blank">
            <q-icon name="fa-solid fa-briefcase" color="white"/>
            <q-tooltip>Hire me on upwork</q-tooltip>
          </q-btn>
          <q-btn flat href="https://github.com/BrLyes/owstats" target="_blank">
            <q-icon name="fa-solid fa-brands fa-github" color="white"/>
            <q-tooltip>Check out the github</q-tooltip>
          </q-btn>
          <q-btn flat href="https://github.com/BrLyes/owstats/issues" target="_blank">
            <q-icon name="fa-solid fa-bug" color="white"/>
            <q-tooltip>Report a bug</q-tooltip>
          </q-btn>
          <q-btn flat href="https://ko-fi.com/biromarket" target="_blank">
            <q-icon name="fa-solid fa-coffee" color="white"/>
            <q-tooltip>Buy me a kofi</q-tooltip>
          </q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
import {defineComponent, ref} from 'vue'
import {api} from 'boot/axios';
import packageInfo  from '../../package.json'
import SideBarCharacterItem from 'components/qItem/SideBarCharacterItem';
import {userStore} from 'stores/user';

export default defineComponent(
  {
    name      : 'MainLayout',
    components: {
      SideBarCharacterItem,
    },
    setup() {
      return {
        slide: ref(1),
      }
    },
    mounted() {
      this.getGamesByCharacter();
    },
    data() {
      return {
        leftDrawerOpen  : false,
        userStore       : userStore(),
        version: packageInfo.version,
        name: packageInfo.name,
        gamesByCharacter: [],
        roleFilter: null,
      }
    },
    methods   : {
      getGamesByCharacter() {
        api.get('games-by-char').then((response) =>
                               {
                                 this.gamesByCharacter = response.data;
                               })
      }
    },
  })
</script>
