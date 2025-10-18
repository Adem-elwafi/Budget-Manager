<script setup>
import { ref, computed } from 'vue'
import TransactionForm from '../components/TransactionForm.vue'
import TransactionList from '../components/TransactionList.vue'
import { onMounted, watch } from 'vue'

//Data
const transactions = ref([])
const categories = ['Food','Transport','Entertainmet','Bills','Others']
const filterType = ref('all')
const filterCategory = ref('all')
//Local storage 
onMounted(() => {
  const saved = localStorage.getItem('transactions')
  if (saved) {
    transactions.value = JSON.parse(saved)
  }
})

watch(
  transactions,
  (newVal) => {
    localStorage.setItem('transactions', JSON.stringify(newVal))
  },
  { deep: true }
)



function addTransaction(t) {
  transactions.value.push(t)
}

function deleteTransaction(id) {
  const confirmDelete = confirm('Are you sure you want to delete this transaction?')
  if (confirmDelete) {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }
}
const filteredTransactions = computed(() =>
  transactions.value
    .filter(t => filterType.value === 'all' || t.type === filterType.value)
    .filter(t => filterCategory.value === 'all' || t.category === filterCategory.value)
)

const totalIncome = computed(() =>
  transactions.value.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
)
const totalExpense = computed(() =>
  transactions.value.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
)
const balance = computed(() => totalIncome.value - totalExpense.value)
</script>

<template>
  <div class="p-6 max-w-xl mx-auto space-y-6">
    <h1 class="text-2xl font-bold">Budget Manager</h1>

    <div class="bg-white p-4 rounded shadow">
      <p><strong>Balance:</strong> {{ balance }} TND</p>
      <p class="text-green-600"><strong>Income:</strong> {{ totalIncome }} TND</p>
      <p class="text-red-600"><strong>Expense:</strong> {{ totalExpense }} TND</p>
    </div>

    <!-- Filter Controls -->
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-3">Filters</h2>
      <div class="flex space-x-4">
        <select v-model="filterType" class="p-2 border rounded flex-1">
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select v-model="filterCategory" class="p-2 border rounded flex-1">
          <option value="all">All Categories</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </div>

    <TransactionForm @add="addTransaction" />
    <TransactionList :transactions="filteredTransactions" @delete="deleteTransaction" />
  </div>
</template>