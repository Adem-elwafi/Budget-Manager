import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: []  // Each item: { id, type: 'income' | 'expense', label, amount }
  }),
  getters: {
    totalIncome: (state) =>
      state.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
    totalExpense: (state) =>
      state.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    balance: (state) =>
      state.transactions.reduce((sum, t) =>
        t.type === 'income' ? sum + t.amount : sum - t.amount, 0)
  },
  actions: {
    addTransaction(transaction) {
      this.transactions.push({ ...transaction, id: Date.now() })
    },
    removeTransaction(id) {
      this.transactions = this.transactions.filter(t => t.id !== id)
    }
  }
})