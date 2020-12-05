var express = require('express');
const session = require('express-session');
var router = express.Router();
//var auth = require('../javascripts/utilities');

const USER_ROLE = {
  "MED":2,
  "LIB":1,
  "WRONG_PASS":0,
  "UNDEFINED":-1
}

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });
 
});


/* sign_in page */
router.get('/sign_in', function(req, res, next) {
  if (req.session.username && req.session.role){
    if(req.session.role === USER_ROLE.LIB){

      res.redirect("/transaction/library")
    }
    if(req.session.role === USER_ROLE.MED){
      res.redirect("/transaction/publishing_house")
    }
  }
  res.render('sign_in');
});

router.get('/logout', function(req, res, next) {
  
  req.session.destroy()
  res.redirect("/")

});

module.exports = router;



