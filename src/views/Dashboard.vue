<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import TransactionForm from '../components/TransactionForm.vue'
import TransactionList from '../components/TransactionList.vue'
import SummaryBox from '../components/SummaryBox.vue'
import TransactionModal from '../components/TransactionModal.vue'
import NavBar from '../components/NavBar.vue'

const transactions = ref([])
const showModal = ref(false)

function addTransaction(t) {
  transactions.value.push(t)
}
function deleteTransaction(id) {
  const confirmDelete = confirm('Are you sure you want to delete this transaction?')
  if (confirmDelete) {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }
}
function openModal() {
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
const recentTransactions = computed(() => {
  return [...transactions.value].slice(-3).reverse()
})
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
    <NavBar></NavBar>
  <div class="p-6 max-w-xl mx-auto space-y-6">
    <SummaryBox :income="totalIncome" :expense="totalExpense" :balance="balance" />
    <TransactionForm @add="addTransaction" @view="openModal" />
    <TransactionList :transactions="recentTransactions" @delete="deleteTransaction" />
    <TransactionModal :transactions="transactions" :show="showModal" @close="closeModal" />
  </div>
</template>