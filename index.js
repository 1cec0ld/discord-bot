require('dotenv').config();
const commands = require('./commands');
const Discord = require('discord.js');
const bot = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', (msg) => {
  const words = msg.content.split(' ');
  if (words[0].toLowerCase() in commands) {
    commands[words[0].toLowerCase()]({bot: bot, msg: msg});
  }
});
