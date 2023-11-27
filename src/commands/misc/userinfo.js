const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Show the users information',

    callback: async (client, interaction) => {
        await interaction.deferReply();


        const targetUserInput = interaction.options.get('target-user')?.value;

        let targetUser;
        if (targetUserInput) {
            if (targetUserInput.startsWith('<@') && targetUserInput.endsWith('>')) {
                const userId = targetUserInput.slice(2, -1);
                targetUser = await client.users.fetch(userId);
            }  
            else {
                targetUser = await client.users.fetch(targetUserInput);
            }
        } else {
            targetUser = interaction.user;
        }

        const embed = new EmbedBuilder()
            .setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
            .setTitle(`User Info - ${targetUser.tag}`)
            .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 512 }));

        await interaction.editReply({ embeds: [embed] });
    },

    options: [
        {
            name: 'target-user',
            description: 'Shows the users info',
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
}