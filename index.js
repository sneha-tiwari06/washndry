const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const otpRoutes = require('./routes/otpRoutes');
const orderRoutes = require('./routes/orderRoutes');
const addressRoutes = require('./routes/adressRoute');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api', otpRoutes);
app.use('/api', orderRoutes);
app.use('/api', addressRoutes);
app.use('/api', userRoutes);
// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});