/*--------------------------------------------------
|                🏗️  Importing Modules           |
|--------------------------------------------------*/

const express = require('express');
const app = express();
// eslint-disable-next-line no-undef
dotenv = require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const morgan = require('morgan');
const dbConnection = require('./configs/dbConnection');
const articleRoute = require('./routes/articleRoute');
const userRoute = require('./routes/userRoute');
/*--------------------------------------------------
|                🎉  End of Imports                    |
|--------------------------------------------------*/

// Todo : Connect to Database
dbConnection();

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // eslint-disable-next-line no-undef
  console.log(`mode: ${process.env.NODE_ENV}`.italic.cyan);
}

app.use(express.json());

// Routes

app.use('/api/v1/articles', articleRoute);
app.use('/api/v1/user', userRoute);

/*--------------------------------------------------
|                🎉  Run App                    |
|--------------------------------------------------*/

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`.italic.yellow);
});
