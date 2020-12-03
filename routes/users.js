const { json } = require('body-parser');
var express = require('express');
var session = require('express-session')
var router = express.Router();
var authentication_utilities = require('../core/verify_authentification')

const USER_ROLE = {
  "MED":2,
  "LIB":1,
  "WRONG_PASS":0,
  "UNDEFINED":-1
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




router.get('/transaction/library', function(req, res, next) {

  if(req.session.username && req.session.role){
    //res.render('transaction', { title: 'Express' });

    if(req.session.role === USER_ROLE.LIB){

      res.render("transaction_library")
    }
  }else{
    res.redirect("/sign_in")
  }
  
  

});

router.get('/transaction/publishing_house', function(req, res, next) {

  if(req.session.username && req.session.role){
    //res.render('transaction', { title: 'Express' });

    if(req.session.role === USER_ROLE.MED){

      res.render("transaction_publishing_house")

    }
  }else{
    res.redirect("/sign_in")

  }
  
  

});


/* POST authentification a new paper. */

router.post('/authentication',function(req, res, next) {

  ID = req.body
  userName = ID.userName;
  userPass = ID.userPass;

  try {
  
    user_result = authentication_utilities.checkUser(userName,userPass);
    
    if (user_result.Valid) {

      req.session.username = userName
      req.session.role = user_result.Role

      if(user_result.Role === USER_ROLE.LIB){

        res.json({"username": userName,"role":user_result.Role,"redirect_url":"/users/transaction/library"});

      }
      if(user_result.Role === USER_ROLE.MED){

        res.json({"username": userName,"role":user_result.Role,"redirect_url":"/users/transaction/publishing_house"});

      }
    }
    else{

      let message;

      if(user_result.Role === USER_ROLE.WRONG_PASS){
        message = "Wrong password provided"
      }
      else{
        message = "This user is not valid. Please provide valid credentials from a valid organization"
      }
      
      
      res.json({"error_message": message});
    }
  
  } catch (error) {

    res.json({"error_message": error});
    
  }



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

module.exports = router;
