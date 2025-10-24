<script setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'

const transactions = ref([])

function load() {
  try {
    const saved = localStorage.getItem('transactions')
    transactions.value = saved ? JSON.parse(saved) : []
  } catch (e) {
    transactions.value = []
  }
}

onMounted(() => load())

const totalIncome = computed(() => transactions.value.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0))
const totalExpense = computed(() => transactions.value.filter(t => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0))
const balance = computed(() => totalIncome.value - totalExpense.value)

const byCategory = computed(() => {
  const map = {}
  transactions.value.forEach(t => {
    const cat = t.category || 'Other'
    map[cat] = (map[cat] || 0) + (t.amount || 0) * (t.type === 'income' ? 1 : -1)
  })
  return Object.entries(map).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
})

const byMonth = computed(() => {
  const map = {}
  transactions.value.forEach(t => {
    // use id as timestamp fallback
    const ts = typeof t.date === 'number' ? t.date : (typeof t.id === 'number' ? t.id : null)
    const dt = ts ? new Date(ts) : new Date()
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`
    map[key] = (map[key] || 0) + (t.amount || 0) * (t.type === 'income' ? 1 : -1)
  })
  return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]))
})

function refresh() { load() }

function exportCSV() {
  const rows = [['id','date','type','category','label','amount']]
  transactions.value.forEach(t => {
    const date = t.date ? new Date(t.date).toISOString() : (t.id ? new Date(t.id).toISOString() : '')
    rows.push([t.id, date, t.type, t.category, (t.label||'').replace(/\n/g, ' '), t.amount])
  })
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transactions.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <NavBar />
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <h1 class="text-2xl font-semibold">Reports</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 bg-white rounded shadow dark:bg-gray-900 dark:text-gray-100">
        <div class="text-sm text-gray-500 dark:text-gray-400">Income</div>
        <div class="text-xl font-bold text-green-600 dark:text-green-400">{{ totalIncome }}</div>
      </div>
      <div class="p-4 bg-white rounded shadow dark:bg-gray-900 dark:text-gray-100">
        <div class="text-sm text-gray-500 dark:text-gray-400">Expense</div>
        <div class="text-xl font-bold text-red-600 dark:text-red-400">{{ totalExpense }}</div>
      </div>
      <div class="p-4 bg-white rounded shadow dark:bg-gray-900 dark:text-gray-100">
        <div class="text-sm text-gray-500 dark:text-gray-400">Balance</div>
        <div class="text-xl font-bold">{{ balance }}</div>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Totals by Category</h2>
      <div class="space-x-2">
        <button @click="refresh" class="px-3 py-1 border rounded bg-gray-100 dark:bg-gray-800">Refresh</button>
        <button @click="exportCSV" class="px-3 py-1 bg-indigo-600 text-white rounded">Export CSV</button>
      </div>
    </div>

    <div class="bg-white rounded shadow p-4 dark:bg-gray-900 dark:text-gray-100">
      <table class="w-full text-left">
        <thead>
          <tr class="text-sm text-gray-500 dark:text-gray-400">
            <th>Category</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="([cat, sum], idx) in byCategory" :key="cat" class="border-t border-gray-100 dark:border-gray-800">
            <td class="py-2">{{ cat }}</td>
            <td class="py-2 text-right">{{ sum }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-2">Totals by Month</h2>
      <div class="bg-white rounded shadow p-4 dark:bg-gray-900 dark:text-gray-100">
        <table class="w-full text-left">
          <thead>
            <tr class="text-sm text-gray-500 dark:text-gray-400">
              <th>Month</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="([m, sum]) in byMonth" :key="m" class="border-t border-gray-100 dark:border-gray-800">
              <td class="py-2">{{ m }}</td>
              <td class="py-2 text-right">{{ sum }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>
