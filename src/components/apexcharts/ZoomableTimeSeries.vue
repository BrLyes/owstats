<template>
  <q-card bordered>
    <q-card-section class="row no-wrap items-center">
      <q-icon :name="icon"
              size="2em" />
      <div class="text-h5 q-ml-md inline-block">{{title}}</div>
    </q-card-section>
    <q-card-section>
      <q-skeleton v-if="series===undefined" :height="this.chartOptions.chart.height+'px'" square />
      <apexchart v-else
                 ref="apexCharts"
                 type="area"
                 height="350"
                 :options="chartOptions"
                 @mounted="mounted"
                 :series="series" />
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      chartOptions: {
        chart     : {
          type   : 'area',
          stacked: false,
          height: 380,
          zoom   : {
            type          : 'x',
            enabled       : true,
            autoScaleYaxis: false
          },
          toolbar: {
            autoSelected: 'zoom'
          },
        },
        stroke    : {
          curve: 'straight',
        },
        colors    : this.colors,
        dataLabels: {
          enabled: true
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
          decimalsInFloat: 0,
        },
        xaxis     : {
          type           : 'numeric',
          decimalsInFloat: 0,
          labels         : {
            show: false,
          },
          tooltip        : {
            enabled: false,
          }
        },
        tooltip   : {
          shared         : true,
          decimalsInFloat: 0,
        },
        legend    : {
          labels: {}
        }
      },
    }
  },
  props   : {
    minGames: {
      type    : Number,
      required: false,
      default : 10
    },
    icon    : {
      type    : String,
      required: false,
    },
    series  : {
      type    : Object,
      required: true,
    },
    colors  : {
      type    : Array,
      required: false,
      default : () =>
        {
          return ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']
        }
    },
    title: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  methods : {
    mounted() {
      this.series.forEach(
        (series, index) =>
        {
          if (index > 0)
            {
              this.$refs.apexCharts.toggleSeries(series.name);
            }
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
