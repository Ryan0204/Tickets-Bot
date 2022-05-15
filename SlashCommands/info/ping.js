const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
        const Pinging = new MessageEmbed()
        .setTitle("PINGING...")
        .addField("Websocket Ping", "Searching", true)
        .addField("API Ping", "Searching", true)
        .addField("Message Edit Ping", "Searching", true)
      const embed = await interaction.followUp({ embeds: [Pinging] });
  
      const websocket = interaction.createdTimestamp - Date.now();
      const api = client.ws.ping.toLocaleString();
      const msgedit = Math.floor(
        embed.createdAt - interaction.createdAt
      ).toLocaleString();
  
      let circles = {
        green: "🟢",
        yellow: "🟡",
        red: "🔴",
      };
  
      const websocketPing =
        websocket <= 200
          ? circles.green
          : websocket <= 400
          ? circles.yellow
          : circles.red;
      const apiPing =
        api <= 200
          ? circles.green
          : api <= 400
          ? circles.yellow
          : circles.red;
      const edit =
        msgedit <= 200
          ? circles.green
          : msgedit <= 400
          ? circles.yellow
          : circles.red;
  
      const Pong = new MessageEmbed()
        .setTitle("Pong 🏓")
        .addField("Websocket Ping", `> ${websocketPing}${websocket.toLocaleString()}`, true)
        .addField("API Ping", `> ${apiPing}${api}`, true)
        .addField("Message Edit Ping", `> ${edit}${msgedit}`, true)
        .setColor(client.colors.invis);
      embed.edit({ embeds: [Pong] });
      interaction.delete();
    },
}

/**********************************************************
 * @INFO
 * Bot Coded by RyanChan#0204 | https://discord.gg/XBnRvZaHcc
 * @INFO
 * Code for Rocket Community | Coding Lounge | https://rocketdev.host
 * @INFO
 * Please mention him / Rocket Community | Coding Lounge, when using this Code!
 * @INFO
 *********************************************************/
