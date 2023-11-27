const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'pfp',
    description: 'Shows the pfp of the user',

    callback: async (client, interaction) => {
        await interaction.deferReply();

        // Check if a user was mentioned in the command
        const targetUserInput = interaction.options.get('target-user')?.value;

        // If a user was mentioned, try fetching their information
        let targetUser;
        if (targetUserInput) {
            // Check if the input is a mention
            if (targetUserInput.startsWith('<@') && targetUserInput.endsWith('>')) {
                const userId = targetUserInput.slice(2, -1);
                targetUser = await client.users.fetch(userId);
            }  
            else {
                // If it's not a mention, assume it's a user ID
                targetUser = await client.users.fetch(targetUserInput);
            }
        } else {
            // If no user was mentioned, use the author of the command
            targetUser = interaction.user;
        }

        const embed = new EmbedBuilder()
            .setColor('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
            .setTitle(`User Profile Picture - ${targetUser.tag}`)
            .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 512 }));

        await interaction.editReply({ embeds: [embed] });
    },

    options: [
        {
            name: 'target-user',
            description: 'The user to show the profile picture (mention or user ID)',
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
};
