// Require module
var mongodb = require('mongodb');
var express = require('express');

var app = express();
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/collaborateurs', function(req, res) {

  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/test';
  MongoClient.connect(url, function(err, db) {
    var users = db.collection('collaborateurs').find();
    db.close();
    res.render('liste-employes.ejs', users);
  });

});

app.get('/collaborateur/:nom/:prenom', function(req, res) {
  res.render('employe.ejs');
});

app.get('/ajouter', function(req, res) {
  res.render('form.ejs');
});

app.listen(8080);