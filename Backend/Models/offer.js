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
        type: String, // Exemple: "Emploi" ou "Stage"
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    requirements: {
        type: [String], // Liste de conditions ou exigences pour l'offre
        required: true
    },
    salary: {
        type: Number, // Salaire proposé pour l'offre
        required: false // Peut ne pas être spécifié pour les stages non rémunérés
    },
    contactEmail: {
        type: String, // Adresse e-mail de contact pour l'offre
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Création du modèle Offer à partir du schéma
const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
