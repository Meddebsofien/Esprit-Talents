const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: [true,"Please Enter your Name"] },
  prenom: { type: String, required:  [true,"Please Enter your LastName"] },
  role: { type: String, enum: ['Company', 'Student', 'Staff'], required: [true,"Please Enter your Role"] },
  mail: { type: String, required:[true, "Please add the user email address"], unique:  [true,"Email address already taken"] },
  password: { type: String, required: [true,"Please Enter your Password"] },
},
{
timestamps: true,
}
);
 

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;