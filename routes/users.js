var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST authentification a new paper. */

router.post('/authentication',function(req, res, next) {
  
  console.log(req.body)
  ID = req.body
  userName = ID.userName;
  userPass = ID.userPass;

  console.log("Your auth values are being treated");

});

module.exports = router;
