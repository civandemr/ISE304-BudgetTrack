<template>
  <div class="text-center">
    <h2>Monthly Analytics</h2>

    <div class="row mt-4 justify-content-center">
      <div class="col-md-4">
        <div class="card text-white bg-success mb-3">
          <div class="card-header">Total Spending</div>
          <div class="card-body">
            <h1 class="card-title">{{ totalAmount }} TL</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4 justify-content-center">
      <div class="col-md-6">
        <ul class="list-group">
          <li
            v-for="(amount, category) in categorySummary"
            :key="category"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ category }}
            <span class="badge bg-primary rounded-pill">{{ amount }} TL</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  expenses: {
    type: Array,
    default: () => []
  }
})

const totalAmount = computed(() => {
  return props.expenses.reduce((sum, item) => sum + item.amount, 0)
})

const categorySummary = computed(() => {
  const summary = {}
  props.expenses.forEach((item) => {
    if (!summary[item.category]) {
      summary[item.category] = 0
    }
    summary[item.category] += item.amount
  })
  return summary
})
</script>
