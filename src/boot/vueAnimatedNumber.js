import { boot } from 'quasar/wrappers'
import VueNumber from 'vue-number-animation'

export default boot(({ app }) => {
  app.use(VueNumber)
})
