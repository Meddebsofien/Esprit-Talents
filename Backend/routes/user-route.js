var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api', (req, res)=> {
  res.send('working...');
});





const userController = require('../Controllers/user-controller');
router.post('/AjouterUtilisateur', userController.createUser);

// Lire tous les utilisateurs
router.get('/GetUtilisateurs', userController.getAllUsers);

// Lire un utilisateur par son ID
router.get('/getutilisateur/:userId', userController.getUserById);

// Mettre à jour un utilisateur par son ID
router.put('/updateUtilisateur/:userId', userController.updateUser);

// Supprimer un utilisateur par son ID
router.delete('/deleteUtilisateur/:userId', userController.deleteUser);

module.exports = router;
