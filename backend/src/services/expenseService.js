const expenseRepository = require('../repositories/expenseRepository');

class ExpenseService {
  async addExpense(data) {
    if (!data.amount || data.amount <= 0) {
      throw new Error('Amount must be a positive number.');
    }
    if (!data.title) {
        throw new Error('Title is required.');
    }
    
    return await expenseRepository.create(data);
  }

  async getAllExpenses() {
    return await expenseRepository.findAll();
  }

  async removeExpense(id) {
    return await expenseRepository.deleteById(id);
  }

  async getExpenseSummary() {
    return await expenseRepository.getSummary();
  }
}

module.exports = new ExpenseService();