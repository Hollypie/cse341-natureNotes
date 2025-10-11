require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const mongodb = require('./data/database');
const googleAuth = require('./config/google-oauth');

const app = express();
const port = process.env.PORT || 3000;

// Trust proxy for secure cookies
app.set('trust proxy', 1);

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use(googleAuth);

// Routes
app.use('/', require('./routes/index'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MongoDB connection and start server
mongodb.initDb(err => {
  if (err) return console.error('❌ MongoDB connection error:', err);
  console.log('✅ MongoDB connected');
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
});