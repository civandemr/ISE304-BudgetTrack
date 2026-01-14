<template>
  <div class="row">
    <div class="col-md-4">
      <ExpenseForm @add-expense="forwardAdd" />
    </div>
    <div class="col-md-8">
      <ExpenseList :expenses="expenses" @delete-expense="forwardDelete" />
    </div>
  </div>
</template>

<script setup>
import ExpenseForm from '../components/ExpenseForm.vue'
import ExpenseList from '../components/ExpenseList.vue'

defineProps({
  expenses: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-expense', 'delete-expense'])

const forwardAdd = (data) => emit('add-expense', data)
const forwardDelete = (id) => emit('delete-expense', id)
</script>
