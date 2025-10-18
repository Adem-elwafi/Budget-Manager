<script setup>
const props = defineProps(['transactions'])
const emit = defineEmits(['delete'])
</script>

<template>
  <ul class="space-y-2">
    <li
      v-for="t in transactions"
      :key="t.id"
      class="flex justify-between items-center p-3 rounded shadow bg-white"
      :class="t.type === 'income' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'"
    >
      <div>
        <p class="font-medium">{{ t.label }}</p>
        <p class="text-sm text-gray-500"
>{{ t.category }}</p>
        <p :class="t.type === 'income' ? 'text-green-600' : 'text-red-600'">
          {{ t.type === 'income' ? '+' : '-' }}{{ t.amount }} TND
        </p>
      </div>
      <button @click="emit('delete', t.id)" class="text-sm text-red-500 hover:underline">
        Delete
      </button>
    </li>
  </ul>
</template>