const mongoose = require('mongoose');
const dotenv = require('dotenv');
const DB = require('./config/db');
dotenv.config();

DB();
// const db = process.env.DATABASE_LOCAL;

// mongoose.connect(db).then(() => {
//   console.log('DB Connection successful!');
// });

// app
const app = require('./app');

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
