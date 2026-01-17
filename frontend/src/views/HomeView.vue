<template>
  <div class="row">
    <div class="col-md-4">
      <ExpenseForm @add-expense="handleAdd" />
    </div>

    <div class="col-md-8">
      <!-- Filters -->
      <div class="card p-3 shadow-sm mb-3">
        <div class="row g-2 align-items-end">
          <div class="col-md-6">
            <label class="form-label">Category</label>
            <select v-model="filterCategory" class="form-select">
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Month</label>
            <select v-model="filterMonth" class="form-select">
              <option value="All">All</option>
              <option v-for="m in availableMonths" :key="m" :value="m">
                {{ m }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <ExpenseList
        :expenses="filteredExpenses"
        @delete-expense="handleDelete"
        @edit-expense="openEdit"
      />
    </div>
  </div>

  <EditExpenseModal
    v-if="showEditModal && selectedExpense"
    :expense="selectedExpense"
    @close="closeEdit"
    @save="saveEdit"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ExpenseForm from '../components/ExpenseForm.vue'
import ExpenseList from '../components/ExpenseList.vue'
import EditExpenseModal from '../components/EditExpenseModal.vue'
import { getExpenses, createExpense, deleteExpense, updateExpense } from '../services/ApiService'

const expenses = ref([])

const filterCategory = ref('All')
const filterMonth = ref('All')

const showEditModal = ref(false)
const selectedExpense = ref(null)

onMounted(async () => {
  await loadExpenses()
})

const loadExpenses = async () => {
  try {
    expenses.value = await getExpenses()
  } catch (error) {
    console.error('Error while loading expenses:', error)
  }
}

const handleAdd = async (expenseData) => {
  try {
    const savedExpense = await createExpense(expenseData)
    expenses.value.unshift(savedExpense)
  } catch (error) {
    alert('An error occurred while adding the expense!')
    console.error(error)
  }
}

const handleDelete = async (id) => {
  try {
    if (!confirm('Are you sure you want to delete this expense?')) return

    await deleteExpense(id)
    expenses.value = expenses.value.filter((exp) => exp._id !== id)
  } catch (error) {
    alert('Failed to delete the expense!')
    console.error(error)
  }
}

const availableMonths = computed(() => {
  const months = new Set(
    expenses.value
      .map((e) => (e.date ? String(e.date).slice(0, 7) : ''))
      .filter(Boolean)
  )
  return Array.from(months).sort().reverse()
})

const filteredExpenses = computed(() => {
  return expenses.value.filter((e) => {
    const categoryMatch =
      filterCategory.value === 'All' || e.category === filterCategory.value

    const expenseMonth = e.date ? String(e.date).slice(0, 7) : ''
    const monthMatch =
      filterMonth.value === 'All' || expenseMonth === filterMonth.value

    return categoryMatch && monthMatch
  })
})

const openEdit = (expense) => {
  selectedExpense.value = { ...expense }
  showEditModal.value = true
}

const closeEdit = () => {
  showEditModal.value = false
  selectedExpense.value = null
}

const saveEdit = async (updated) => {
  try {
    const updatedFromServer = await updateExpense(updated._id, {
      title: updated.title,
      amount: updated.amount,
      category: updated.category,
      date: updated.date,
    })

    expenses.value = expenses.value.map((e) =>
      e._id === updatedFromServer._id ? updatedFromServer : e
    )

    closeEdit()
  } catch (error) {
    alert('Failed to update the expense!')
    console.error(error)
  }
}
</script>
