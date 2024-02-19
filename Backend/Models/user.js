const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  role: { type: String, enum: ['entreprise', 'etudiant'], required: true },
  mail: { type: String, required: true, unique: true },
  mdp: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;