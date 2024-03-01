var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var mongoose = require('mongoose');
require('dotenv').config();
var  offerRouter = require('./routes/offer-route');

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB..."))
.catch(err=>console.error("Could not connect to MongoDB..."));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', require('./routes/user-route'));
app.post('/users/register', (req, res) => {
    
    const requiredFields = ['nom', 'prenom', 'role', 'email', 'password', 'confirmPassword'];
    const missingFields = requiredFields.filter(field => !(field in req.body));
  
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    res.status(200).json({ message: 'Registration successful' });
  });

  const PORT = 3700;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

app.use('/offers', offerRouter);
module.exports = app;
