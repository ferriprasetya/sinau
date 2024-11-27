import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id' // Import Indonesian locale

// Extend Day.js with plugins
dayjs.extend(relativeTime)
dayjs.locale('id') // Set locale to Indonesian

window.axios = axios

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
