const express 	= require('express');
var mysql 		= require('mysql');
const app 		= express();
var bodyparser	= require('body-parser');
const port 		= 3000;

app.listen(port, () => console.log(`Node server is listening on port no ${port}!`));

var dbConfiguration = {
	'host':'127.0.0.1',
	'user':'root',
	'pass':'',
	'database':'mynodejs',
	'timezone':'local'
};

var dbConnection = mysql.createConnection(dbConfiguration);

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
	dbConnection.query('SELECT * FROM users WHERE 1', function(err, rows, fields ){
		if(!err){
			res.send(rows);
		}
		else{
			console.log(err);
		}
	});
});

app.get('/users/:id', function(req, res){
	console.log('user details');
	dbConnection.query('SELECT * FROM users WHERE id = ?', [req.params.id], function(err, rows, fields){
		if(!err){
			if(rows){
				res.send(rows);
			}
			else{
				res.send({'message':'No records found'});
			}
		}
		else{
			console.log(err);
		}
	});
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

app.get('*', function(req, res){
	res.send({'error':'Sorry, route not found!'});
});

//dbConnection.end();


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



