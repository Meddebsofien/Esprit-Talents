const Candidature = require("../Models/candidature")

// Create a new candidature
exports.createCandidature = async (req, res) => {
    try {
        const userId = req.user.Id
        const offerId = req.offer.Id
        const { cv } = req.body;

        const newCandidature = new Candidature({
            userId,
            offerId,
            cv,
            date: Date.now(), // Automatically set the date
            status: "en attente" // Set default status
        });

        const savedCandidature = await newCandidature.save();
        res.status(201).json(savedCandidature);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all candidatures
exports.getAllCandidatures = async (req, res) => {
    try {
        const candidatures = await Candidature.find();
        res.json(candidatures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single candidature by ID
exports.getCandidatureById = async (req, res) => {
    try {
        const candidature = await Candidature.findById(req.params.id);
        if (candidature) {
            res.json(candidature);
        } else {
            res.status(404).json({ message: "Candidature not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a candidature by ID
exports.updateCandidature = async (req, res) => {
    try {
        const { idUser, idOffer, cv, date, status } = req.body;
        const updatedCandidature = await Candidature.findByIdAndUpdate(
            req.params.id,
            { idUser, idOffer, cv, date, status },
            { new: true }
        );
        res.json(updatedCandidature);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a candidature by ID
exports.deleteCandidature = async (req, res) => {
    try {
        await Candidature.findByIdAndDelete(req.params.id);
        res.json({ message: "Candidature deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
