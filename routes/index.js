var express = require('express');
const session = require('express-session');
var router = express.Router();
var issuer = require('../magnetocorp/application/issue');
//var auth = require('../javascripts/utilities');

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

module.exports = router;



