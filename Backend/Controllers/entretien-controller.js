const Entretien = require("../Models/entretien");

// Create a new interview
const createEntretien = async (req, res) => {
    try {
        const { id_candidature, date_debut, date_fin,type } = req.body;

        const newEntretien = new Entretien({
            id_candidature,
            date_debut,
            date_fin,
            type
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
        const entretien = await Entretien.findOne(req.params.id);
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
        const data = await Entretien.findByIdAndUpdate(req.params.entretienId, req.body, { new: true });
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

// Delete an interview by ID
const deleteEntretien = async (req, res) => {
    try {
        await Entretien.deleteOne(req.params.id);
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
