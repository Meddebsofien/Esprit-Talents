const { registerUser, currentUser } = require("../Controllers/user-controller");

const validateToken = require("../middleware/validateTokenHandler");
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api', (req, res)=> {
  res.send('working...');
});

const userController = require('../Controllers/user-controller');

router.post("/register", registerUser);

router.get("/current", validateToken, currentUser);

// Lire tous les utilisateurs
router.get('/GetUtilisateurs', userController.getAllUsers);

// Lire un utilisateur par son ID
router.get('/getutilisateur/:userId', userController.getUserById);

// Mettre à jour un utilisateur par son ID
router.put('/updateUtilisateur/:userId', userController.updateUser);

// Supprimer un utilisateur par son ID
router.delete('/deleteUtilisateur/:userId', userController.deleteUser);

// Define the route for fetching users by role
router.get('/users/:role', userController.getUsersByRole);

// Route pour la connexion (signin)
router.post('/signin', userController.signin);
router.post('/AddUser',userController.createUser)
///sofien verification
router.get('/:id/verify/:token', userController.verifyUser);

module.exports = router;
