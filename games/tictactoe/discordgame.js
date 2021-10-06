const GameInterface = require('./game');
const emojiCharacters = require('../../utils/emojiCharacters');

const UNICODE_SQUARE = '□';

class DiscordGame {
  constructor(input) {
    const {bot, msg} = input;
    this.game = new GameInterface();
    this.messageId = null;
    this.choices = [];
    this.channel = msg.channel;
    this.player = msg.author;
    this.initBotMessage();
    this.initBotListeners(bot);
  }

  initBotListeners(bot) {
    const reactionListener = (reaction, user) => {
      if (user.bot) return;
      if (reaction.message.id != this.messageId) return;
      reaction.remove();
      if (user != this.player) {
        return;
      }
      if (this.choices.length == 0) {
        this.choices.push(Object.keys(emojiCharacters)
            .find((key) => emojiCharacters[key] === reaction.emoji.name));
      }
    // bot.removeListener('messageReactionAdd', reactionListener);
    };
    bot.on('messageReactionAdd', reactionListener);
  }

  async initBotMessage() {
    if (this.messageId == null) {
      this.messageId = await this.channel.send(
          messageContent(this.game));
      this.channel.messages.fetch(this.messageId)
          .then(async (message)=> {
            for (let i = 0; i < this.game.size; i++) {
              await message.first().react(emojiCharacters[i+1]);
            }
          }).catch(console.error);
    }
  }
}

function messageContent(game) {
  let output = 'Let\'s play!\n```  ';
  for (let i = 0; i < game.size; i++) {
    output += (i+1) + ' ';
  }
  output += '\n1 ';
  for (let i = 0; i < game.board.length; i++) {
    output += ((game.board[i] == game.BLANK) ?
              UNICODE_SQUARE :
              game.charSet[game.board[i]]) +' ';
    if ((i-2) % game.size == 0 && i != game.board.length-1) {
      output += '\n' + (2+(i-2)/3)+ ' ';
    }
  }
  return output+'```';
}

module.exports = DiscordGame;
