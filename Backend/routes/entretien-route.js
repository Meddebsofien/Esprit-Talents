var express = require('express');
var router = express.Router();
const entretienController = require('../Controllers/entretien-controller');
const { google } = require('googleapis');

const GOOGLE_CLIENT_ID = '378674684451-92bus170ne1jlv9tn64ontuqtcopi32i.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const REFRESH_TOKEN="1//09INdqesIM5YSCgYIARAAGAkSNwF-L9Ir1Gqo4yMxu1OI43TdXZ9zpkRx_SjIr7UqqF-T9kVhV5JbhAUutyP7xvsZUkwxEkGljDU"
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:5173'
);

/* GET users listing. */
router.get('/api', (req, res) => {
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

router.post('/create-tokens', async (req, res, next) => {
  try {
    const code = req.body;
    const tokens = await oauth2Client.getToken(code);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});

router.post('/create-event',async(req,res,next)=>{
  try {
    const {summary,description,date_debut,date_fin,location}=
    req.body

  oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
  const calendar=google.calendar('v3')
  const response= await calendar.events.insert({
    auth:oauth2Client,
    calendarId:'primary',
    requestBody:{
      location:location,
      summary:summary,
      description:description,
      colorId:'1',
      start:{
        dateTime: new Date(date_debut),
      },
      end:{
        dateTime: new Date(date_fin),
      },
    }
  })
  res.send(response)
  } catch (error) {
    next(error);
  }
})
module.exports = router;