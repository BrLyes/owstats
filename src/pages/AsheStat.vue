<template>
  <q-page class="row">
    <SectionSeparator title="Total stats in all games" />
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
    <SectionSeparator title="Stats last 30 days" />
    <div class="row col-12">
      <div class="q-pa-md col-6">
        <ZoomableTimeSeries character="ashe"
                            icon="gps_fixed"
                            :before="date.formatDate(new Date(), 'YYYY-MM-DD')"
                            :after="date.formatDate(date.subtractFromDate(date.formatDate(new Date(), 'YYYY-MM-DD'), {days: 30}),'YYYY-MM-DD')"
                            stat="accuracy"
                            :min-games="20"
        />
      </div>
      <div class="q-pa-md col-6">
        <ZoomableTimeSeries character="ashe"
                            icon="whatshot"
                            :before="date.formatDate(new Date(), 'YYYY-MM-DD')"
                            :after="date.formatDate(date.subtractFromDate(date.formatDate(new Date(), 'YYYY-MM-DD'), {days: 30}),'YYYY-MM-DD')"
                            :min-games="20"
                            stat="damage"
        />
      </div>
    </div>
    <SectionSeparator title="Average per game stats" />
    <div class="row col-12 q-pa-md" v-if="averageStatsLoaded">
      <StatCard character="ashe"
                   icon="gps_fixed"
                   stat="accuracy"
                   :value="averageStats.accuracy.toFixed(2)"
                   unit="%" />
      <StatCard character="ashe"
                   icon="whatshot"
                   stat="damage"
                   :value="averageStats.damage.toFixed(2)"
                   unit="" />
      <StatCard character="ashe"
                   icon="location_searching"
                   stat="kill"
                   :value="averageStats.kill.toFixed(2)"
                   unit="" />
      <StatCard character="ashe"
                   icon="sick"
                   stat="death"
                   :value="averageStats.death.toFixed(2)"
                   unit="" />
    </div>
    <SectionSeparator title="Latest stats" />
    <div class="q-pa-md full-width">
      <global-stats character="ashe" />
    </div>
  </q-page>
</template>

<script>
import {date} from 'quasar';
import {api} from 'boot/axios';
import ZoomableTimeSeries from 'components/apexcharts/ZoomableTimeSeries';
import GlobalStats from 'components/qTable/GlobalStats';
import SectionSeparator from 'components/qCard/SectionSeparator';
import StatCard from 'components/qCard/StatCard';

export default {
  components: {
    GlobalStats,
    ZoomableTimeSeries,
    StatCard,
    SectionSeparator
  },
  data() {
    return {
      date: date,
      character: "Ashe",
      totalStats : null,
      totalStatsLoaded : false,
      averageStats : null,
      averageStatsLoaded : false
    }
  },
  mounted() {
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
