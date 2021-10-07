const dateCommand = require('./date/dateCommand');
const TicTacToeMaker = require('./games/tictactoe/gamemaker');
const validCommands = {};
const tictactoe = [];

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
  tictactoe[obj.msg.author.id] = new TicTacToeMaker(obj.bot, obj.msg);
};

module.exports = validCommands;
