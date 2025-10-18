<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])
const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other']

const newTransaction = ref({
  type: 'income',
  label: '',
  amount: '',
  category: 'Other'
})

function submit() {
  if (!newTransaction.value.label || !newTransaction.value.amount) return

  const transaction = {
    ...newTransaction.value,
    amount: parseFloat(newTransaction.value.amount),
    id: Date.now()
  }
  
  // Emit the new transaction to parent
  emit('add', transaction)

  // Reset form
  newTransaction.value.label = ''
  newTransaction.value.amount = ''
}
</script>

<template>
  <form @submit.prevent="submit" class="bg-white p-4 rounded shadow space-y-4">
    <select v-model="newTransaction.type" class="w-full p-2 border rounded">
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>

    <input v-model="newTransaction.label" type="text" placeholder="Label" class="w-full p-2 border rounded" required />
    
    <input v-model="newTransaction.amount" type="number" placeholder="Amount" class="w-full p-2 border rounded" required />
    
    <select v-model="newTransaction.category" class="w-full p-2 border rounded">
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>

    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">
      Add Transaction
    </button>
  </form>
</template>