<script setup>
const props = defineProps({
  transactions: Array,
  show: Boolean
})
const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold">All Transactions</h2>

      <ul class="space-y-2 max-h-64 overflow-y-auto">
        <li
          v-for="t in transactions"
          :key="t.id"
          class="flex justify-between items-center p-3 rounded shadow bg-gray-50"
          :class="t.type === 'income' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'"
        >
          <div>
            <p class="text-sm text-gray-500">{{ t.category }}</p>
            <p class="font-medium">{{ t.label }}</p>
            <p :class="t.type === 'income' ? 'text-green-600' : 'text-red-600'">
              {{ t.type === 'income' ? '+' : '-' }}{{ t.amount }} TND
            </p>
          </div>
        </li>
      </ul>

      <button @click="emit('close')" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Close
      </button>
    </div>
  </div>
</template>