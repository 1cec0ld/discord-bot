
const TicTacToe = require('./games/tictactoe/discordgame');
const actives = {};
const helpContent = mls`Usage:
                      \`!ttt start\`
                      \`!ttt start [@player2] [#3-9]\`
                      \`!ttt end\`
                      example: !ttt @1cec0ld #3`;

module.exports = function(bot, msg) {
  const words = msg.split(' ');
  if (words.length == 1) {
      msg.reply(helpContent());
      return;
  }
  if((actives[msg.author.id] == undefined || actives[msg.author.id] == null) &&
    words[1].toLowerCase() == 'end'){
      actives[msg.author.id].end();
      actives[msg.author.id] = null;
      msg.reply('Game ended');
      return;
  }
  
  if(words[1].toLowerCase() != 'start'){
      msg.reply(helpContent());
  }
    case 2:
      if (words[1].toLowerCase() == 'start' &&
      ) {
      
      }
      break;
    case 4:
      let command = words[1];

  }
};

actives[msg.author.id] = new TicTacToe(bot, msg, null, 3);


// https://muffinresearch.co.uk/removing-leading-whitespace-in-es6-template-strings/
function mls(strings, ...values) {
  // Merge the strings with the
  // substitution vars first.
  let output = '';
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];
  // Split on newlines.
  const lines = output.split(/(?:\r\n|\n|\r)/);
  // Rip out the leading whitespace.
  return lines
      .map((line) => {
        return line.replace(/^\s+/gm, '');
      })
      .join('\n')
      .trim(); // join with (" ") to force single line
}
