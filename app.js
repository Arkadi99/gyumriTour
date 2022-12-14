import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import {CronJob} from "cron";

import cors from "cors";
import UserController from "./controllers/UserController";

const app = express();

app.use(cors({
  origin: '*'
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname, 'public')));


// app.use(authorization)

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// cron kashxati amen amsi mekin
const cronJob = new CronJob(
    '* * * 1 * *',
    UserController.removeDataPending,
    null,
    true,
    'Asia/Yerevan'
    // At every minute on day-of-month 1.
);
// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    stack: err.stack,
    errors: err.errors,
    path: err.path
  });
});

export default app;
