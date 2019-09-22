var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
// });

router.get('/', function (req, res) {
 
  res.send('<h1>Welcome to Express Framework!</h1><img src="http://localhost:3000/static/logo.jpg">');
  //res.redirect('http://google.com');
  
  
  
  
})

router.post('/', function(req, res){
	res.send('Got a POST Request')
})

router.put('/users',function(req,res){
	res.send('Got a PUT Request on /users')
})

router.delete('/users', function(req,res){
	res.send('Got a DELETE Request on /users')
})

router.use('/static', express.static('public'))



module.exports = router;
