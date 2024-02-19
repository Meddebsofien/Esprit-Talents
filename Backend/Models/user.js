const mongoose = require('mongoose');
const    schema = mongoose.Schema;


const userSchema = new schema({

    nom:String,
    prenom: String,
    email: String,
});




module.exports = mongoose.model('User',userSchema )