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

        const hasAdminPermission = interaction.member.permissions.has(PermissionFlagsBits.Administrator);

        if (!hasAdminPermission) {
            await interaction.editReply('You do not have the necessary permissions to use this command.');
            return;
        }

        if (!targetBan) {
            await interaction.editReply('This user is not banned in this server.');
            return;
        }

        try {
            // Fetch the user object to get the username and discriminator
            const targetUser = await client.users.fetch(targetUserId);

            // Unban the user
            await interaction.guild.members.unban(targetUserId, reason);

            // Send a DM to the unbanned user
            if (targetUser) {
                await targetUser.send(`You have been unbanned from ${interaction.guild.name}.\nReason: ${reason}`);
            } else {
                console.error(`Cannot send a DM to the unbanned user. DMs may be disabled or the user has blocked the bot.`);
            }

            // Reply in the interaction channel
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
