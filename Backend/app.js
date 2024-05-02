var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var createError = require("http-errors");
const bodyParser = require("body-parser");
const http = require('http');
const { Server } = require("socket.io");
const multer = require('multer');
const messageRoute = require('./routes/message-route');








var logger = require('morgan');
// var multer = require("multer");
var candidaturesRouter = require("./routes/candidature-route");
// var uploads = multer({ dest: 'uploads/' });
const User = require('./Models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

const qrcode = require("qrcode");
const { authenticator } = require("otplib");
const speakeasy = require('speakeasy');





var cros = require('cors')

var usersRouter = require('./routes/user-route');

var mongoose = require('mongoose');
require('dotenv').config();
var  offerRouter = require('./routes/offer-route');

mongoose.connect(process.env.MONGO_URI )
.then(()=>console.log("Connected to MongoDB..."))
.catch(err=>console.error("Could not connect to MongoDB..."));

var app = express();

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow both origins
  credentials: true, // enable set cookie
  allowedHeaders: 'Content-Type',

  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Authorization,Content-Type',

};




app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));








const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// WebSocket handler
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    console.log('Message:', data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



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
                    user: 'talentsesprit@gmail.com',
                    pass: 'wldp tydr nckz skjh'
                }
            });

            var mailOptions = {
                from: 'talentsesprit@gmail.com',
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


// 2Fa

app.get("/users/qrImage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const secret = authenticator.generateSecret();
    const uri = authenticator.keyuri(id, "2FA Esprit talents", secret);
    const image = await qrcode.toDataURL(uri);
    user.twofaSecret = secret;
   await user.save();
    return res.send({
      success: true,
      image,
    });
  } catch {
    return res.status(500).send({
      success: false,
    });
  }
});
const upload = multer();

const transporter = nodemailer.createTransport({
  // Configuration SMTP (par exemple, SMTP Gmail)
  service: 'Gmail',
  auth: {
    user: 'talentsesprit@gmail.com',
    pass: 'wldp tydr nckz skjh'
  }
});

app.post('/contact/companies', upload.single('image'), async (req, res) => {
  // Récupérer le message à partir du corps de la requête
  const message = req.body.message;
  const subject = req.body.subject; // Ajout de la récupération de l'objet du mail

  
  // Récupérer l'image si elle a été téléchargée
  const image = req.file;
  
  try {
    // Récupérer toutes les entreprises de la base de données
    const companies = await User.find({ role: 'Company' }, 'mail'); // Récupérer uniquement les adresses e-mail des entreprises
    
    // Envoyer le message et l'image à chaque entreprise
    for (const company of companies) {
      const mailOptions = {
        from: 'talentsesprit@gmail.com',
        to: company.mail,
        subject: subject, // Utilisation de l'objet du mail récupéré depuis le corps de la requête
        text: message,
        attachments: image ? [{ filename: image.originalname, content: image.buffer }] : []
      };
      
      await transporter.sendMail(mailOptions);
      console.log('Message sent to company:', company.mail);
    }
    
    res.status(200).send('Message sent to all companies successfully!');
  } catch (error) {
    console.error('Error sending message to companies:', error);
    res.status(500).send('Failed to send message to companies.');
  }
});



// set the 2FA
app.get("/set2FA/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { code } = req.query;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    console.log(user.twofaSecret);
    console.log(code);
    try {
      const verified = speakeasy.totp.verify({
        secret: user.twofaSecret,
        encoding: 'base32',
        token: code
            });
            console.log(verified);
      if (verified) {
        // Code matches the temporary secret
        user.twofaEnabled = true;
        await user.save();

        return res.send({
          success: true,
          message: "2FA enabled successfully",
        });
      } else {
        // Code does not match the temporary secret
        return res.status(400).send({
          success: false,
          message: "Invalid authentication code",
        });
      }
    } catch (error) {
      console.error("Error verifying authentication code:", error);
      return res.status(400).send({
        success: false,
        message: "Error verifying authentication code",
      });
    }
    
  } catch {
    return res.status(500).send({
      success: false,
    });
  }
});

// app.use(cros());

const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 3001; // Use port 3001 for WebSocket server

const initializeWebSocket = require('./routes/socket-handler');

initializeWebSocket(server);
io.listen(WEBSOCKET_PORT);
console.log(`WebSocket server listening on port ${WEBSOCKET_PORT}`);
//app.use('/users', usersRouter);
app.use('/messages', messageRoute);

app.use('/offers', offerRouter);
app.use("/candidatures", candidaturesRouter);
// app.use('/uploads', express.static('uploads'));


module.exports = app;
