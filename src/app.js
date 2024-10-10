import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import {router as indexRouter} from './api/routes/index.js';
import {router as usersRouter} from './api/routes/users.js';

import { swaggerDocs } from './swagger.js';
import { port } from './server.js';


export const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

swaggerDocs(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

