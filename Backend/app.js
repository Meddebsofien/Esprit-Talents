var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const User = require('./Models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

var mongoose = require('mongoose');
require('dotenv').config();
var  offerRouter = require('./routes/offer-route');

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDB..."))
.catch(err=>console.error("Could not connect to MongoDB..."));

var app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true, // enable set cookie
};

app.use(cors(corsOptions));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', 'true'); // Autoriser les credentials
//   next();
// });





app.use('/users', require('./routes/user-route'));


//Ghofrane
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
//Ghofrane
function generateAccessToken(mail) {
 
  return jwt.sign({ mail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}


//Emna
app.post('/users/register', (req, res) => {
    
    const requiredFields = ['nom', 'prenom', 'role', 'email', 'password', 'confirmPassword'];
    const missingFields = requiredFields.filter(field => !(field in req.body));
  
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    res.status(200).json({ message: 'Registration successful' });
  });


  app.post('/forgot-password', (req, res) => {
    const { mail } = req.body;

    if (!mail) {
        return res.status(400).send({ Status: "Email address not provided" });
    }

    User.findOne({ mail: mail })
        .then(user => {
            if (!user) {
                return res.status(404).send({ Status: "User not existed" });
            }

            const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'amnafelfel@gmail.com',
                    pass: 'irko dlvf pcgy luma'
                }
            });

            var mailOptions = {
                from: 'amnafelfel@gmail.com',
                to: mail,
                subject: 'Reset Password Link',
                text: `Please here is the link where you can reset your password  http://localhost:5173/resetpass/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error(error);
                    return res.status(500).send({ Status: "Error sending email" });
                } else {
                    return res.send({ Status: "Success" });
                }
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({ Status: "Internal Server Error" });
        });
});


app.post('/reset-password/:id/:token', (req, res) => {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              User.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"}))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
})

  const PORT = 3700;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
 
app.use('/offers', offerRouter);
module.exports = app;
