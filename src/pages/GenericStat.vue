<template>
  <q-page class="row">
    <CardWithTitle title="Total stats in all games">
      <div class="row col-12 q-pa-md" v-if="totalStatsLoaded">
        <StatCard character="ashe"
                  icon="whatshot"
                  stat="damage"
                  :value="totalStats.damage"
                  unit="" />
        <StatCard character="ashe"
                  icon="location_searching"
                  stat="kill"
                  :value="totalStats.kill"
                  unit="" />
        <StatCard character="ashe"
                  icon="gps_fixed"
                  stat="assist"
                  :value="totalStats.assist"
                  unit="" />
        <StatCard character="ashe"
                  icon="sick"
                  stat="death"
                  :value="totalStats.death"
                  unit="" />
      </div>
    </CardWithTitle>
    <CardWithTitle title="Stats last 30 days">
      <div class="row col-12">
        <div class="q-pa-md col-6">
          <ZoomableTimeSeries character="ashe"
                              icon="gps_fixed"
                              :before="date.formatDate(new Date(), 'YYYY-MM-DD')"
                              :after="date.formatDate(date.subtractFromDate(date.formatDate(new Date(), 'YYYY-MM-DD'), {days: 30}),'YYYY-MM-DD')"
                              stat="accuracy"
                              :min-games="10"
          />
        </div>
        <div class="q-pa-md col-6">
          <ZoomableTimeSeries character="ashe"
                              icon="whatshot"
                              :before="date.formatDate(new Date(), 'YYYY-MM-DD')"
                              :after="date.formatDate(date.subtractFromDate(date.formatDate(new Date(), 'YYYY-MM-DD'), {days: 30}),'YYYY-MM-DD')"
                              :min-games="10"
                              stat="damage"
          />
        </div>
      </div>
    </CardWithTitle>

    <CardWithTitle title="Average per game stats">
      <div class="row col-12 q-pa-md" v-if="averageStatsLoaded">
        <StatCard character="ashe"
                  icon="whatshot"
                  stat="damage"
                  :value="averageStats.damage"
                  unit="" />
        <StatCard character="ashe"
                  icon="location_searching"
                  stat="kill"
                  :value="averageStats.kill"
                  unit="" />
        <StatCard character="ashe"
                  icon="gps_fixed"
                  stat="assist"
                  :value="averageStats.assist"
                  unit="" />
        <StatCard character="ashe"
                  icon="sick"
                  stat="death"
                  :value="averageStats.death"
                  unit="" />
      </div>
    </CardWithTitle>

    <CardWithTitle title="Latest stats">
      <div class="full-width">
        <global-stats character="ashe" />
      </div>
    </CardWithTitle>
  </q-page>
</template>

<script>
import {date} from 'quasar';
import {api} from 'boot/axios';
import ZoomableTimeSeries from 'components/apexcharts/ZoomableTimeSeries';
import GlobalStats from 'components/qTable/GlobalStats';
import StatCard from 'components/qCard/StatCard';
import CardWithTitle from 'components/qCard/CardWithTitle';

export default {
  components: {
    GlobalStats,
    ZoomableTimeSeries,
    StatCard,
    CardWithTitle
  },
  data() {
    return {
      date: date,
      character: this.$route.params.character,
      totalStats : null,
      totalStatsLoaded : false,
      averageStats : null,
      averageStatsLoaded : false
    }
  },
  created() {
    this.fetchTotalStats();
    this.fetchAverageStats();
  },
  methods   : {
    fetchTotalStats() {
      api.post('/stat-sum', {
        name: this.character,
      }).then((response) =>
              {
                this.totalStats  = response.data;
                this.totalStatsLoaded = true;
              });
    },
    fetchAverageStats() {
      api.post('/stat-avg', {
        name: this.character,
      }).then((response) =>
              {
                this.averageStats  = response.data;
                this.averageStatsLoaded = true;
              });
    }
  }
}
</script>
