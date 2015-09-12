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
    static displayScore(channel, tableFormatter=`\`\`\``) {
      request.get({
          url: 'https://slack.com/api/search.all?token=xoxp-2593466194-2593466200-10613194609-fcc8c7e2a0&query=in%3Apoker%20Congratulations&pretty=1',
          json: true
          },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            let table = [];
            let mapWin = new HashMap();

            let rowHeader = [];
            rowHeader.push('*PLAYER*');
            rowHeader.push('*WIN*');
            table.push(rowHeader);

            var matches = body.messages.matches;

            channel.send("MATCHES: " + matches.toString());

            for(var line in matches) {
              var t1 = matches[line].text.replace("Congratulations ", "");
              var t2 = t1.replace(", you've won!", "");

              channel.send("MONTANHA: " + t2);
              channel.send("QTDE: " + mapWin.count());

              if (mapWin.has(t2)) {
                var sc = mapWin.get(t2);
                mapWin.remove(t2);
                channel.send("Ta no map: " + sc);
                sc += 1
                mapWin.set(t2, sc);
              } else {
                channel.send("NÃO ta no map: " + t2);
                mapWin.set(t2, 1);
              }
            }

            mapWin.forEach(function(value, key) {
              channel.send("Percorrendo o MAP, KEY: " + key + " VALUE: " + value);
              let rowStart = [];
              rowStart.push(key);
              rowStart.push(value);
              table.push(rowStart);
            });

            mapWin.clear();

            let helpTable = `${tableFormatter}${textTable(table)}${tableFormatter}`;

            channel.send(helpTable);
          }
        }
      );
    }
}

module.exports = ScoreMessage;