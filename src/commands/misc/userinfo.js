const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Show the user\'s information',

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const targetUserInput = interaction.options.get('target-user')?.value;

        let targetUser;
        if (targetUserInput) {
            if (targetUserInput.startsWith('<@') && targetUserInput.endsWith('>')) {
                const userId = targetUserInput.slice(2, -1);
                targetUser = await client.users.fetch(userId);
            } else {
                targetUser = await client.users.fetch(targetUserInput);
            }
        } else {
            targetUser = interaction.user;
        }

        const member = await interaction.guild.members.fetch(targetUser.id);
        const highestRole = member.roles.highest.name;

        const embed = new EmbedBuilder()
            .setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
            .setTitle(`User Info - ${targetUser.tag}`)
            .setThumbnail(targetUser.displayAvatarURL())
            .setFields( 
                { name: 'Account Created', value: targetUser.createdAt.toUTCString(), inline: true },
                { name: 'Joined Guild', value: member.joinedAt.toUTCString(), inline: true },
                { name: 'Highest Role', value: highestRole, inline: false },
            );

        await interaction.editReply({ embeds: [embed] });
    },

    options: [
        {
            name: 'target-user',
            description: 'Show the user\'s info',
            required: false,
            type: ApplicationCommandOptionType.String, 
        },
    ],
};
