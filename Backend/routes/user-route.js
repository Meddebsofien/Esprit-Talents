const { registerUser, currentUser } = require("../Controllers/user-controller");
const multer = require('multer');
const validateToken = require("../middleware/validateTokenHandler");
const path = require('path');

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
//route signup with google
router.post('/googleregister',userController.registerWithGoogle)
//route login with email google 
router.post('/checkEmail',userController.checkEmail)
//route apigoogle login 
router.post('/api',userController.apigoogle)





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });




// Route POST pour gérer l'upload de la photo

router.post('/upload-photo', upload.single('photo'), (req, res) => {
  try {
    // Vérifier si le fichier a été correctement téléversé
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Récupérer le chemin de la photo téléversée
    const photoURL = req.file.path;
    console.log("Photo uploaded successfully. Path:", photoURL);

    // Répondre avec l'URL de la photo
    res.status(200).json({ photo: photoURL });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ error: "Error uploading photo" });
  }
});



module.exports = router;
