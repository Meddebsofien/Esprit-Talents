const Entretien = require("../Models/entretien");

// Create a new interview
const createEntretien = async (req, res) => {
    try {
        const { userId, offerId, date, notes } = req.body;

        const newEntretien = new Entretien({
            userId,
            offerId,
            date,
            notes
        });

        const savedEntretien = await newEntretien.save();
        res.status(201).json(savedEntretien);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all interviews
const getAllEntretiens = async (req, res) => {
    try {
        const entretiens = await Entretien.find();
        res.json(entretiens);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single interview by ID
const getEntretienById = async (req, res) => {
    try {
        const entretien = await Entretien.findById(req.params.id);
        if (entretien) {
            res.json(entretien);
        } else {
            res.status(404).json({ message: "Entretien not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an interview by ID
const updateEntretien = async (req, res) => {
    try {
        const { userId, offerId, date, notes } = req.body;
        const updatedEntretien = await Entretien.findByIdAndUpdate(
            req.params.id,
            { userId, offerId, date, notes },
            { new: true }
        );
        res.json(updatedEntretien);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an interview by ID
const deleteEntretien = async (req, res) => {
    try {
        await Entretien.findByIdAndDelete(req.params.id);
        res.json({ message: "Entretien deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createEntretien,
    getAllEntretiens,
    getEntretienById,
    updateEntretien,
    deleteEntretien
};
