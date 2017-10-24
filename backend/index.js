const express = require('express')
const app = express()

var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://mtanase:mtanase@ds113445.mlab.com:13445/magazinpw";

app.use(bodyParser.json());

app.use(function (req, res, next) {
	
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	
		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	
		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	
		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);
	
		// Pass to next layer of middleware
		next();
	});

mongoClient.connect(url,function(err, database){
	if (err) return console.log(err);
	db=database;
	app.listen(8080,function(){
		console.log('ascult');
	})
});

app.post('/login',function(req, res) {
	nr=db.collection('User').find({'user':req.body.username, 'password':req.body.password}).count()
	if (nr==1) res.send('nu');
})

