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
app.use(bodyParser.urlencoded({extended: true}));


//Routes

app.get('/accueil', function (req, res) {
    res.render('index.ejs');
});

// Affiche la page de liste des employés
app.get('/collaborateurs', function (req, res) {
    // Cnx à la base
    db.open(function (err, db) {
        var collection = db.collection("employee");
        // Requete sur la base + convertir en tableau les résultats
        collection.find().toArray(function (err, result) {
            if (err) return console.log(err)
            // Retourne la vue avec comme param le résultat
            res.render('liste-employes.ejs', {users: result});
        });
    });
});

// Affiche la vue d'ajout sur la requete GET
app.get('/collaborateurs/new', function (req, res) {
    res.render('form.ejs');
});

// Requete d'ajout en base de données par requete POST
app.post('/collaborateurs/new', function (req, res) {
    // Cnx à la base
    db.open(function (err, db) {
        // Séléction de la collection
        var collection = db.collection("employee");

        // Récupération des données du formulaires "req.body.name" données du formuaire POST
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

        // Insere dans un objet JSON
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

        // Insére le document
        collection.insert(json, function (err) {
            if (err) console.log('Erreur');
            console.log('Ajout' + json);
            db.close();
        });
    });
    // Redirige vers la page /collaborateurs
    res.redirect('/collaborateurs');
});

// Obtenir les informations d'un seul employé
app.get('/collaborateur/:nom/:prenom', function (req, res) {
    res.render('employe.ejs');
});

// Lance l'application sur le port 8080
app.listen(8080);
console.log('Surprise MothaFucker ! (cf. Dexter)');