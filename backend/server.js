const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./src/config/db')
const expenseRoutes = require('./src/routes/expenseRoutes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('BudgetTrack API is running')
})

app.use('/api', expenseRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
