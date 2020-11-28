var express = require('express');
var router = express.Router();
var issuer = require('../magnetocorp/application/issue');
var auth = require('../javascripts/utilities');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST submit a new paper. */

router.post('/submit',function(req, res, next) {
  
  console.log(req.body)
  paper = req.body
  paperID = paper.paperID;
  paperIssuer = paper.paperIssuer;
  paperFaceValue = paper.paperFaceValue;

  console.log("Transaction is being processed");
  
  issuer.issue_contract("issue",paperID,paperIssuer,paperFaceValue).then(function(){
    console.log("Transaction has been submitted");
    res.status(200).send('GOOOOOOOD')
  });


});


/* POST authentification a new paper. */

router.post('/authentification',function(req, res, next) {
  
  console.log(req.body)
  ID = req.body
  userName = ID.userName;
  userPass = ID.userPass;

  console.log("Your auth values are being treated");

});

/* sign_in page */
router.get('/sign_in', function(req, res, next) {
  res.render('sign_in', { title: 'Express' });
});

module.exports = router;



