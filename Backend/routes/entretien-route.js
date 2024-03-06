var express = require('express');
var router = express.Router();
const entretienController = require('../Controllers/entretien-controller');

/* GET users listing. */
router.get('/api', (req, res)=> {
  res.send('working...');
});

// Create a new interview
router.post('/createEntretien', entretienController.createEntretien);

// Get all interviews
router.get('/getAllEntretiens', entretienController.getAllEntretiens);

// Get a single interview by ID
router.get('/getEntretienById/:entretienId', entretienController.getEntretienById);

// Update an interview by ID
router.put('/updateEntretien/:entretienId', entretienController.updateEntretien);

// Delete an interview by ID
router.delete('/deleteEntretien/:entretienId', entretienController.deleteEntretien);

module.exports = router;
