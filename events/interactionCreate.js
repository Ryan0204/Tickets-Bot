const { Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../index");
const ee = require('../ticketconfig.json');
const discordTranscripts = require('discord-html-transcripts');

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }


    if(interaction.isButton()) {
        const ticketPanel = new MessageEmbed()
            .setTitle(ee["opened-ticket-title"])
            .setDescription(`${ee["opened-ticket-decs"]}`)
            .setFooter({ text: ee["embed-footer-text"], iconURL: ee["embed-footer-url"]})
            .setColor(ee["embed-color"])
        const ticketButtonRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticket-close')
                    .setLabel('Close this Ticket')
                    .setStyle('DANGER'),
            )
        const ticketConfirmRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticket-force-close')
                    .setLabel('Confirm')
                    .setStyle('DANGER'),
            )
        const confirmEmbed = new MessageEmbed()
            .setTitle("Are you sure?")
            .setDescription('Click **__Confirm__** to close this ticket.')
            .setFooter({ text: ee["embed-footer-text"], iconURL: ee["embed-footer-url"]})
            .setColor(ee["embed-color-close"])
        if(interaction.customId === "ticket-create") {
            const ticketChannel = await interaction.guild.channels.create(`${ee["ticket-prefix"]}-${interaction.user.username}`, {
                parent: ee["ticket-category"],
                topic: `Ticket Support - ${interaction.user.username}`,
                type: "GUILD_TEXT",
                permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'ATTACH_FILES']
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                }],
            })
            interaction.reply({ embeds: [new MessageEmbed().setTitle("✅｜SUCCESS").setDescription(`Your Ticket have been opened in <#${ticketChannel.id}>`).setFooter({ text: ee["embed-footer-text"], iconURL: ee["embed-footer-url"]}).setColor(ee["embed-color"])], ephemeral: true})
            ticketChannel.send({ embeds: [ticketPanel], components: [ticketButtonRow] })

        }

        if(interaction.customId === "ticket-close") {
            interaction.reply({ embeds: [confirmEmbed], components: [ticketConfirmRow], ephemeral: true })
        }

        if(interaction.customId === "ticket-force-close") {
            const tchannel = interaction.channel;
            const attachment = await discordTranscripts.createTranscript(tchannel, {
                limit: -1, // Max amount of messages to fetch.
                returnBuffer: false, // Return a buffer instead of a MessageAttachment 
                fileName: 'transcript.html' // Only valid with returnBuffer false. Name of attachment. 
            });


            interaction.reply({ embeds: [new MessageEmbed().setTitle('This ticket will be deleted in 5 seconds.').setColor("RED")]})
            const transcript = await client.channels.cache.get(ee["ticket-transcript"]).send({ content: `${ee.domain}/direct?url=${transcript.attachments.first().url}`, files: [attachment] })
            console.log(`${ee.domain}/direct?url=${transcript.attachments.first().url}`);
            interaction.channel.delete()
        }
        
        
        
    }
});

/**********************************************************
 * @INFO
 * Bot Coded by RyanChan#0204 | https://discord.gg/XBnRvZaHcc
 * @INFO
 * Code for Rocket Community | Coding Lounge | https://rocketdev.host
 * @INFO
 * Please mention him / Rocket Community | Coding Lounge, when using this Code!
 * @INFO
 *********************************************************/