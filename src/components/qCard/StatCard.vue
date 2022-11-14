<template>
  <q-card class="q-pa-md no-shadow no-border">
    <q-card-section v-if="value===null"
                    class="bg-secondary">
      <q-item class="q-pa-none row">
        <q-item-section class="text-white col-3">
          <q-skeleton type="QAvatar" />
        </q-item-section>
        <q-item-section class="text-white col-8 text-center">
          <q-item-label class="text-white text-h4 text-weight-bolder">
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section v-else
                    class="bg-secondary">
      <q-item class="q-pa-none row">
        <q-item-section class="text-white col-3">
          <q-icon :name="icon"
                  color="white"
                  size="36px"></q-icon>
        </q-item-section>
        <q-item-section class="text-white col-8 text-center">
          <q-item-label class="text-white text-h4 text-weight-bolder">
            <number from="0"
                    :to="value"
                    :format="theFormat"
                    :duration="duration"
                    easing="Power1.easeOut"
            />
            {{ symbol }}
          </q-item-label>
          <q-item-label>{{ ucFirstStat }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  props   : {
    stat     : {
      type    : String,
      required: true
    },
    value    : null,
    icon     : {
      type    : String,
      required: false,
    },
    unit     : {
      type    : String,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
      default: 5,
    }
  },
  data() {
    return {
      big: {
        thousand: 0,
        million : 0
      },
      symbol   : ""
    }
  },
  methods : {
    theFormat(number) {
      switch (this.unit)
        {
          case 'big':
            number = parseInt(number);
            if (Math.floor(number / 1000000) > 0)
              {
                this.symbol = 'M';
                return (number / 1000000).toFixed(2);
              }
            else if (Math.floor(number / 1000) > 0)
              {
                this.symbol = 'K';
                return (number / 1000).toFixed(2);
              }
            return number;
            case 'percent':
              return (number % 100).toFixed(2);
              break;
          default:
            return number;
        }
    },
    completed() {
      console.log('Animation ends!');
    },
    playAnimation() {
      this.$refs.number2.play()
    }
  },
  computed: {
    ucFirstStat() {
      return this.stat.charAt(0).toUpperCase() + this.stat.slice(1);
    }
  }
}
</script>
