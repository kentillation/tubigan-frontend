import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

Pusher.logToConsole = process.env.NODE_ENV === 'development'

const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_KEY,
    cluster: process.env.VUE_APP_PUSHER_CLUSTER,
    forceTLS: process.env.VUE_APP_PUSHER_FORCE_TLS === 'true',
    encrypted: process.env.VUE_APP_PUSHER_ENCRYPTED === 'true',
    enabledTransports: ['ws', 'wss'],
    enableStats: true,
    logToConsole: true,
    authEndpoint: '/broadcasting/auth', // for local development 
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
    }
})

export default echo