const textTable = require('text-table');

class HelpMessage {
  // Public: Displays a fixed-width text table showing all commands
  //
  // channel - The channel where the help message will be displayed
  // tableFormatter - (Optional) String that will wrap the text table and can
  //                  provide additional formatting
  //
  // Returns nothing
  static displayHelp(channel, tableFormatter=`\`\`\``) {
    let table = [];

    let rowHeader = [];
    rowHeader.push('*ACTION*');
    rowHeader.push('*COMMAND*');
    rowHeader.push('*OPTION*');
    table.push(rowHeader);

    let rowStart = [];
    rowStart.push('To Start a game');
    rowStart.push('@<your-bot-name>: deal');
    table.push(rowStart);

    let rowQuit = [];
    rowQuit.push('To Quit a game');
    rowQuit.push('@<your-bot-name>: quit game');
    table.push(rowQuit);

    let rowScore = [];
    rowScore.push('To Show the game score');
    rowScore.push('@bot_name: score');
    table.push(rowScore);

    let rowConfig = [];
    rowConfig.push('To config some bot options');
    rowConfig.push('@<your-bot-name>: config <name-of-option>=<value>');
    rowConfig.push('timeout: Sets the duration (in sec) before a player times out. 0 = no timeout.');
    table.push(rowConfig);

    let rowCheck = [];
    rowCheck.push('To Check');
    rowCheck.push('C or Check');
    table.push(rowCheck);

    let rowCall = [];
    rowCall.push('To Call');
    rowCall.push('C or Call');
    table.push(rowCall);

    let rowFold = [];
    rowFold.push('To Fold');
    rowFold.push('F or Fold');
    table.push(rowFold);

    let rowRaise = [];
    rowRaise.push('To Raise');
    rowRaise.push('R or R <value> / Raise or Raise <value>');
    table.push(rowRaise);

    let rowBet = [];
    rowBet.push('To Bet');
    rowBet.push('B or B <value> / Bet or Bet <value>');
    table.push(rowBet);

    let rowAllin = [];
    rowAllin.push('To ALL IN');
    rowAllin.push('Allin');
    table.push(rowAllin);

    let helpTable = `${tableFormatter}${textTable(table)}${tableFormatter}`;

    channel.send(helpTable);
  }
}

module.exports = HelpMessage;
