const { Message, Client, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const ee = require('../../ticketconfig.json');
module.exports = {
    name: "panel",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const panelEmbed = new MessageEmbed()
            .setTitle(ee["ticket-title"])
            .setDescription(ee["ticket-decs"])

        const buttonRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticket-create')
                    .setLabel("🎫 Create a Ticket")
                    .setStyle(ee["button-style"])
            )
        message.channel.send({ embeds: [panelEmbed], components: [buttonRow] });

    },
};

/**********************************************************
 * @INFO
 * Bot Coded by RyanChan#0204 | https://discord.gg/XBnRvZaHcc
 * @INFO
 * Code for Rocket Community | Coding Lounge | https://rocketdev.host
 * @INFO
 * Please mention him / Rocket Community | Coding Lounge, when using this Code!
 * @INFO
 *********************************************************/