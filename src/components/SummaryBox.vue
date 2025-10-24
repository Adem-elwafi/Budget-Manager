<script setup>
    const props= defineProps({
        income: Number,  
        balance: Number, 
        expence: Number 
    })
</script>

<template>
    <div  class="bg-white p-4 rounded shadow space-y-2 dark:bg-gray-800 dark:text-gray-100">
        <p><strong>Balance:{{ balance }}</strong></p>
        <p><strong>Income:{{ income }}</strong></p>
        <p><strong>Expnece:{{ expence }}</strong></p>
    </div>
</template>