const User = require('../Models/user');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../Config/auth.config");
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const VerifTokeen=require('../Models/verif');

// Liste des rôles autorisés
//const allowedRoles = ['Company', 'Student'];

const allowedRoles = ['Company', 'Student','Staff'];
// Fonction pour enregistrer un nouvel utilisateur avec cv 
const registerUserpswd = async (req, res) => {
  try {
    const { prenom, nom, mail, role, password } = req.body;

    if (!prenom || !nom || !mail || !role || !password) {
      return res.status(400).json({ message: "Please provide all necessary information." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      prenom,
      nom,
      mail,
      role,
      password: hashedPassword
    });

    await newUser.save();

    // Create token for email verification
    const token = await VerifTokeen.create({
      userId: newUser.id,
      tokenverif: crypto.randomBytes(32).toString("hex"),
    });

    // Construct verification URL
    const url = `${process.env.CLIENT_URL}users/${newUser.id}/verify/${token.tokenverif}`;

    // Send verification email
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'talentsesprit@gmail.com',
        pass: 'wldp tydr nckz skjh'
      }
    });

    var mailOptions = {
      from: 'talentsesprit@gmail.com',
      to: newUser.mail,
      subject: 'Confirm Account',
      text: `Please Confirm your authentication: ${url}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        return res.status(500).json({ Status: "Error sending email" });
      } else {
        return res.status(201).json({ message: "User registered successfully. Email verification sent." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while registering the user." });
  }
};

//signup user
const registerUser = async (req, res) => {
  try {
    const { nom, prenom, role, mail, password,confirmPassword, companyName,  adresse,verified, specialite } = req.body;

    if (!password || !role || !mail ||!confirmPassword) {
      res.status(400);
      throw new Error('All fields are mandatory!');
    }

    const userAvailable = await User.findOne({ mail });

    if (userAvailable) {
      res.status(400);
      throw new Error('User already registered!');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let userFields = {
      nom,
      prenom,
      role,
      mail,
      verified,
      password: hashedPassword,
      confirmPassword:hashedPassword,
    };

    // Set role-specific fields based on the user's role
    if (role === 'Company') {
      userFields = {
        ...userFields,
        companyName,
       
        
        adresse,
      };
    } else if (role === 'Student') {
      userFields = {
        ...userFields,
        specialite,
      };
    }

    const user = await User.create(userFields);

    console.log(`User created ${user}`);

          //begin sofien
          const tokenn = await VerifTokeen.create({
            userId: user.id,
            tokenverif: crypto.randomBytes(32).toString("hex"),
         });
      
      
      
          const url = `${process.env.CLIENT_URL}users/${user.id}/verify/${tokenn.tokenverif}`;
        // await sendEmail(user.mail, "Email Verification", url);
       
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'talentsesprit@gmail.com',
              pass: 'wldp tydr nckz skjh'
          }
      });
      
      var mailOptions = {
          from: 'talentsesprit@gmail.com',
          to: user.mail,
          subject: 'Confirm Account',
          text: `Please Confirm you authentification  ${url}`
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.error(error);
              return res.status(500).send({ Status: "Error sending email" });
          } else {
              return res.send({ Status: "Success" });
          }
      });
      
      
          //end sofien

    if (user) {
      res.status(201).json({ _id: user.id, mail: user.mail , url: url});
    } else {
      res.status(400);
      throw new Error('User data is not valid');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//signin user
exports.signin = (req, res) => {
  User.findOne({ mail: req.body.mail })

    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
     
      // Comparer le mot de passe saisi avec le mot de passe haché stocké en base de données
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(401).send({ accessToken: null, message: "Invalid password." });
        }

        // Si le mot de passe est valide, générer le token JWT
        const token = jwt.sign({ id: user.id ,role: user.role, verified:user.verified, companyName: user.companyName, specialite: user.specialite,twofaEnabled: user.twofaEnabled},
      //  const token = jwt.sign({ id: user._id ,role: user.role, verified:user.verified},
                                config.secret,
                                {
                                  algorithm: 'HS256',
                                  allowInsecureKeySizes: true,
                                  expiresIn: 86400, // 24 hours
                                });
                               
        res.status(200).send({
          accessToken: token,
          verified: user.verified,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//login with google api 
exports.checkEmail = async (req, res) => {
 
    const { mail, accessToken } = req.body;
  
    try {
      // Vérifier si l'utilisateur existe dans la base de données avec cet e-mail
      const user = await User.findOne({ mail });
  
      if (!user) {
        // Si l'utilisateur n'existe pas, renvoyer une erreur
        return res.status(404).json({ error: 'User not found' });
      }
  
      // L'utilisateur existe, renvoyer son rôle
      res.status(200).json({ role: user.role });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
};

exports.apigoogle = async (req, res) => {
  try {
    // Récupérer le token d'accès envoyé depuis le frontend
    const { accessToken } = req.body;

    // Valider le token d'accès (à implémenter)

    // Appeler l'API Google avec le token d'accès
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Extraire les données pertinentes de la réponse de l'API Google
    const { name, email } = response.data;

    // Créer un token JWT pour l'utilisateur
    const token = jwt.sign(
      { email }, // Utilisez les données pertinentes pour le payload du token
      config.secret, // Utilisez la clé secrète de votre configuration
      {
        algorithm: 'HS256',
        expiresIn: 86400, // 24 heures
      }
    );

    // Envoyer les données récupérées en réponse, y compris le token JWT
    res.status(200).json({ accessToken: token });
  } catch (error) {
    console.error('Error calling Google API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

exports.createUser = async (req, res) => {
  try {
   // const { nom, prenom, role, mail, password,confirmPassword, companyName,  adresse,specialite } = req.body;

   // if (!password || !role || !mail ||!confirmPassword) {

    const { nom, prenom, role, mail, password, companyName, adresse, numeroTel,specialite } = req.body;

    if (!password || !role || !mail ) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({ mail });

    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);

    const user = await User.create({
      nom,
      prenom,
      role,
      mail,
      password: hashedPassword,
      companyName,

      numeroTel,
      specialite,
      adresse,
    });

    console.log(`User created ${user}`);

    if (user) {
      res.status(201).json({ _id: user.id, mail: user.mail });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }




  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
};


// Lire tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    // Remplacer les backslashes par des slashs dans le chemin de la photo
    user.photo = `http://localhost:3700/${user.photo.replace(/\\/g, "/")}`;
    console.log("URL de la photo:", user.photo); 
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;
    // Mettre à jour l'utilisateur avec les données fournies
    // Assurez-vous d'inclure la mise à jour de l'URL de la photo si nécessaire
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

exports. getUserStatisticsByRole = async (req, res) => {
  try {
    // Effectuer une requête pour obtenir les statistiques par rôle
    const userStatistics = await User.aggregate([
      {
        $group: {
          _id: "$role", // Grouper par le rôle de l'utilisateur
          count: { $sum: 1 } // Compter le nombre d'utilisateurs pour chaque rôle
        }
      }
    ]);

    res.json(userStatistics); // Retourner les statistiques sous forme de JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Gérer les erreurs
  }
};



// Supprimer un utilisateur par son ID
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update your backend code

// Fetch users by role
exports.getUsersByRole = async (req, res) => {
  const { role } = req.params;

  try {
    if (!allowedRoles.includes(role)) {
      res.status(400).json({ error: 'Invalid role specified' });
      return;
    }

    const users = await User.find({ role });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getUserRegistrationsByDay = async (req, res) => {
  try {
    // Agréger les utilisateurs par jour d'inscription
    const userRegistrations = await User.aggregate([
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" }, // Grouper par jour d'inscription
          count: { $sum: 1 }, // Compter le nombre d'utilisateurs dans chaque groupe
        },
      },
      {
        $sort: { "_id": 1 } // Trier les résultats par jour
      }
    ]);
    
    res.json(userRegistrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


    
exports.getUsersBySpecialty = async (req, res) => {
  try {
    // Agréger les utilisateurs par spécialité
    const usersBySpecialty = await User.aggregate([
      {
        $group: {
          _id: "$specialite", // Grouper par spécialité
          count: { $sum: 1 }, // Compter le nombre d'utilisateurs dans chaque groupe
        },
      },
    ]);

    res.json(usersBySpecialty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




//sofien
exports.verifyUser = async (req, res) => {  
  try{
  const user = await User.findById({_id:req.params.id});
  if(!user){
    return res.status(404).json({error:"Invalid url"});
  }

  const token= await VerifTokeen.findOne({userId:user.id,tokenverif:req.params.token});
  if(!token){
    return res.status(401).json({error:"Invalid token"});
  }
await user.updateOne({verified:true});
await token.deleteOne({_id:token._id});

res.status(200).json({message:"User verified successfully"});

  }catch(err){
    res.status(500).send({ message: err.message });
  }
}


module.exports.registerUser = registerUser;
module.exports.registerUserpswd=registerUserpswd
module.exports.currentUser = currentUser;
