const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const gadgetRoutes = require('./routes/gadgetRoutes');

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/gadget', gadgetRoutes);

module.exports = app;
