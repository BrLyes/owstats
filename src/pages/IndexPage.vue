<template>
  <q-page class="q-pa-md" v-if="$q.platform.is.electron">
    <div class="bg-negative text-primary text-h4 ow-font q-pa-md"
         v-if="!hasReqs">
      Missing requirements, did you setup the <br /><code>[Tesseract]<br/>EXE_LOCATION=</code><br /> correctly in the
      config.ini ?
      <div class="text-center">
        <q-img class="rounded-borders full-height"
               width="700px" :src="'img/howto/config-tesseract.png'" />
      </div>
      Once configured, close and re-open owstats
    </div>
    <div>
      <card-with-title title="Tracker">
        <q-card-actions>
          <div class="full-width" v-if="latest!==null">
            <work-in-progress title="Stat preview and edit is still in progress, once done this will let you see what is about to be sent and edit it for potential fixes. For now you can only preview" :enable-preview="true">
              <q-table
                class="full-width"
                :rows="rows"
                :rows-per-page-options="[0]"
                row-key="name"
                hide-bottom
              />
              <div class="text-h6 ow-font q-pa-md">Raw input:</div>
              <code>{{latest}}</code>
            </work-in-progress>
          </div>
          <div class="full-width text-h4 ow-font text-primary" v-else>
            Awaiting stats...
          </div>
          <q-btn :disable="latest===null"
            class="full-width bg-secondary text-white q-ma-md"
                 @click="sendIt">Send it
          </q-btn>
        </q-card-actions>
      </card-with-title>
    </div>
  </q-page>
</template>

<script>
import CardWithTitle from 'components/qCard/CardWithTitle';
import WorkInProgress from 'components/qCard/WorkInProgress';
import {api} from 'boot/axios';
import { useQuasar, Platform, date } from 'quasar';

export default {
  components: {
    CardWithTitle,
    WorkInProgress
  },
  setup () {
    const $q = useQuasar()
  },
  data() {
    return {
      loaded: false,
      latest: null,
      playerStats: null,
      platform: Platform,
      rows: [],
    }
  },
  methods   : {
    sendIt() {
      let payload = {
        'name': this.latest.self.hero.toUpperCase()
      };
      this.latest.players.allies.forEach(
        (item) =>
        {
          if (item.name === this.latest.self.name)
            {
              api.post('/games',  {
                'name': this.latest.self.hero.toUpperCase(),
                'kill'    : this.playerStats.elims,
                'death'   : this.playerStats.deaths,
                'assist'  : this.playerStats.assists,
                'damage'  : this.playerStats.dmg,
                'heal'    : this.playerStats.heal,
                'mitigate': this.playerStats.mit,
                'match_date':date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
              });
              this.latest=null;
              this.playerStats=null;
              window.tracker.deleteLatest();
            }
        });
    },
    getLatest() {
      this.latest = window.tracker.getLatest();
      if(this.latest!==null){
        this.latest.players.allies.forEach(
          (item) =>
          {
            if (item.name === this.latest.self.name)
              {
                this.playerStats=item;
                //Populating rows
                this.rows.push({name: "character", value: this.latest.self.hero})
                Object.keys(item).forEach((stat)=> {
                  this.rows.push({name: stat, value: this.playerStats[stat]})
                });
              }
          });
      }
    },
  },
  computed  : {
    hasReqs() {
      return window.tracker.checkReqs();
    },
  },
  mounted() {
    if(this.platform.is.electron){
      this.getLatest();
      window.addEventListener('message', (event) =>
      {
        //Listen to filewatch in electron-preload updates
        if (event.source === window && event.data === 'update')
          {
              this.getLatest();
          }
      });
    }
  }
}
</script>
