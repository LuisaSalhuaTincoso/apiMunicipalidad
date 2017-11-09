var express= require('express');
var mongoose= requiere('mongoose');
var app= express();

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());

});

app.get('/', function(req,res){
	res.send('Hola mundo');
});
