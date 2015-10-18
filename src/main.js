require('babel/register');
var http = require('http');
var mongo = require('mongodb');

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
  mongo.Db.connect('mongodb://teste:teste@ds041144.mongolab.com:41144/heroku_lxn509sn', function (err, db) {
    db.collection('test_init', function(er, collection) {
      var dateNow = new Date()
      collection.insert({'hora': dateNow}, {safe: true}, function(er,rs) {
      });
    });
  });

  res.end('SLACK_POKER_BOT');
}).listen(process.env.PORT || 5000)