const mongoose = require('mongoose');

const entretienSchema = new mongoose.Schema({
    id_candidature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidature', 
    },
    date_debut: {
        type: Date,
        default: Date.now,
    },
    date_fin: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        enum: ["en ligne", "en présentiel"], 
        default: "en présentiel"
    }
});

module.exports = mongoose.model('Entretien', entretienSchema);
