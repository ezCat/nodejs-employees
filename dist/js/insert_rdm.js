// Init var Mongo
var MongoClient = mongodb.MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/employees';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('collaborateurs');

    for (var i = 0; i < 5; i++) {
      var user = {
                      id: i,
                      name: 'Michel',
                      prenom: 'Maud',
                      naissance: 21/07/1986,
                      poste: 'DRH',
                      salaire: 1600,
                      date_entry: 13/07/2008,
                      date_out: 13/07/2014,
                      photo: null,
                      numero_arrivee: 132567,
                      mail: 'maud.michel@xyz.com'
                    }
      
    // Insert some users
    collection.insert([user], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
    });
    };
  }
});