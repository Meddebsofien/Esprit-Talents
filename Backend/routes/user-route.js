var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api', (req, res)=> {
  res.send('working...');
});

module.exports = router;
