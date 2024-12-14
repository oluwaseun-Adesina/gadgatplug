const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const gadgetRoutes = require('./routes/gadgetRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/gadgets', gadgetRoutes);

// Error handling middleware
// NOT FOUND URL

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
