const expenseService = require('../services/expenseService');

class ExpenseController {
  async getExpenses(req, res) {
    try {
      const expenses = await expenseService.getAllExpenses();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createExpense(req, res) {
    try {
      const savedExpense = await expenseService.addExpense(req.body);
      res.status(201).json(savedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteExpense(req, res) {
    try {
      await expenseService.removeExpense(req.params.id);
      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getSummary(req, res) {
    try {
      const summary = await expenseService.getExpenseSummary();
      res.status(200).json(summary);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ExpenseController();