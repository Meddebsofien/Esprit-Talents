const { text } = require('body-parser');
const mongoose = require('mongoose');

const entretienSchema = new mongoose.Schema({
    id_candidature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidature', 
    },
    date_debut: {
        type: Date,
        required: true
    },
    date_fin: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ["en ligne", "en présentiel"], 
        default: "en présentiel",
        required: true
    }
});

module.exports = mongoose.model('Entretien', entretienSchema);
