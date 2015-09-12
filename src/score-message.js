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
      let table = [];

      let rowHeader = [];
      rowHeader.push('*PLAYER*');
      rowHeader.push('*WIN*');
      table.push(rowHeader);

      request('https://slack.com/api/search.all?token=xoxp-2593466194-2593466200-10613194609-fcc8c7e2a0&query=in%3Apoker%20Congratulations&pretty=1',
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var map = new HashMap();
            var matches = body.messages.matches;

            for(var line in matches) {
              var t1 = matches[line].text.replace("Congratulations ", "");
              var t2 = t1.replace(", you've won!", "");

              if (map.has(t2)) {
                var sc = map.get(t2);
                map.set(t2, sc + 1);
              } else {
                map.set(t2, 1);
              }

              map.forEach(function(value, key) {
                let rowStart = [];
                rowStart.push(key);
                rowStart.push(value);
                table.push(rowStart);
              });
            }
          }
        }
      );

      let helpTable = `${tableFormatter}${textTable(table)}${tableFormatter}`;

      channel.send(helpTable);
    }
}

module.exports = ScoreMessage;