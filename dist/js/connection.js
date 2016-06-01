// Init var Mongo
var MongoClient = mongodb.MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/nodejs-employees';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    //Close connection
    db.close();
  }
});