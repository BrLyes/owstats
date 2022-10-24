<template>
  <q-table
    class="my-sticky-header-table"
    ref="globalStatsTable"
    :rows="rows"
    :columns="columns"
    title="Global stats"
    row-key="id"
    virtual-scroll
    :rows-per-page-options="[10]"
    flat
    bordered
  />
</template>
<script>
import {api} from 'boot/axios';
import {date} from 'quasar';

const columns = [
  {
    name    : 'kill',
    align   : 'center',
    label   : 'Kills',
    field   : 'kill',
    sortable: true
  },
  {
    name    : 'death',
    align   : 'center',
    label   : 'Death',
    field   : 'death',
    sortable: true
  },
  {
    name    : 'assist',
    align   : 'center',
    label   : 'Assists',
    field   : 'assist',
    sortable: true
  },
  {
    name : 'ka/d',
    label: 'KA/D',
    field: row => ((row.kill + row.assist) / row.death).toFixed(2)
  },
  {
    name    : 'damage',
    label   : 'Damage',
    field   : 'damage',
    sortable: true
  },
  {
    name    : 'accuracy',
    label   : 'Accuracy',
    field   : row => (row.accuracy.toFixed(2)),
    sortable: true
  },
  {
    name     : 'date',
    label    : 'Date',
    field    : row => (date.formatDate(row.match_date, 'ddd DD MMM YYYY HH:mm')),
    sort     : (a, b) => date.formatDate(a, 'x') - date.formatDate(b, 'x'),
    sortOrder: 'da',
    sortable : true
  },
]

export default {
  props  : {
    extraColumns: {
      type    : Array,
      required: false,
    },
    character   : {
      name    : String,
      required: true,
    }
  },
  data() {
    return {
      rows: []
    }
  },
  setup() {
    return {
      columns,
    }
  },
  mounted() {
    columns.concat(this.extraColumns);
    this.fetchData();
    this.$refs.globalStatsTable.sort('date')
  },
  methods: {
    fetchData() {
      api.post('/stat-all', {
        name: this.character,
      }).then((response) =>
              {
                this.rows = response.data;
              });
    },
  }
}
</script>
