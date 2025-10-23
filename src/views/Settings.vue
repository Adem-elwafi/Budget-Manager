<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'

const theme = ref(localStorage.getItem('bm_theme') || 'light')
const currency = ref(localStorage.getItem('bm_currency') || 'USD')
const message = ref('')

function saveSettings() {
  localStorage.setItem('bm_theme', theme.value)
  localStorage.setItem('bm_currency', currency.value)
  message.value = 'Settings saved.'
  setTimeout(() => (message.value = ''), 2000)
}


function resetDefaults() {
  theme.value = 'light'
  currency.value = 'USD'
  saveSettings()
}
</script>

<template>
    <NavBar></NavBar>

  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-4">Settings</h1>

    <div class="bg-white shadow rounded p-4 space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
        <div class="flex items-center space-x-4">
          <label class="inline-flex items-center">
            <input type="radio" v-model="theme" value="light" class="form-radio" />
            <span class="ml-2">Light</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" v-model="theme" value="dark" class="form-radio" />
            <span class="ml-2">Dark</span>
          </label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
        <select v-model="currency" class="p-2 border rounded">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <button @click="saveSettings" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        <button @click="resetDefaults" class="px-4 py-2 border rounded">Reset</button>
        <span class="text-sm text-green-600" v-if="message">{{ message }}</span>
      </div>
    </div>

  </div>
</template>
