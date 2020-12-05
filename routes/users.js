const { json } = require('body-parser');
var express = require('express');
var session = require('express-session')
var issue_app = require('../magnetocorp/application/issue');
var read_app = require('../magnetocorp/application/read');
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
  resource = req.body
  resource_id = resource.resource_id;
  resource_issuer = resource.resource_issuer;
  resource_title = resource.resource_title;
  resource_description = resource.resource_description
  resource_value = resource.resource_value

  console.log("Transaction is being processed");
  
  issue_app.issue_contract("issue",resource_id,resource_title,resource_description,resource_value,resource_issuer).then(transaction_res=>{

    
    if(transaction_res===0){

      res.json({"status":0,"message": "Votre transaction a bien été soumise à la validation des peers de bib-block"});

    }
    else{
      res.json({"status":1,"message": "Une erreur est survenue dans le traitement de votre transaction."});
    }

  });
  
  });


router.get('/all_publication',function(req,res,next) {

  if(!req.session.username){
    res.redirect("/sign_in");
  }
  read_app.read_all_assets().then(read_all_res=>{
    if (read_all_res === -1){
      res.json({"status":1,"message":"Erreur lors de la lecture du ledger"})
    }
    else {
      res.json({"status":0,"message":"Votre transaction a bien été effectuée","data":read_all_res})
    }
  })

});
  

module.exports = router;
