const express 	= require('express');
var mysql 		= require('mysql');
const app 		= express();
var bodyparser	= require('body-parser');
const port 		= 3000;

app.listen(port, () => console.log(`Node server is listening on port no ${port}!`));

var dbConfiguration = {
	host:'127.0.0.1',
	user:'root',
	pass:'',
	database:'mynodejs',
	timezone:'local',
	multipleStatments:true,
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
	res.status(200).send({'status':'success','message':'Welcome to nodejs application'});
});

app.get('/users', function(req, res){
	console.log('users listing');
	dbConnection.query('SELECT id,name,email,date FROM users WHERE 1', function(err, results, fields ){
		if(!err){
			if(results[0]){
				res.status(200).send(results);
			}
			else{
				res.status(200).send({'message':'No record(s) found'});
			}
		}
		else{
			console.log(err);
		}
	});
});

app.get('/users/:id', function(req, res){
	console.log('user details');
	dbConnection.query('SELECT id,name,email,date FROM users WHERE id = ? LIMIT 1', [req.params.id], function(err, rows, fields){
		if(!err){
			if(rows[0]){
				res.status(200).send(rows);
			}
			else{
				res.status(200).send({'message':'No record found'});
			}
		}
		else{
			console.log(err);
		}
	});
});

app.post('/users', function(req, res){
	
	console.log(req.body.Name);
	console.log(req.body.Userid);
	
	let empData = req.body;
	var sqlStatement = "SET @UserId = 0; SET @Name = ?; SET @Email = ?; SET @Date = ?;\
	call mynodejs.UserAddorEdit(@UserId, @Name, @Email, @Date);";
	
	dbConnection.query(sqlStatement,[empData.Userid, empData.Name, empData.email, empData.date], function(err, results, fields){
		if(!err){
			console.log('Success');
		}
		else{
			console.log('error');
		}
	});	
});

app.delete('/users/delete/:id', function(req, res){
	console.log('deleting...user + ' + req.params.id);
	dbConnection.query('DELETE FROM users WHERE id = ?', [req.params.id] , function(err){
		if(!err){
			res.status(200).send({'message':'User deleted successfully'});
		}
		else{
			console.log(err);
		}
	});
});

app.get('*', function(req, res){
	res.status(404).send({'error':'sorry, route not found!'});
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



