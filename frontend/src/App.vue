<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container">
        <span class="navbar-brand">BudgetTrack</span>
        <div class="navbar-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view
        :expenses="expenses"
        @add-expense="addExpense"
        @delete-expense="deleteExpense"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expenses = ref([
  { _id: 'seed-1', title: 'Lunch', amount: 150, category: 'Food', date: '2026-01-10' },
  { _id: 'seed-2', title: 'Book', amount: 200, category: 'Education', date: '2026-01-12' }
])

const addExpense = (newExpense) => {
  const expenseWithId = { ...newExpense, _id: `local-${Date.now()}` }
  expenses.value.push(expenseWithId)
}

const deleteExpense = (id) => {
  expenses.value = expenses.value.filter((item) => item._id !== id)
}
</script>
