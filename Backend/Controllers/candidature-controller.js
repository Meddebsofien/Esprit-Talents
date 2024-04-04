const Candidature = require("../Models/candidature");
const User = require("../Models/user");

const Mail_Sender = require("../middleware/MailSneder");
const router = require("../routes/candidature-route");
// var uploads = require('../multerConfig');
// var multer = require('multer');

// Définissez les champs pour le téléchargement de fichiers
// var uploadFields = [
//   { name: 'cvUpload', maxCount: 1 },
//   { name: 'motivationLetterUpload', maxCount: 1 }
// ];

const AjouterCandidature = async (req, res) => {
  try {
    // Utilisez l'instance de Multer pour gérer le téléchargement de fichiers
    // await uploads.fields(uploadFields)(req, res, async function (err) {
    //   if (err instanceof multer.MulterError) {
    //     // Une erreur Multer s'est produite lors du téléchargement.
    //     console.log(err);
    //     res.status(500).json({ message: "Erreur lors du téléchargement des fichiers" });
    //   } else if (err) {
    //     // Une erreur inconnue s'est produite lors du téléchargement.
    //     console.log(err);
    //     res.status(500).json({ message: "Erreur lors du téléchargement des fichiers" });
    //   } else {
    //     // Si tout se passe bien, continuez avec votre logique d'après-téléchargement.
    //     console.log(req.files);

    //     // Ajoutez les chemins des fichiers téléchargés à req.body
    //     req.body.cvUpload = req.files.cvUpload[0].path;
    //     req.body.motivationLetterUpload = req.files.motivationLetterUpload[0].path;

    // Créez la candidature
    console.log(req.body);
    await Candidature.create({ ...req.body, idOffer: req.body.idOffer });
    res.status(201).json({ message: "Candidature ajoutée avec succès " });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout de la candidature" });
  }
};

const ModifierCandidature = async (req, res) => {
  try {
    const data = await Candidature.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const SupprimerCandidature = async (req, res) => {
  try {
    await Candidature.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "candidature supprimée avec succée" });
  } catch (error) {
    console.log(error.message);
  }
};

const getAllCandidature = async (req, res) => {
  try {
    const data = await Candidature.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
};
const getCandidatureById = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await Candidature.find({ idOffer: req.params.id })
      .populate("idUser")
      .populate("idOffer");
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const rejectCandidatureById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidature = await Candidature.findOne({ _id: id });

    if (!candidature) {
      return res
        .status(404)
        .json({ message: "Candidature not found for this ID" });
    }

    await Candidature.updateOne({ _id: id }, { status: "rejected" });
    const user = await User.findOne({ _id: candidature.idUser });
    let subject = "Updates";
    let content = `
            <div>
            <h2>Hello ${user.nom} ${user.prenom},</h2>
            <p>we have updates for you </p>
            <p>your are rejected  </p>
            </div>`;
    await Mail_Sender(user.mail, content, subject);
    res.json({ message: "Candidature rejected" });
  } catch (error) {
    console.error("Error rejecting candidature:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const acceptCandidatureById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("test");
    const candidature = await Candidature.findOne({ _id: id });
    const user = await User.findOne({ _id: candidature.idUser });
    let subject = "Updates";
    let content = `
            <div>
            <h2>Hello ${user.nom} ${user.prenom},</h2>
            <p>we have updates for you </p>
            <p>your are accepted  </p>
            </div>`;
    await Mail_Sender(user.mail, content, subject);
    if (!candidature) {
      return res
        .status(404)
        .json({ message: "Candidature not found for this ID" });
    }

    await Candidature.updateOne({ _id: id }, { status: "accepted" });

    res.json({ message: "Candidature accepted" });
  } catch (error) {
    // If an error occurs, return a 500 response with an error message
    console.error("Error accepting candidature:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  AjouterCandidature,
  ModifierCandidature,
  SupprimerCandidature,
  getAllCandidature,
  getCandidatureById,
  rejectCandidatureById,
  acceptCandidatureById,
};
