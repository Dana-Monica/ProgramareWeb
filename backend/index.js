const express = require('express')
const app = express()

var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://mtanase:mtanase@ds113445.mlab.com:13445/magazinpw";

app.use(bodyParser.json());

app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		next();
});

mongoClient.connect(url,function(err, database){
	if (err) return console.log(err);
	db=database;
	app.listen(8079,function(){
		console.log('ascult');
	})
});

app.post('/login',function(req, res) {
	nr=db.collection('User').find({'user':req.body.username, 'password':req.body.password}).count(function(err, results) {
		if( results == 1 ){
			res.status(200);
			res.send("You are good to go!");
		}else{
			res.status(400);
			res.send("Wrong crendetials");
		}
	});
});

app.post('/register',function(req, res) {
	nr=db.collection('User').insertOne({'user':req.body.usernam, 'password':req.body.passwor, 'mail':req.body.mail, 'nume':req.body.nume},function(err,result){
		if(err)
		{
			console.log(e);
			res.status(400);
			res.send("Wrong crendetials");
		}
		else
		{
			console.log("1 document inserted");
			res.status(200);
			res.send("Good");
		}
	});
});

app.get('/products',function(req, res) {
	nr=db.collection('Produse').find({},function(err,result){
		if(err)
		{
			console.log(e);
			res.status(400);
			res.send("Could not retrieve products from Mongo!");
		}
		else
		{
			console.log("received products from db");
			res.status(200);
			res.send(result);
			//Return JSON
		}
	});
});

app.get('/products/information',function(req, res) {
	nr=db.collection('Produse').findOne({'name':req.name},function(err,result){
		if(err)
		{
			console.log(e);
			res.status(400);
			res.send("Could not retrieve products from Mongo!");
		}
		else
		{
			console.log("received products from db");
			res.status(200);
			res.send(result);
		}
	});
});