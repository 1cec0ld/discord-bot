const dateCommand = require('./date/dateCommand');
var validCommands = {};


validCommands["!leave"] = (obj) => {
    obj.bot.destroy();
};

validCommands["!ping"] = (obj) => {
    let msg = obj.msg;
    if(Math.random() > .25){
        msg.reply('pong');
    } else {
        msg.reply('stop being dumb');
    }
};

validCommands["!date"] = (obj) => {
    let msg = obj.msg;
    dateCommand.processDate(msg);
}

module.exports.validCommands = validCommands;