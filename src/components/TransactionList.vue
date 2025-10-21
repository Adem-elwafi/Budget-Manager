<script setup>
import { computed } from 'vue'

const props = defineProps({
  transactions: { type: Array, default: () => [] },
  searchQuery: { type: String, default: '' },
  filterType: { type: String, default: 'all' }
})
const emit = defineEmits(['delete'])

const filteredTransactions = computed(() => {
  const q = props.searchQuery.trim().toLowerCase()
  return props.transactions.filter(t => {
    const matchesType = props.filterType === 'all' ? true : t.type === props.filterType
    const matchesQuery = q === '' ? true : (t.label || '').toLowerCase().includes(q) || (t.category || '').toLowerCase().includes(q)
    return matchesType && matchesQuery
  })
})
</script>

<template>
    <ul class="space-y-2">
    <li
      v-for="t in filteredTransactions"
      :key="t.id"
      class="flex justify-between items-center p-3 rounded shadow bg-white"
      :class="t.type === 'income' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'"
    >
      <div>
        <p class="text-sm text-gray-500">{{ t.category }}</p>
        <p class="font-medium">{{ t.label }}</p>
        <p :class="t.type === 'income' ? 'text-green-600' : 'text-red-600'">
          {{ t.type === 'income' ? '+' : '-' }}{{ t.amount }} TND
        </p>
      </div>
      <button @click="emit('delete', t.id)" class="text-sm text-red-500 hover:underline">
        Delete
      </button>
    </li>
    <p class="text-sm text-gray-500 italic">
  Showing latest 3 transactions. <span class="text-blue-700 underline cursor-pointer" @click="openModal">View all</span>
    </p>

  </ul>
</template>