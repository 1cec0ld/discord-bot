const GameInterface = require('./game');
const emojiCharacters = require('../../utils/emojiCharacters');

const UNICODE_SQUARE = '□';

class DiscordGame {
  constructor(input) {
    const {bot, msg} = input;
    this.game = new GameInterface();
    this.messageId = null;
    this.choices = [];
    this.validChoices = [];
    for (let i = 0; i < this.game.size; i++) {
      this.validChoices.push(i+1);
    }
    this.channel = msg.channel;
    this.player = msg.author;
    this.initBotMessage();
    this.initBotListeners(bot);
  }

  initBotListeners(bot) {
    const reactionListener = (reaction, user) => {
      if (user.bot) return;
      if (reaction.message.id != this.messageId) return;
      const emote = Object.keys(emojiCharacters)
          .find((key) => emojiCharacters[key] === reaction.emoji.name);
      if (emote == undefined ||
        this.validChoices.indexOf(parseInt(emote)) == -1) {
        reaction.remove();
        return;
      }
      reaction.message.reactions.resolve(emojiCharacters[emote])
          .users.remove(user);
      if (user != this.player) return;
      switch (this.choices.length) {
        case 0:
          this.choices.push(emote-1);
          break;
        case 1:
          this.choices.push(emote-1);
          if (!this.game.mark(this.choices[0], this.choices[1])) {
            this.choices = [];
            return;
          }
          const winner = this.game.winner(); // false, 0 or 1
          console.log('winner?: ' + winner);
          if (winner!= false) {
            console.log('winner: ' + winner);
            bot.removeListener('messageReactionAdd', reactionListener);
          } else if (this.game.cat()) {
            console.log('catsgame');
            bot.removeListener('messageReactionAdd', reactionListener);
          }
          reaction.message.edit(messageContent(this.game));
          this.choices = [];
          break;
        default:
          this.choices = [];
          console.error('Too many options present in the Choices array?');
      }
      console.log(this.choices);

    // bot.removeListener('messageReactionAdd', reactionListener);
    };
    bot.removeListener('messageReactionAdd', reactionListener);
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
    if ((i+1) % game.size == 0 && i != game.board.length-1) {
      output += '\n' + (1+(i+1)/game.size)+ ' ';
    }
  }
  return output+'```';
}

module.exports = DiscordGame;
