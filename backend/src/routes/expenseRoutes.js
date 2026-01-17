const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/expenses', (req, res) => expenseController.getExpenses(req, res));
router.post('/expenses', (req, res) => expenseController.createExpense(req, res));
router.delete('/expenses/:id', (req, res) => expenseController.deleteExpense(req, res));
router.get('/summary', (req, res) => expenseController.getSummary(req, res));
router.put("/expenses/:id", expenseController.updateExpense);


module.exports = router;