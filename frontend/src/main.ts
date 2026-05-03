import { createApp } from 'vue'
import { Icon } from 'leaflet'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import './styles/theme.css'
import './styles/motion.css'
import './styles/layout.css'

import markerRetina from 'leaflet/dist/images/marker-icon-2x.png'
import marker from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl
Icon.Default.mergeOptions({
	iconRetinaUrl: markerRetina,
	iconUrl: marker,
	shadowUrl: markerShadow,
})

createApp(App).mount('#app')
