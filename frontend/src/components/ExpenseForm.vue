<template>
  <div class="card p-4 shadow-sm">
    <h4 class="mb-3">Add New Expense</h4>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input
          v-model="form.title"
          type="text"
          class="form-control"
          required
          placeholder="e.g. Starbucks"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Amount (TL)</label>
        <input v-model.number="form.amount" type="number" class="form-control" min="1" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Category</label>
        <select v-model="form.category" class="form-select">
          <option>Food</option>
          <option>Transport</option>
          <option>Entertainment</option>
          <option>Education</option>
          <option>Other</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Date</label>
        <input v-model="form.date" type="date" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary w-100">Save Expense</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-expense'])

const form = ref({
  title: '',
  amount: null,
  category: 'Food',
  date: new Date().toISOString().slice(0, 10)
})

const submitForm = () => {
  if (!form.value.amount || form.value.amount <= 0) {
    alert('Amount must be positive!')
    return
  }

  emit('add-expense', { ...form.value })

  form.value.title = ''
  form.value.amount = null
}
</script>
