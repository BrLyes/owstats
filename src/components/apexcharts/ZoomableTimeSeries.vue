<template>
  <q-card bordered>
    <q-card-section class="row no-wrap items-center">
      <q-icon :name="icon"
              size="2em" />
      <div class="text-h5 q-ml-md inline-block">{{ ucFirstStat }} last 30 days ({{ games }} games)</div>
    </q-card-section>
    <q-card-section v-if="games>minGames">
      <apexchart type="area"
                 height="350"
                 :options="chartOptions"
                 :series="series" />
    </q-card-section>
    <q-card-section v-else>
      <div class="flex-center flex text-h6"
           style="height: 350px;">
        Not enough games (at least {{ minGames }} are needed)
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import {api} from 'boot/axios';
import {date} from 'quasar';

export default {
  data() {
    return {
      series      : null,
      games       : null,
      chartOptions: {
        chart     : {
          type   : 'area',
          stacked: false,
          height : 350,
          zoom   : {
            type          : 'x',
            enabled       : true,
            autoScaleYaxis: false
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers   : {
          size: 0,
        },
        fill      : {
          type    : 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors : false,
            opacityFrom   : 0.5,
            opacityTo     : 0,
            stops         : [0, 90, 100]
          },
        },
        yaxis     : {
          labels: {
            formatter: function (val)
              {
                return val.toFixed(2);
              },
          },
          title : {
            text: this.stat
          },
        },
        xaxis     : {
          type: 'datetime',
        },
        tooltip   : {
          shared: false,
          y     : {
            formatter: function (val)
              {
                return val.toFixed(2)
              }
          }
        }
      },
    }
  },
  props   : {
    stat     : {
      type    : String,
      required: true,
    },
    character: {
      type    : String,
      required: true,
    },
    before   : {
      type    : String,
      required: true,
    },
    after    : {
      type    : String,
      required: true,
    },
    minGames : {
      type    : Number,
      required: false,
      default : 10
    },
    icon     : {
      type    : String,
      required: false,
    }
  },
  mounted() {
    this.fetchData();
  },
  methods : {
    fetchData() {
      api.post('/stat-ovt',
               {
                 name  : this.character,
                 stat  : this.stat,
                 before: this.before,
                 after : this.after
               }).then((response) =>
                       {
                         let series = [];
                         response.data.forEach((entry) =>
                                               {
                                                 series.push([parseInt(date.formatDate(entry.match_date, 'x')), entry[this.stat]]);
                                               });
                         this.series = [{
                           name: this.stat,
                           data: series
                         }];
                         this.games  = response.data.length;
                       });
    }
  },
  computed: {
    ucFirstStat() {
      return this.stat.charAt(0).toUpperCase() + this.stat.slice(1);
    }
  }
}
</script>
