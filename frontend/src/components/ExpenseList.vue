<template>
  <div class="card p-4 shadow-sm mt-3">
    <h4 class="mb-3">Recent Transactions</h4>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="expense in expenses" :key="expense._id">
          <td>{{ formatDate(expense.date) }}</td>
          <td>{{ expense.title }}</td>
          <td><span class="badge bg-secondary">{{ expense.category }}</span></td>
          <td class="fw-bold">{{ expense.amount }} TL</td>
          <td>
            <button @click="$emit('delete-expense', expense._id)" class="btn btn-sm btn-danger">
              X
            </button>
          </td>
        </tr>
        <tr v-if="expenses.length === 0">
          <td colspan="5" class="text-center text-muted">No expenses added yet.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  expenses: {
    type: Array,
    default: () => []
  }
})

defineEmits(['delete-expense'])

const formatDate = (value) => {
  if (!value) return ''

  if (typeof value === 'string') {
    const datePart = value.split('T')[0]
    const [year, month, day] = datePart.split('-')
    if (year && month && day) {
      return `${day}.${month}.${year}`
    }
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return String(value)
  }

  return parsed.toLocaleDateString('tr-TR')
}
</script>
