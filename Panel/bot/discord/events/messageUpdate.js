//let client = require("../../../../index.js").client;

module.exports = (client, message, editedMessage) => {
  if (editedMessage.content.toLowerCase().includes("discord.gg")) {
    editedMessage.delete();
  } else if (editedMessage.content.toLowerCase().includes("discord.com")) {
    editedMessage.delete()
  } else if (editedMessage.content.toLowerCase().includes("discordapp.com឵឵")) {
    message.delete()
  } 

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (message === editedMessage) return;
  if (message.channel.type !== 'text') return;

  const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .setThumbnail(message.author.avatarURL)
    .addField("Author ", `${message.author.tag} (ID: ${message.author.id})`)
    .addField("Before Edit ", `${message}`)
    .addField("After Edit", `${editedMessage}`)
    .setTimestamp()
    .setFooter("Message edit in " + message.channel.name);
  client.channels.get(config.DiscordBot.mLogs).send({
    embed
  });
};