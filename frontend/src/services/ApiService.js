import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

const getExpenses = async () => {
  const response = await apiClient.get('/expenses')
  return response.data
}

const createExpense = async (payload) => {
  const response = await apiClient.post('/expenses', payload)
  return response.data
}

const deleteExpense = async (id) => {
  const response = await apiClient.delete(`/expenses/${id}`)
  return response.data
}

const updateExpense = async (id, payload) => {
  const response = await apiClient.put(`/expenses/${id}`, payload)
  return response.data
}

const getSummary = async () => {
  const response = await apiClient.get('/summary')
  return response.data
}

export { getExpenses, createExpense, deleteExpense, updateExpense, getSummary }
