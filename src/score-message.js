const textTable = require('text-table');
const request = require('request');
const HashMap = require('hashmap');

class ScoreMessage {
    // Public: Displays a fixed-width text table showing score
    //
    // channel - The channel where the help message will be displayed
    // tableFormatter - (Optional) String that will wrap the text table and can
    //                  provide additional formatting
    //
    // Returns nothing
    static displayScore(tokenAPI, channel, tableFormatter=`\`\`\``) {
      var options = {
        url: 'https://slack.com/api/search.all?token=' + tokenAPI + '&query=in%3Apoker%20%20from%3A%40poker_bot%20Congratulations&pretty=1',
        json: true
      };

      request.get(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            let table = [];
            let mapWin = new HashMap();

            let rowHeader = [];
            rowHeader.push('*PLAYER*');
            rowHeader.push('*WIN*');
            table.push(rowHeader);

            var matches = body.messages.matches;

            for(var line in matches) {
              var t1 = matches[line].text.replace("Congratulations ", "");
              var t2 = t1.replace(", you've won!", "");

              if (mapWin.has(t2)) {
                var sc = mapWin.get(t2);
                mapWin.remove(t2);
                //sc += 1
                mapWin.set(t2, sc + 1);
              } else {
                mapWin.set(t2, 1);
              }
            }

            mapWin.forEach(function(value, key) {
              let rowStart = [];
              rowStart.push(key);
              rowStart.push(value);
              table.push(rowStart);
            });

            mapWin.clear();

            let scoreTable = `${tableFormatter}${textTable(table)}${tableFormatter}`;

            channel.send(scoreTable);
          }
        }
      );
    }
}

module.exports = ScoreMessage;