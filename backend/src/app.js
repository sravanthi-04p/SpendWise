const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Spend Wise API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/rest', userRoutes);
app.use('/api/rest', transactionRoutes);

module.exports = app;