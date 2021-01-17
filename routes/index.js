const { response } = require('express');
var express = require('express');
var bcrypt = require('bcrypt')
const loginhelpers = require('../helpers/loginhelpers');
var loginhelper = require('../helpers/loginhelpers');

var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',);
});
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.get('/login', (req, res) => {
  
  res.render('login')
  
})
router.post('/signup', (req, res) => {
  console.log(req.body)
  loginhelpers.signup(req.body).then((response) => {
    
    res.render('login')
  })

})
router.post('/login', (req, res) => {
  loginhelper.login(req.body).then((response) => {
    console.log(response);
if (response.status){
  res.render('sucess',{response})
}
else{
 res.redirect('/')
}
    
})
})

router.get('/logout',(req,res)=>{
  res.redirect('/')
})

module.exports = router;
