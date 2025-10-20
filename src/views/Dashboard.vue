<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import TransactionForm from '../components/TransactionForm.vue'
import TransactionList from '../components/TransactionList.vue'
import SummaryBox from '../components/SummaryBox.vue'
import NavBar from '../components/NavBar.vue'

const transactions = ref([])
const searchQuery = ref('')
const filterType = ref('all')

function addTransaction(t) {
  transactions.value.push(t)
}

function deleteTransaction(id) {
  const confirmDelete = confirm('Are you sure you want to delete this transaction?')
  if (confirmDelete) {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }
}

onMounted(() => {
  const saved = localStorage.getItem('transactions')
  if (saved) transactions.value = JSON.parse(saved)
})

watch(transactions, (newVal) => {
  localStorage.setItem('transactions', JSON.stringify(newVal))
}, { deep: true })

const totalIncome = computed(() =>
  transactions.value.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
)
const totalExpense = computed(() =>
  transactions.value.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
)
const balance = computed(() => totalIncome.value - totalExpense.value)
</script>

<template>
  <NavBar v-model:search-query="searchQuery" v-model:filter-type="filterType" />
  <div class="p-6 max-w-xl mx-auto space-y-6">
    <h1 class="text-2xl font-bold">Budget Manager</h1>

    <SummaryBox :income="totalIncome" :expense="totalExpense" :balance="balance" />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TransactionForm @add="addTransaction" />

    </div>

    <TransactionList
      :transactions="transactions"
      :search-query="searchQuery"
      :filter-type="filterType"
      @delete="deleteTransaction"
    />
  </div>
</template>