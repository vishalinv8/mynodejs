const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Node server is listening on port no ${port}!`));

app.get('/', (req, res) => 
	res.send('welcome to node js framework!')
)

app.get('/users', function(req, res){
	console.log('users listing');
	res.send('this is listing');
});
