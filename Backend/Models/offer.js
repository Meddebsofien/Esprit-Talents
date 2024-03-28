const mongoose = require('mongoose');

// Définition du schéma pour une offre
const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String, 
        required: true,
        enum : ["Emploi" , "Stage"]
    },
    startDate: {
        type: Date,
        required: true
    },
    requirements: {
        type: [String], 
        required: true
    },
    salary: {
        type: Number, 
        required: false 
    },
    experience: {
        type: Number, 
        required: true 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
);

    const Offer = mongoose.model('Offer', offerSchema);

    module.exports = Offer;