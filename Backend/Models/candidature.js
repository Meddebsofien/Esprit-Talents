const mongoose = require('mongoose');
const    schema = mongoose.Schema;


const CandidatureSchema = new schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    idOffer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'en attente'
    }
   
});




module.exports = mongoose.model('User',CandidatureSchema )