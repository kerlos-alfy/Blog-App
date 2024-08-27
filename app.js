/*--------------------------------------------------
|                🏗️  Importing Modules           |
|--------------------------------------------------*/

const express = require('express');
const app = express();
// eslint-disable-next-line no-undef
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const morgan = require('morgan');
const dbConnection = require('./configs/dbConnection');
const articleRoute = require('./routes/articleRoute');
const userRoute = require('./routes/userRoute');
const path = require('path');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
/*--------------------------------------------------
|                🎉  End of Imports                    |
|--------------------------------------------------*/

// Todo : Connect to Database
dbConnection();

// Todo : Express Integration

app.use(express.json());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'images')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`.italic.cyan);
}

// Routes

app.use('/api/v1/articles', articleRoute);
app.use('/api/v1/user', userRoute);

app.all('*', (req, res, next) => {
  next(new ApiError(`cant find This Route: ${req.originalUrl}`, 400));
});

// Todo: Global Error Handling

app.use(globalError);

/*--------------------------------------------------
|                🎉  Run App                    |
|--------------------------------------------------*/

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`.italic.yellow);
});

// Todo: Handle unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.log(`UnhandledRejection: ${err.message}`.italic.red);
  server.close(() => {
    console.error(`Shutting down ...`);
    process.exit(1);
  });
});
