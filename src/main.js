require('babel/register');
var http = require('http');

try {
  var fs = require('fs');
  var pathToken = process.env.SLACK_POKER_BOT_TOKEN;
  var pathTokenApi = process.env.SLACK_API;
  var token = pathToken || fs.readFileSync('token.txt', 'utf8').trim();
  var tokenApi = pathTokenApi || fs.readFileSync('tokenApi.txt', 'utf8').trim();
} catch (error) {
  console.log("Your API token should be placed in a 'token.txt' file, which is missing.");
  return;
}

var Bot = require('./bot');
var bot = new Bot(token);
bot.login(tokenApi);

// Heroku requires the process to bind to this port within 60 seconds or it is killed 
http.createServer(function(req, res) {
  res.end('SLACK_POKER_BOT');
}).listen(process.env.PORT || 5000)
