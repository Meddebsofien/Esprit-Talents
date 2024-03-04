const { registerUser, currentUser } = require("../Controllers/user-controller");
const { verify } = require('./googleAuthController');
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


// Route pour la connexion (signin)
router.post('/signin', userController.signin);
router.post('/google-login', async (req, res) => {
  const { idToken } = req.body;
  try {
    const userInfo = await verify(idToken);
    // Faites quelque chose avec les informations de l'utilisateur vérifié
    res.status(200).json({ userInfo });
  } catch (error) {
    console.error('Erreur de vérification Google :', error);
    res.status(401).json({ message: 'Échec de l\'authentification avec Google' });
  }
});
module.exports = router;
