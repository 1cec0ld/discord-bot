const GameInterface = require('./game');

const UNICODE_SQUARE = '□';

class DiscordGame {
  constructor(input) {
    const {bot, msg} = input;
    this.game = new GameInterface();
    this.messageId = null;
    this.channel = msg.channel;
    this.player = msg.author;
    this.initBotMessage(this.channel, this.player);
    this.initBotListeners(bot, msg);
  }
  playGame(input) {
    // console.log(this.game.toString());
  }

  initBotListeners(bot, msg) {
    const reactionListener = (reaction, user) => {
      if (user == this.player) {
        this.channel.send('the right user sent a reaction!');
      } else {
        reaction.remove();
      }
    // bot.removeListener('messageReactionAdd', reactionListener);
    };
    bot.on('messageReactionAdd', reactionListener);
  }

  async initBotMessage(channel, user) {
    if (this.messageId == null) {
      this.messageId = await channel.send(
          messageContent(this.game));
      this.channel.send('The ID is ' + this.messageId);
    }
  }
}


function messageContent(game) {
  let output = 'Let\'s play!\n';
  for (let i = 0; i < game.board.length; i++) {
    output += ((game.board[i] == game.BLANK) ?
              UNICODE_SQUARE :
              game.charSet[game.board[i]]) +' ';
    if ((i-2) % game.size == 0) {
      output += '\n';
    }
  }
  return output;
}

module.exports = DiscordGame;
