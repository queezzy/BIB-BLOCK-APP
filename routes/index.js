var express = require('express');
const session = require('express-session');
var router = express.Router();
var issuer = require('../magnetocorp/application/issue');
//var auth = require('../javascripts/utilities');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });
 
});

/* POST submit a new paper. */

router.post('/submit',function(req, res, next) {
  
  if(!req.session.username){
    res.redirect("/sign_in")
  }
  
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




/* sign_in page */
router.get('/sign_in', function(req, res, next) {
  if (req.session.username && req.session.role){
    res.redirect("/transaction")
  }
  res.render('sign_in', { title: 'Express' });
});

module.exports = router;



