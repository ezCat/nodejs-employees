// Require module
var express = require('express');
var mongodb = require('mongodb');
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    assert = require('assert');
var $ = require('jquery');

var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname));

var db = new Db('employees', new Server('localhost', 27017));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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
    var id = 6,
        nom = req.body.nom,
        prenom = req.body.prenom,
        naissance = req.body.naissance,
        entry = req.body.entry,
        out = req.body.out, 
        poste = req.body.poste,
        salaire = req.body.salaire,
        numero = req.body.numero,
        mail = req.body.mail;

    var json = {
      'id': id,
      'name': nom,
      'prenom': prenom,
      'naissance': naissance,
      'poste': poste,
      'salaire': salaire,
      'entry': entry,
      'out': out,
      'numero': numero,
      'mail': mail
    };

    collection.insert(json, function(err) {
      if (err) console.log('Erreur');
      console.log('Ajout' + json);
      res.location('/collaborateurs');
    });
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