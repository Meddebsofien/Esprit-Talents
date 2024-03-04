const User = require('../Models/user');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../Config/auth.config");

// Liste des rôles autorisés
const allowedRoles = ['Company', 'Student'];
//signup user
const registerUser = async (req, res) => {
  try {
    const { nom, prenom, role, mail, password,confirmPassword, companyName, numeroTel, fax, adresse, specialite } = req.body;

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
      password: hashedPassword,
      confirmPassword:hashedPassword,
    };

    // Set role-specific fields based on the user's role
    if (role === 'Company') {
      userFields = {
        ...userFields,
        companyName,
        numeroTel,
        fax,
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

    if (user) {
      res.status(201).json({ _id: user.id, mail: user.mail });
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
        const token = jwt.sign({ id: user.id },
                                config.secret,
                                {
                                  algorithm: 'HS256',
                                  allowInsecureKeySizes: true,
                                  expiresIn: 86400, // 24 hours
                                });
                               
        res.status(200).send({
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

exports.createUser = async (req, res) => {
  try {
    const { nom, prenom, role, mail, password,confirmPassword, companyName, numeroTel, fax, adresse,specialite } = req.body;

    if (!password || !role || !mail ||!confirmPassword) {
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
      fax,
      adresse,
      specialite,
    });

    console.log(`User created ${user}`);

    if (user) {
      res.status(201).json({ _id: user.id, mail: user.mail });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }

  } catch (error) {
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
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

module.exports.registerUser = registerUser;
module.exports.currentUser = currentUser;
