const dateCommand = require("./date/dateCommand");
const tictactoe = require("./games/tictactoe/discordgame");
var validCommands = {};

validCommands["!leave"] = (obj) => {
  obj.bot.destroy();
};

validCommands["!ping"] = (obj) => {
  let msg = obj.msg;
  if (Math.random() > 0.25) {
    msg.reply("pong");
  } else {
    msg.reply("stop being dumb");
  }
};

validCommands["!date"] = (obj) => {
  let msg = obj.msg;
  dateCommand.processDate(msg);
};

validCommands["!tictactoe"] = (obj) => {
  tictactoe.playGame(obj.msg);
};

module.exports.validCommands = validCommands;
