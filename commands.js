const dateCommand = require('./date/dateCommand');
const TicTacToe = require('./games/tictactoe/discordgame');
const validCommands = {};

validCommands['!leave'] = (obj) => {
  obj.bot.destroy();
};

validCommands['!ping'] = (obj) => {
  const msg = obj.msg;
  if (Math.random() > 0.25) {
    msg.reply('pong');
  } else {
    msg.reply('stop being dumb');
  }
};

validCommands['!date'] = (obj) => {
  const msg = obj.msg;
  dateCommand.processDate(msg);
};

validCommands['!ttt'] = (obj) => {
  // to-do: test multiple games at once
  const tictactoe = [];
  tictactoe[obj.msg.author.id] = new TicTacToe(obj);
};

module.exports = validCommands;
