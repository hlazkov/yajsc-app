import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';

import { indexRouter } from './api/routes';
import { usersRouter } from './api/routes/users.ts';

import { swaggerDocs } from './swagger.ts';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

swaggerDocs(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
