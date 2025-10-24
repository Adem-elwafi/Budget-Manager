<script setup>
import { ref, watch, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'

// reactive settings
const theme = ref(localStorage.getItem('bm_theme') || 'light')
const currency = ref(localStorage.getItem('bm_currency') || 'USD')
const message = ref('')

function applyTheme() {
  // Toggle the `dark` class on the document root so Tailwind (or custom CSS) can react
  if (typeof document !== 'undefined') {
    if (theme.value === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }
}

function saveSettings(showMessage = true) {
  try {
    localStorage.setItem('bm_theme', theme.value)
    localStorage.setItem('bm_currency', currency.value)
  } catch (e) {
    // Ignore storage errors
  }
  applyTheme()
  if (showMessage) {
    message.value = 'Settings saved.'
    setTimeout(() => (message.value = ''), 2000)
  }
}

function resetDefaults() {
  theme.value = 'light'
  currency.value = 'USD'
  saveSettings()
}

// keep UI in sync with theme changes
// auto-save when theme or currency change (no UI message)
watch(theme, () => saveSettings(false))
watch(currency, () => saveSettings(false))

onMounted(() => {
  applyTheme()
})
</script>

<template>
    <NavBar></NavBar>

  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-4 dark:text-gray-200">Settings</h1>

  <div class="bg-white shadow rounded p-4 space-y-4 dark:bg-gray-900 dark:text-gray-200">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">Theme</label>
        <div class="flex items-center space-x-4">
          <label class="inline-flex items-center cursor-pointer">
            <input type="radio" v-model="theme" value="light" class="form-radio text-indigo-600 dark:text-indigo-400" />
            <span class="ml-2 dark:text-gray-200">Light</span>
          </label>
          <label class="inline-flex items-center cursor-pointer">
            <input type="radio" v-model="theme" value="dark" class="form-radio text-indigo-600 dark:text-indigo-400" />
            <span class="ml-2 dark:text-gray-200">Dark</span>
          </label>
        </div>
      </div>

      <div>
  <label class="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">Currency</label>
  <select v-model="currency" class="p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <button @click="saveSettings" class="px-4 py-2 bg-indigo-600 text-white rounded dark:bg-indigo-500 dark:hover:bg-indigo-600">Save</button>
        <button @click="resetDefaults" class="px-4 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">Reset</button>
        <span class="text-sm text-green-600 dark:text-green-400" v-if="message">{{ message }}</span>
      </div>
    </div>

  </div>
</template>
