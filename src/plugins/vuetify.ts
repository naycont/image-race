import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { aliases, md } from 'vuetify/iconsets/md'

import colors from 'vuetify/util/colors'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md
    }
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#30ABA9',
          secondary: '#334155',
          accent: colors.orange.darken1,
          background: '#f4f5fb',
          success: '#28a745',
          warning: '#FBC107',
          info: '#17a2b8'
        }
      }
    }
  }
})

export default vuetify
