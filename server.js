const mongoose = require('mongoose');
const dotenv = require('dotenv');
const DB = require('./config/db');
dotenv.config();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

DB();
// const db = process.env.DATABASE_LOCAL;

// mongoose.connect(db).then(() => {
//   console.log('DB Connection successful!');
// });

// app
const app = require('./app');

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection, app will shut down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
