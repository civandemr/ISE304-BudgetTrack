<template>
  <div class="mt-4">
    <Pie v-if="chartData" :data="chartData" :options="options" />
    <p v-else class="text-muted text-center">No data to display.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  summaryData: {
    type: Array,
    required: true
  }
})

const chartData = computed(() => {
  if (!props.summaryData.length) return null

  return {
    labels: props.summaryData.map(i => i._id),
    datasets: [
      {
        data: props.summaryData.map(i => i.totalAmount)
      }
    ]
  }
})

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}
</script>
