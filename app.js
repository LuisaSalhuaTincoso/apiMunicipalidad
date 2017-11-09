var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJs = require("uglify-js");//PARA MINIFICAR LOS ARCHIVOS ANGULAR
var fs = require('fs');

require('./app_api/models/db');

//RUTAS DE LA API
var routesApi = require('./app_api/routes/index');//VARIABLE PARA LAS 

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'app_server' ,'views'));
app.set('view engine', 'jade');

var appClientFiles = [
'app_client/app.js',
'app_client/inicio/inicio.controller.js',
'app_client/common/services/MessagePEData.service.js',
'app_client/common/directives/navigation/navigation.directive.js',
'app_client/common/directives/footerGeneric/footerGeneric.directive.js'

];
var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/Angular/MessagePE.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'MessagePE.min.js');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));//PARA AGREGAR EL ANGULAR

//app.use('/', routes);
//app.use('/users', users);
app.use('/api', routesApi);//ESPECIFICA QUE SE USARA la API PARA LAS PETICIONES GET POST DELETE

app.use(function(req, res) {//PARA HACER USO DEL LA APLICACION ANGULAR
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
