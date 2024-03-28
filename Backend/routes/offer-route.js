
var express = require('express');
var router = express.Router();  

var { AjouterOffer, ModifierOffer, SupprimerOffer, getAllOffers, getOfferById } = require('../Controllers/offer-controller');

//Ajouter un offer 
router.post('/addOffer', AjouterOffer);

//Modifier un offer
router.put('/updateOffer/:id', ModifierOffer);

//Supprimer un offer
router.delete('/deleteOffer/:id', SupprimerOffer);

//get tous les offers
router.get('/getAllOffers' , getAllOffers);

// get offer by id 
router.get('/getOfferById/:id', getOfferById);

module.exports = router;