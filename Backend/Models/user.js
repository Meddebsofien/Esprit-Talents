const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, },
  companyName:{type :String },
  numeroTel:{type :String },
 
  adresse:{type :String },
  prenom: { type: String },
  role: { type: String, enum: ['Company', 'Student', 'Staff','admin'] },
  mail: { type: String, required:[true, "Please add the user email address"], unique:  [true,"Email address already taken"] },
  password: { type: String, required: [true,"Please Enter your Password"] },
  confirmPassword: { type: String, required: [true,"Please Enter your Password"] },
  specialite :{type:String , enum: ['Information technology(IT)', 'Business', 'Civil Engineering' , 'Mechanical']},
  verified:{type:Boolean, default:false},
  twofaEnabled: {
    type: Boolean,
    default: false,
  },
  twofaSecret: {
    type: String,
    default: "",
  }
},
{
timestamps: true,
}
)
 

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;