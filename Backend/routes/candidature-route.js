var express = require("express");
var router = express.Router();
const multer = require('multer');

var {
  AjouterCandidature,
  ModifierCandidature,
  SupprimerCandidature,
  getAllCandidature,
  rejectCandidatureById,
  acceptTopCvAverage,
  getCandidatureByStudentId,
  getCandidatureByIdOffer,
  
} = require("../Controllers/candidature-controller");
var {
  extractTextAndContactInfoFromPDF,
  uplodCv,
  topCvAverage,
  getCandidacyByID,
  updateCandidacyByID,
  acceptTopCvAverage,
  getOneCandidacy,
  deleteCandidacyById
}= require("../Controllers/textExtractor")
const upload = multer();

const uploadFileToCloudinary = require("../middleware/fileMiddleWare");
const { verifyToken } = require("../middleware/authJWT");

//Ajouter une candidature
router.post("/addCandidature", uploadFileToCloudinary, AjouterCandidature);

//Modifier une candidature
router.put("/updateCandidature/:id", ModifierCandidature);

//Supprimer une candidature
router.delete("/deleteCandidature/:id", SupprimerCandidature);

//get tous les candidatires
router.get("/getAllCandidature", getAllCandidature);

// get candidatire by id
//router.get("/getCandidatureById/:id", getCandidatureById);

//reject Candidature par id
router.put("/rejectCandidatureById/:id", rejectCandidatureById);

// Accept Candidature par id
//router.put("/acceptCandidatureById/:id", acceptCandidatureById);

router.get("/getAllCandidatureStudent/:userid", getCandidatureByStudentId);
router.post("/addCandidacy", extractTextAndContactInfoFromPDF);
router.post("/upload",upload.single('pdf'), uplodCv);
router.get("/top-candidacies/:limit",topCvAverage)
router.get("/candidacy/:candidacyid",getCandidacyByID)
router.put("/candidacy/:candidacyid",updateCandidacyByID)
router.put("/aceept-top-candidacies/:limit/:offerid",acceptTopCvAverage)
router.get("/one/:offerid",getOneCandidacy)
router.get("/getCandidatureById/:id", getCandidatureByIdOffer)
router.delete("/delete/:id",deleteCandidacyById)



module.exports = router;
