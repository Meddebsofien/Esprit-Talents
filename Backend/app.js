var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cros = require('cors')
var usersRouter = require('./routes/user-route');
var mongoose = require('mongoose');
require('dotenv').config();
var  offerRouter = require('./routes/offer-route');

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB..."))
.catch(err=>console.error("Could not connect to MongoDB..."));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cros());

app.use('/users', usersRouter);
app.use('/offers', offerRouter);
module.exports = app;
