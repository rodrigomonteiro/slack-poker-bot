const textTable = require('text-table');
const request = require('request');

class ScoreMessage {
    // Public: Displays a fixed-width text table showing score
    //
    // channel - The channel where the help message will be displayed
    // tableFormatter - (Optional) String that will wrap the text table and can
    //                  provide additional formatting
    //
    // Returns nothing
    static displayScore(channel, tableFormatter=`\`\`\``) {

      request('https://slack.com/api/search.all?token=xoxp-2593466194-2593466200-10613194609-fcc8c7e2a0&query=in%3Apoker%20Congratulations&pretty=1',
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
            channel.send(body);
          }
        }
      );
    }
}

module.exports = ScoreMessage;