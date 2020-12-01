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

router.get('/transactions', function(req, res, next) {

  if(req.session.username){
    res.render('transaction', { title: 'Express' });
  }
  
  res.redirect("/sign_in")

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

      if(user_result.Role === USER_ROLE.MED){

        res.json({"username": userName,"role":user_result.Role,"redirect_url":"TO_COMPLETE"});

      }
      if(user_result.Role === USER_ROLE.LIB){

        res.json({"username": userName,"role":user_result.Role,"redirect_url":"TO_COMPLETE"});

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

module.exports = router;
