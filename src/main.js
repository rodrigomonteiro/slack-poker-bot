require('babel/register');
var http = require('http');
//var mongo = require('mongodb');

try {
  var fs = require('fs');
  var pathToken = process.env.SLACK_POKER_BOT_TOKEN;
  var token = pathToken || fs.readFileSync('token.txt', 'utf8').trim();
} catch (error) {
  console.log("Your API token should be placed in a 'token.txt' file, which is missing.");
  return;
}

var Bot = require('./bot');
var bot = new Bot(token);
bot.login();

// Heroku requires the process to bind to this port within 60 seconds or it is killed 
http.createServer(function(req, res) {

  var mongo = require('mongodb');
  var MongoClient = mongo.MongoClient;
  //var ObjectId = require('mongodb').ObjectID;
  var url = 'mongodb://heroku_q2m8chsx:r28LabJ!8@ds041154.mongolab.com:41154/heroku_q2m8chsx';

  mongo.Db.connect(url, function (err, db) {
    db.collection('test_init', function(er, collection) {
      var dateNow = new Date()
      collection.insert({"hora": dateNow}, {safe: true}, function(er,rs) {
      });
    });
  });

  var insertDocument = function(db, callback) {
    db.collection('test_init').insertOne( {
      "acesso" : new Date()
    }, function(err, result) {
      console.log("[INSERT]" + err);
      console.log("Inserted a document into the test_init collection.");
      callback(result);
    });
  };

  MongoClient.connect(url, function(err, db) {
    insertDocument(db, function() {
      db.close();
    });
  });

  res.end('SLACK_POKER_BOT');
}).listen(process.env.PORT || 5000)