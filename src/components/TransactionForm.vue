<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add'])

const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other']
const newTransaction = ref({
  type: 'income',
  category: 'Other',
  label: '',
  amount: ''
})

function submit() {
  if (!newTransaction.value.label || !newTransaction.value.amount) return

  emit('add', {
    ...newTransaction.value,
    amount: parseFloat(newTransaction.value.amount),
    id: Date.now()
  })

  newTransaction.value.label = ''
  newTransaction.value.amount = ''
  newTransaction.value.category = 'Other'
}
</script>

<template>
  <form @submit.prevent="submit" class="bg-white  p-4 rounded shadow space-y-4 dark:bg-gray-800 dark:text-gray-100">
    <select v-model="newTransaction.type" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>

    <select v-model="newTransaction.category" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>

    <input v-model="newTransaction.label" type="text" placeholder="Label" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
    <input v-model="newTransaction.amount" type="number" placeholder="Amount" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
    
    <div class="buttons-container flex justify-between w-full">

    <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded dark:bg-indigo-500 dark:hover:bg-indigo-600">
      Add Transaction
    </button>
<p @click="$emit('view')" class="text-sm text-indigo-700 dark:text-indigo-400 underline pt-3 cursor-pointer">
  View all transactions
</p>
    </div>

  </form>
</template>