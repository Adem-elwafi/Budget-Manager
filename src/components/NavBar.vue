<script setup>
import { toRef, ref, computed } from 'vue'

const props = defineProps({
    searchQuery: { type: String, default: '' },
    filterType: { type: String, default: 'all' }
})
const emit = defineEmits(['update:search-query', 'update:filter-type'])

const search = toRef(props, 'searchQuery')
const type = toRef(props, 'filterType')

function onSearchInput(e) {
    emit('update:search-query', e.target.value)
}

function onFilterChange(e) {
    emit('update:filter-type', e.target.value)
}

// small local state for mobile menu toggle and today's date
const open = ref(false)
const today = computed(() => new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }))
</script>
<template>
    <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex">
                    <div class="flex-shrink-0 flex items-center">
                        <div class="w-10 h-10 bg-blue-600 text-white rounded flex items-center justify-center font-bold">BM</div>
                        <div class="ml-3">
                            <div class="text-lg font-semibold text-gray-800">Budget Manager</div>
                            <div class="text-sm text-gray-500">Track your money</div>
                        </div>
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:space-x-4 sm:items-center ml-6">
                        <a href="#" class="text-gray-700 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                        <a href="#" class="text-gray-700 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reports</a>
                        <a href="#" class="text-gray-700 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Settings</a>
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                    <div class="hidden md:flex items-center space-x-3">
                        <div class="text-sm text-gray-500">{{ today }}</div>
                        <select :value="type" @change="onFilterChange" class="p-2 border rounded text-sm">
                            <option value="all">All</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        <div class="relative">
                            <input :value="search" @input="onSearchInput" type="search" placeholder="Search transactions" class="border rounded-lg py-2 px-3 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                            <svg class="absolute right-2 top-2 text-gray-400 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>
                        </div>
                    </div>

                    <div class="hidden sm:flex sm:items-center sm:space-x-2">
                        <button class="text-sm px-3 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">Sign in</button>
                        <button class="text-sm px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Get started</button>
                    </div>

                    <div class="-mr-2 flex sm:hidden">
                        <button @click="open = !open" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-700 focus:outline-none">
                            <span class="sr-only">Open main menu</span>
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="open" class="sm:hidden">
            <div class="pt-2 pb-3 space-y-1">
                <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-700 hover:text-white">Dashboard</a>
                <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-700 hover:text-white">Reports</a>
                <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-700 hover:text-white">Settings</a>
                <div class="px-3 py-2">
                    <select :value="type" @change="onFilterChange" class="w-full p-2 border rounded">
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div class="px-3 py-2">
                    <input :value="search" @input="onSearchInput" type="search" placeholder="Search transactions" class="w-full p-2 border rounded" />
                </div>
            </div>
        </div>
    </nav>
</template>