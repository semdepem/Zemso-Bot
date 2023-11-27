const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || 'No reason provided';

        await interaction.deferReply();

        const bannedUsers = await interaction.guild.bans.fetch();

        const targetBan = bannedUsers.find((ban) => ban.user.id === targetUserId);

        if (!targetBan) {
            await interaction.editReply('This user is not banned in this server.');
            return;
        }

        try {
            await interaction.guild.members.unban(targetUserId, reason);
            await interaction.editReply(`User <@${targetUserId}> was unbanned.\nReason: ${reason}`);
        } catch (error) {
            console.error(`There was an error when unbanning: ${error}`);
            await interaction.editReply('There was an error when unbanning the user.');
        }
    },

    name: "unban",
    description: 'Unbans a member from the server',
    options: [
        {
            name: 'target-user',
            description: 'The user to unban',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'reason',
            description: 'The reason for unbanning',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
};
