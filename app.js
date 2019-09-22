const express 	= require('express');
var mysql 		= require('mysql');
const app 		= express();
const port 		= 3000;

app.listen(port, () => console.log(`Node server is listening on port no ${port}!`));

var dbConnection = mysql.createConnection({
	'host':'127.0.0.1',
	'user':'root',
	'pass':'',
	'database':'mynodejs'
});

dbConnection.connect( function(err){
	if(err){
		console.error('Connection error : ' + err.stack);
		return;
	}
	console.log('Connect success : ' + dbConnection.threadId);
});



app.get('/', function( req, res){
	res.send({'status':'success','message':'Welcome to nodejs application'});
});

app.get('/users', function(req, res){
	console.log('users listing');
	res.send({'status':'success','message':'User listing'});
});

app.post('/users/add', function(req, res){
	console.log('users add');
	res.send({'status':'success','message':'Add user'});
});

app.put('/users/edit/:id', function(req, res){
	console.log('users edit');
	res.send({'status':'success','message':'Edit user'});
});

app.delete('/users/delete/:id', function(req, res){
	console.log('users delete');
	res.send({'status':'success','message':'Delete user'});
});

dbConnection.end();

app.get('*', function(req, res){
	res.send({'Error':'Sorry, route not found!'});
});

// app.use( function(req, res, next){
	
	// console.log('Start');
	// next();
// });

// app.get('/', function( req, res, next){
	// console.log('Middleware');
	// next();	
// });

// app.use('/', function (req, res){
	// console.log('End');
// });


// app.get('/dynamic_view', function(req, res){
   // res.render('dynamic', {
      // name: "TutorialsPoint", 
      // url:"http://www.tutorialspoint.com"
   // });
// });



