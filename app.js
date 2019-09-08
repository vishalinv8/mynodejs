const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('welcome to express js framework!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/users', function(req, res){
	console.log('users listing');
	
	
	res.send('this is listing');
});
