const express = require('express')
const app = express()

app.get('/',function(req, res) {
	res.send('Gaini');
})

app.listen(8080,function(){
	console.log('ascult');
})