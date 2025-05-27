const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/krishna_users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB error:', err);
});

// Mount auth routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
