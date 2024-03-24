var express=require("express");
var router=express.Router();
var { AjouterCandidature, ModifierCandidature, SupprimerCandidature, getAllCandidature, getCandidatureById ,rejectCandidatureById,acceptCandidatureById } = require('../Controllers/candidature-controller');


//Ajouter une candidature
router.post('/addCandidature', AjouterCandidature);

//Modifier une candidature
router.put('/updateCandidature/:id', ModifierCandidature);

//Supprimer une candidature
router.delete('/deleteCandidature/:id', SupprimerCandidature);

//get tous les candidatires
router.get('/getAllCandidature' , getAllCandidature);

// get candidatire by id 
router.get('/getCandidatureById/:idUser', getCandidatureById);

//reject Candidature par id
router.put('/rejectCandidatureById/:idUser', rejectCandidatureById);

// Accept Candidature par id
router.put('/acceptCandidatureById/:idUser', acceptCandidatureById);




module.exports = router;