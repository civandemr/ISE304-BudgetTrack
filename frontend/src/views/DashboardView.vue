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
            v-for="item in summaryData"
            :key="item._id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ item._id }} <span class="badge bg-primary rounded-pill">{{ item.totalAmount }} TL</span>
          </li>
          
          <li v-if="summaryData.length === 0" class="list-group-item text-muted">
            No expenses found yet.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getSummary } from '../services/ApiService'

const summaryData = ref([])

onMounted(async () => {
  try {
    summaryData.value = await getSummary()
  } catch (error) {
    console.error('Dashboard verisi cekilemedi:', error)
  }
})

const totalAmount = computed(() => {
  return summaryData.value.reduce((sum, item) => sum + item.totalAmount, 0)
})
</script>