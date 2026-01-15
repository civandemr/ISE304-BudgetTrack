<template>
  <div class="row">
    <div class="col-md-4">
      <ExpenseForm @add-expense="handleAdd" />
    </div>
    <div class="col-md-8">
      <ExpenseList :expenses="expenses" @delete-expense="handleDelete" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ExpenseForm from '../components/ExpenseForm.vue'
import ExpenseList from '../components/ExpenseList.vue'
import { getExpenses, createExpense, deleteExpense } from '../services/ApiService'

const expenses = ref([])

onMounted(async () => {
  await loadExpenses()
})

const loadExpenses = async () => {
  try {
    expenses.value = await getExpenses()
  } catch (error) {
    console.error('Veriler yuklenirken hata:', error)
  }
}

const handleAdd = async (expenseData) => {
  try {
    const savedExpense = await createExpense(expenseData)
    
    expenses.value.unshift(savedExpense) 
  } catch (error) {
    alert('Ekleme sirasinda hata olustu!')
    console.error(error)
  }
}

const handleDelete = async (id) => {
  try {
    if(!confirm('Silmek istedigine emin misin?')) return;

    await deleteExpense(id)

    expenses.value = expenses.value.filter(exp => exp._id !== id)
  } catch (error) {
    alert('Silme islemi basarisiz!')
    console.error(error)
  }
}
</script>