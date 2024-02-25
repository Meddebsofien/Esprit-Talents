const User = require('../Models/user');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

registerUser = async (req, res) => {
  try {
    const { nom, prenom, role, mail, password } = req.body;
    if (!nom || !prenom || !password || !role || !mail) {
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

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
exports.createUser = async (req, res) => {
  try {
    const { nom, prenom, role, mail, password } = req.body;

    if (!nom || !prenom || !password || !role || !mail) {
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
