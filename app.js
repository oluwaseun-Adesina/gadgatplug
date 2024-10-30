const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use('/v1/api/users', userRoutes);

module.exports = app;
