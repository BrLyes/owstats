<template>
  <q-skeleton v-show="!rows" type="square" height="100%"/>
  <q-table
    v-show="rows"
    class="my-sticky-header-table"
    ref="globalStatsTable"
    :rows="rows"
    :columns="columns"
    row-key="id"
    virtual-scroll
    :rows-per-page-options="[10]"
    flat
    bordered
  />
</template>
<script>
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
    rows: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {
      columns,
    }
  },
  mounted() {
    this.$refs.globalStatsTable.sort('date')
  },
}
</script>
