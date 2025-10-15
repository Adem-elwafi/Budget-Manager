<script setup>
import { ref, computed } from 'vue'

const transactions = ref([])

const newTransaction = ref({
  type: 'income',
  label: '',
  amount: ''
})

function addTransaction() {
  if (!newTransaction.value.label || !newTransaction.value.amount) return

  transactions.value.push({
    id: Date.now(),
    type: newTransaction.value.type,
    label: newTransaction.value.label,
    amount: parseFloat(newTransaction.value.amount)
  })

  newTransaction.value.label = ''
  newTransaction.value.amount = ''
}

const totalIncome = computed(() =>
  transactions.value
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
)

const totalExpense = computed(() =>
  transactions.value
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
)

const balance = computed(() => totalIncome.value - totalExpense.value)
</script>

<template>
  <div class="p-6 max-w-xl mx-auto space-y-6">
    <h1 class="text-2xl font-bold">Budget Manager</h1>

    <!-- Totals -->
    <div class="bg-white p-4 rounded shadow">
      <p><strong>Balance:</strong> {{ balance }} TND</p>
      <p class="text-green-600"><strong>Income:</strong> {{ totalIncome }} TND</p>
      <p class="text-red-600"><strong>Expense:</strong> {{ totalExpense }} TND</p>
    </div>

    <!-- Form -->
    <form @submit.prevent="addTransaction" class="bg-white p-4 rounded shadow space-y-4">
      <select v-model="newTransaction.type" class="w-full p-2 border rounded">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        v-model="newTransaction.label"
        type="text"
        placeholder="Label"
        class="w-full p-2 border rounded"
      />

      <input
        v-model="newTransaction.amount"
        type="number"
        placeholder="Amount"
        class="w-full p-2 border rounded"
      />

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        Add Transaction
      </button>
    </form>

    <!-- List -->
    <ul class="space-y-2">
      <li
        v-for="t in transactions"
        :key="t.id"
        class="flex justify-between p-3 rounded shadow bg-white"
        :class="t.type === 'income' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'"
      >
        <span>{{ t.label }}</span>
        <span :class="t.type === 'income' ? 'text-green-600' : 'text-red-600'">
          {{ t.type === 'income' ? '+' : '-' }}{{ t.amount }} TND
        </span>
      </li>
    </ul>
  </div>
</template>