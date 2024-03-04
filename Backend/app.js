var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var mongoose = require('mongoose');
require('dotenv').config();
var  offerRouter = require('./routes/offer-route');

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB..."))
.catch(err=>console.error("Could not connect to MongoDB..."));

var app = express();

app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Autoriser les credentials
  next();
});



app.use('/users', require('./routes/user-route'));

app.post('/users/signin', (req, res) => {
  
  const { mail, password } = req.body;

  if (mail === 'test@example.com' && password === 'password') {
   
    const token = generateAccessToken(mail); 

    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    
    res.status(200).send({ token });
  } else {
    
    res.status(401).send({ message: 'Invalid credentials' });
  }
});


// Fonction pour générer un jeton d'authentification 
function generateAccessToken(mail) {
 
  return jwt.sign({ mail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

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
