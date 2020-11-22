var express = require('express');
var router = express.Router();
var issuer = require('../magnetocorp/application/issue');

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

  res.status(200).send('GOOOOOOOD')

});

module.exports = router;
