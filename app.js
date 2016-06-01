// Require module
var express = require('express');
var mongodb = require('mongodb');
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    assert = require('assert');
var $ = require('jquery');

var app = express();
app.use(express.static(__dirname));

var db = new Db('employees', new Server('localhost', 27017));

app.set('view engine', 'ejs');



//Routes

app.get('/accueil', function(req, res) {
  res.render('index.ejs');
});

app.get('/collaborateurs', function(req, res) {
  db.open(function(err, db) {
    var collection = db.collection("employee");
    collection.find().toArray(function(err, result) {
      if (err) return console.log(err)
      res.render('liste-employes.ejs', {users: result});
    });
  });
});

app.post('/ajouter_collaborateur', function(req, res) {
    db.open(function(err, db) {
    var collection = db.collection("employee");
    collection.insert(req);
  });
});

app.get('/collaborateur/:nom/:prenom', function(req, res) {
  res.render('employe.ejs');
});

app.get('/ajouter', function(req, res) {
  res.render('form.ejs');
});

app.listen(8080);
console.log('Surprise MothaFucker ! (cf. Dexter)');