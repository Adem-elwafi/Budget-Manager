<script setup>
import { ref, computed } from 'vue'
import TransactionForm from '../components/TransactionForm.vue'
import TransactionList from '../components/TransactionList.vue'

const transactions = ref([])

function addTransaction(t) {
  transactions.value.push(t)
}

function deleteTransaction(id) {
  const confirmDelete = confirm('Are you sure you want to delete this transaction?')
  if (confirmDelete) {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }
}

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

    <TransactionForm @add="addTransaction" />
    <TransactionList :transactions="transactions" @delete="deleteTransaction" />
  </div>
</template>