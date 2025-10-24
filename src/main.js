import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Apply persisted theme before mounting so the app loads in the chosen mode
if (typeof document !== 'undefined') {
	try {
		const storedTheme = localStorage.getItem('bm_theme')
		if (storedTheme === 'dark') document.documentElement.classList.add('dark')
		else document.documentElement.classList.remove('dark')
	} catch (e) {
		// ignore (e.g. localStorage unavailable)
	}
}

const app = createApp(App)

app.use(router)
app.mount('#app')