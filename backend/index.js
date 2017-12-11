const express = require('express')
const app = express()

var nodemailer = require('nodemailer');
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
	nr=db.collection('User').findOne({'user':req.body.username, 'password':req.body.password},function(err, results) {
		console.log(results);
		if ( err || results === null) {
			res.status(400);
			res.send("Wrong crendetials");
		}
		else {
			res.status(200);
			res.json({"admin":results.admin})
		}
	});
});

app.post('/register',function(req, res) {
	nr=db.collection('User').insertOne({'user':req.body.usernam, 'password':req.body.passwor, 'mail':req.body.mail, 'nume':req.body.nume , 'admin':false},function(err,result){
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
	nr=db.collection('Produse').find({}).toArray(function(err,result){
		if(err || result === null)
		{
			console.log(err);
			res.status(400);
			res.send("Could not retrieve products from Mongo!");
		}
		else
		{
			console.log("received products from db");
			console.log(result);
			res.status(200);
			res.json(result);
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

app.post('/putorder',function(req,res){
	db.collection('Comenzi').insertOne({'comanda':req.body.products,user:req.body.user , my_id : req.body.order_id , return :false},function(err,result){
		if( err || result === null ){
			res.status(400);
			res.send("Nasol");
		}else{
			res.send("The order was placed!");
			res.status(200);
		}
	})
});

app.post('/order',function(req,res){
	db.collection('Comenzi').find({'user':req.body.user}).toArray(function(err,result){
		if( err || result === null ){
			res.status(400);
			res.send("Nasol");
		}else{
			res.send(result);
			res.status(200);
		}
	})
});

// app.post('/updateproduct',function(req,res){
// 	db.collection('Produse').findOne({'name':req.body.product},function(err,result){
// 		if( err || result === null ){
			
// 		}else{
// 			res.send("The order was placed!");
// 			res.status(200);
// 		}
// 	})
// });


app.get('/users',function(req,res){
	db.collection('User').find({}).toArray(function(err,result){
		if( err || result === null ){
			res.status(400);
			res.send();
		}
		else
		{
			res.send(result);
			res.status(200);
		}
	})
});

app.post('/users/update',function(req,res){
	db.collection('User').updateOne({"user":req.body.user},{$set:{"admin":true}},function(err,result){
		if( err || res === null){
			res.status(400);
			res.send();
		}else {
			res.status(200);
			res.send();
		}
	})
})


app.post('/users/delete',function(req,res){
	db.collection('User').deleteOne({"user":req.body.user},function(err,result){ 
			if( err || result == null){ 	
					res.status(400); 	
					res.send(); 
			}else{ 	
					res.status(200); 		
					res.send(); 	
		}
	})
})

app.post('/retur',function(req,res){
	db.collection('Comenzi').updateOne({user: req.body.user , my_id: req.body.order_id},{$set:{"return":true}} ,function(err,result){
		if( err || res === null){
			res.status(400);
			res.send();
		}else {
			res.status(200);
			res.send();
		}
	})
})

app.post('/users/credentials',function(req,res){
	db.collection('User').updateOne({"user":req.body.user},{$set:{"mail":req.body.user,"password":req.body.password}},function(err,result){
		if( err || res === null){
			res.status(400);
			res.send();
		}else {
			res.status(200);
			res.send();
		}
	})
});

app.post('/product/add',function(req,res){
	console.log(req.body);
	db.collection('Produse').insertOne({"cost":req.body.cost,"name":req.body.name,"description":req.body.description,"numar":10 ,"nr_rates":0, "rate":0},function(err,result){
		if( err || res === null){
			res.status(400);
		}else {
			console.log(result);
			res.status(200);
			res.send();
		}
	})
})


app.get('/send/mail',function(req,res){
	var email = req.body.mail;
	var message = req.body.message;
	var phone = req.body.phone;
	var fullName = req.body.name;
	db.collection('Contact').insertOne({'email':email, 'message':message, 'fullName':fullname,'phone':phone},function(err,result){
		if(err)
		{
			console.log(e);
			res.status(400);
			res.send("Could not insert the message into databse!");
		}
		else
		{
			console.log("Your message was inserted!");
			res.status(200);
			res.send("Your message was inserted!");
		}
	});
})

app.post('/comment/add',function(req,res){
	db.collection('Produse').updateOne({'name':req.body.name},{$push:{comments : req.body.comment}},function(err,result){ 
			if( err || result == null){ 	
					res.status(400); 		
					res.send(); 	
			}else{ 		
					res.status(200); 	
					res.send(); 	
			} 
	})
});

app.post('/comment/delete',function(req,res){
	db.collection('Produse').updateOne({'name':req.body.name},{$pull:{comments : {$in : [req.body.comment]}}},function(err,result){ 	
		if( err || result == null){ 		
			res.status(400); 		
			res.send(); 	
		}else{ 		
			res.status(200); 
			res.send(); 
		} 
	})
});



app.post('/rate/update',function(req,res){
	db.collection('Produse').updateOne({'name':req.body.name},{$set:{nr_rates:req.body.nr_rate,rate:req.body.rate}},function(err,result){ 	
		if( err || result == null){ 	
				res.status(400); 	
				res.send(); 	
		}else{ 		
				res.status(200); 		
				res.send(); 	
		}
	})
})