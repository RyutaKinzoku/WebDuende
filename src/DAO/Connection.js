const express = require('express');
import mysqlRouter from './mysql';
const app = express();
const bodyParser = require('body-parser');
const { query, request} = require('express');

app.set('views', '../Vista');
app.use('/usuario', mysqlRouter);