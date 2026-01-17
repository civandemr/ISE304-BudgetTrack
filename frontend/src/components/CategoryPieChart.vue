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

// Generate distinct colors automatically
const makeColors = (n) =>
  Array.from({ length: n }, (_, i) => `hsl(${Math.round((360 * i) / n)}, 70%, 55%)`)

const chartData = computed(() => {
  if (!props.summaryData.length) return null

  const labels = props.summaryData.map(i => i._id)
  const data = props.summaryData.map(i => i.totalAmount)
  const colors = makeColors(labels.length)

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderColor: '#ffffff',
        borderWidth: 2
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
