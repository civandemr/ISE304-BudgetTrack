const Expense = require('../models/Expense');

class ExpenseRepository {
  async create(expenseData) {
    const expense = new Expense(expenseData);
    return await expense.save();
  }

  async findAll() {
    return await Expense.find().sort({ date: -1 });
  }

  async deleteById(id) {
    return await Expense.findByIdAndDelete(id);
  }

  async getSummary() {
    return await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
  }
}

module.exports = new ExpenseRepository();