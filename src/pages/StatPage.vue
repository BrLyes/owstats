<template>
  <q-page class="row">
    <div class="row col-12 q-pa-md">
      <q-card class="col-12">
        <q-card-section class="text-center col-12 bg-secondary text-white text-uppercase ow-font">
          <div class="text-h4">{{ character }}</div>
        </q-card-section>
        <q-card-section class="q-pa-md">
          <div class="row col-12 justify-center">
            <div class="col-md-3 col-sm-12 flex justify-center flex-center">
              <q-img width="315px"
                     :src="'img/character/'+character+'.png'" />
              <work-in-progress title="Achievements are still in development">
                <div class="flex">
                  <badge-achievement title="Ace"
                                     src="img/achievements/ace.svg" />
                  <badge-achievement title="Feeder"
                                     src="img/achievements/meat.svg" />
                  <badge-achievement title="Bully"
                                     src="img/achievements/bull-horns.svg" />
                </div>
              </work-in-progress>
            </div>
            <div class="row col-md-9 col-sm-12 q-pa-md">

              <div class="text-h4 text-center col-12 text-primary text-uppercase ow-font">lifetime stats</div>
              <StatCard class="col-md-4 col-sm-6 col-12"
                        icon="whatshot"
                        stat="damage"
                        :value="lifetimeStats.damage"
                        unit="big" />
              <StatCard class="col-md-4 col-sm-6 col-12"
                        icon="local_hospital"
                        stat="heal"
                        :value="lifetimeStats.heal"
                        unit="big" />
              <StatCard class="col-md-4 col-sm-6 col-12"
                        icon="medication"
                        stat="mitigate"
                        :value="lifetimeStats.mitigate"
                        unit="big" />
              <StatCard class="col-md-4 col-sm-6 col-12"
                        icon="gps_fixed"
                        stat="kill"
                        :value="lifetimeStats.kill"
                        unit="big" />
              <StatCard class="col-md-4 col-sm-6 col-12"
                        icon="location_searching"
                        stat="assist"
                        :value="lifetimeStats.assist"
                        unit="big" />
              <StatCard class="col-md-4 col-sm-6 col-12"
                        icon="sick"
                        stat="death"
                        :value="lifetimeStats.death"
                        unit="big" />
            </div>
          </div>
        </q-card-section>
        <work-in-progress title="Lifetime specific character stats will track each character unique stats, such as turret kills for torb, critical accuracy for Widow, etc... this feature is still in development">
          <q-card-section class="row col-12">
            <div class="text-h4 text-center col-12 text-primary text-uppercase ow-font">
              Lifetime character specific stats
            </div>
            <StatCard class="col-md-3 col-sm-6 col-12"
                      icon="percent"
                      stat="Primary fire accuracy"
                      :value="lifetimeStats.accuracy"
                      unit="percent" />
            <StatCard class="col-md-3 col-sm-6 col-12"
                      icon="percent"
                      stat="Secondary fire accuracy"
                      :value="lifetimeStats.accuracy"
                      unit="percent" />
            <StatCard class="col-md-3 col-sm-6 col-12"
                      icon="percent"
                      stat="Some other stat"
                      :value="lifetimeStats.accuracy"
                      unit="percent" />
            <StatCard class="col-md-3 col-sm-6 col-12"
                      icon="percent"
                      stat="And an other stat"
                      :value="lifetimeStats.accuracy"
                      unit="percent" />
          </q-card-section>
        </work-in-progress>
        <q-card-section class="q-pa-md row col-12">
          <div class="text-h4 text-center col-12 text-primary text-uppercase ow-font">
            Stats last 30 games
          </div>
          <div class="row col-12 q-pa-md">
            <div class="col-6">
              <ZoomableTimeSeries icon="analytics"
                                  title="KDA last 30 games"
                                  :colors="['#2D2D2D','#FF9F00','#9C27B0']"
                                  :series="seriesStats.kda"
                                  :min-games="2" />
            </div>
            <div class="col-6">
              <ZoomableTimeSeries icon="analytics"
                                  title="DHM last 30 games"
                                  :colors="['#2D2D2D','#FF9F00','#9C27B0']"
                                  :series="seriesStats.dhm"
                                  :min-games="2" />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-md row col-12">
          <div class="text-h4 text-center col-12 text-primary text-uppercase ow-font">
            Match history
          </div>
          <div class="row col-12 q-pa-md">
            <div class="col-9">
              <global-stats :rows="gameHistory.games" />
            </div>
            <div class="col-3 bg-secondary q-pa-md">
              <div class="text-h3 ow-font text-center text-white">Averages</div>
              <StatCard class="bg-secondary col-md-4 col-sm-6 col-12"
                        icon="gps_fixed"
                        stat="kill"
                        :duration="1.25"
                        :value="averagesStats.kill"
                        unit="big" />
              <StatCard class="bg-secondary col-md-4 col-sm-6 col-12"
                        icon="whatshot"
                        stat="damage"
                        :duration="1.25"
                        :value="averagesStats.damage"
                        unit="big" />
              <StatCard class="bg-secondary col-md-4 col-sm-6 col-12"
                        icon="location_searching"
                        stat="assist"
                        :duration="1.25"
                        :value="averagesStats.assist"
                        unit="big" />
              <StatCard class="bg-secondary col-md-4 col-sm-6 col-12"
                        icon="sick"
                        stat="death"
                        :duration="1.25"
                        :value="averagesStats.death"
                        unit="big" />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="bg-secondary" />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {date} from 'quasar';
