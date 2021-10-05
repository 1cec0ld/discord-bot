require("dotenv").config();
const commands = require("./commands");
const Discord = require("discord.js");
const bot = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("messageCreate", (msg) => {
  let words = msg.content.split(" ");
  if (words[0].toLowerCase() in commands.validCommands) {
    commands.validCommands[words[0].toLowerCase()]({ bot: bot, msg: msg });
  }
});
