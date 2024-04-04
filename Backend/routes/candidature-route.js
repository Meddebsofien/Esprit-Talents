var express = require("express");
var router = express.Router();
var {
  AjouterCandidature,
  ModifierCandidature,
  SupprimerCandidature,
  getAllCandidature,
  getCandidatureById,
  rejectCandidatureById,
  acceptCandidatureById,
} = require("../Controllers/candidature-controller");
const uploadFileToCloudinary = require("../middleware/fileMiddleWare");

//Ajouter une candidature
router.post("/addCandidature", uploadFileToCloudinary, AjouterCandidature);

//Modifier une candidature
router.put("/updateCandidature/:id", ModifierCandidature);

//Supprimer une candidature
router.delete("/deleteCandidature/:id", SupprimerCandidature);

//get tous les candidatires
router.get("/getAllCandidature", getAllCandidature);

// get candidatire by id
router.get("/getCandidatureById/:id", getCandidatureById);

//reject Candidature par id
router.put("/rejectCandidatureById/:id", rejectCandidatureById);

// Accept Candidature par id
router.put("/acceptCandidatureById/:id", acceptCandidatureById);

module.exports = router;