import {api} from 'boot/axios';
import ZoomableTimeSeries from 'components/apexcharts/ZoomableTimeSeries';
import GlobalStats from 'components/qTable/GlobalStats';
import StatCard from 'components/qCard/StatCard';
import BadgeAchievement from 'components/qImg/BadgeAchievement';
import WorkInProgress from 'components/qCard/WorkInProgress';

export default {
  components: {
    GlobalStats,
    ZoomableTimeSeries,
    StatCard,
    BadgeAchievement,
    WorkInProgress
  },
  data() {
    return {
      date         : date,
      character    : this.$route.params.character,
      lifetimeStats: {},
      averagesStats: {},
      seriesStats  : {},
      gameHistory  : [],
    }
  },
  created() {
    this.reloadData();
    this.$watch(
      () => this.$route.params,
      (params) =>
      {
        this.character = params.character;
        this.reloadData();
      }
    )
  },
  methods   : {
    reloadData() {
      this.gameHistory   = [];
      this.lifetimeStats = {
        damage  : null,
        kill    : null,
        assist  : null,
        death   : null,
        heal    : null,
        mitigate: null,
      };
      this.seriesStats   = {
        kda: undefined,
        dhm: undefined,
      };
      this.averagesStats = {
        damage  : null,
        kill    : null,
        assist  : null,
        death   : null,
        heal    : null,
        mitigate: null,
      };
      this.fetchGameHistory();

    },
    initSeries() {
      let damageSeries   = [];
      let healSeries     = [];
      let mitigateSeries = [];
      let killSeries     = [];
      let deathSeries    = [];
      let assistSeries   = [];
      this.gameHistory.games.forEach(
        (entry, index) =>
        {
          if (index > 29)
            {
              return;
            }
          damageSeries.unshift([index, entry.damage]);
          healSeries.unshift([index, entry.heal]);
          mitigateSeries.unshift([index, entry.mitigate]);
          killSeries.unshift([index, entry.kill]);
          deathSeries.unshift([index, entry.death]);
          assistSeries.unshift([index, entry.assist]);
        });
      this.seriesStats.kda = [
        {
          name: 'kill',
          data: killSeries
        },
        {
          name: 'death',
          data: deathSeries
        },
        {
          name: 'assist',
          data: assistSeries
        }
      ];
      this.seriesStats.dhm = [
        {
          name: 'damage',
          data: damageSeries
        },
        {
          name: 'heal',
          data: healSeries
        },
        {
          name: 'mitigate',
          data: mitigateSeries
        }
      ];
    },
    fetchGameHistory() {
      api.post('/games-history', {
        name: this.character,
      }).then((response) =>
              {
                this.gameHistory   = response.data;
                this.lifetimeStats = response.data.sum;
                this.averagesStats = response.data.average;
                this.initSeries();
              });
    },
  }
}
</script>
