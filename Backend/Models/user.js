const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, },
  companyName:{type :String },
  numeroTel:{type :String },
 
  adresse:{type :String },
  prenom: { type: String },
  role: { type: String, enum: ['Company', 'Student', 'Staff','admin'] },

  mail: { type: String,  unique:  [true,"Email address already taken"] },
  password: { type: String },

  confirmPassword: { type: String},
  specialite :{type:String , enum: ['Information technology(IT)', 'Business', 'Civil Engineering' , 'Mechanical']},
  verified:{type:Boolean, default:false},
  doamine:{type:String},
  photo:{type:String ,default: ''},

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
userSchema.statics.getUserStatisticsByRole = async function () {
  try {
    const userStatistics = await this.aggregate([
      {
        $group: {
          _id: "$role",
          totalUsers: { $sum: 1 }
        }
      }
    ]);
    return userStatistics;
  } catch (error) {
    throw new Error(error.message);
  }
};
 

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;