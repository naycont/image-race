import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import colors from 'vuetify/util/colors'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#30ABA9',
          secondary: '#334155',
          accent: colors.orange.darken1
        }
      }
    }
  }
})

export default vuetify
