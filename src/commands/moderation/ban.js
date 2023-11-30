const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        try {
            const targetUserInput = interaction.options.get('target-user').value;
            const reason = interaction.options.get('reason')?.value || 'No reason provided';

            await interaction.deferReply();

            // Check if the user invoking the command has the 'Administrator' permission
            const hasAdminPermission = interaction.member.permissions.has(PermissionFlagsBits.Administrator);

            if (!hasAdminPermission) {
                await interaction.editReply('You do not have the necessary permissions to use this command.');
                return;
            }

            let targetUser;

            if (targetUserInput.startsWith('<@') && targetUserInput.endsWith('>')) {
                const userId = targetUserInput.slice(2, -1);
                targetUser = await interaction.guild.members.fetch(userId);
            } else {
                targetUser = await interaction.guild.members.fetch(targetUserInput);
            }

            if (!targetUser) {
                await interaction.editReply('This user does not exist in this server.');
                return;
            }

            if (!targetUser.roles || targetUser.roles.cache.size === 0) {
                await interaction.editReply('This user has no roles and cannot be banned.');
                return;
            }

            if (targetUser.id === interaction.guild.ownerId) {
                await interaction.editReply('You can\'t ban this member because they are the server owner.');
                return;
            }

            const targetUserRolePosition = targetUser.roles.highest.position;
            const requestUserRolePosition = interaction.member.roles.highest.position;
            const botRolePosition = interaction.guild.members.me.roles.highest.position;

            if (targetUserRolePosition >= requestUserRolePosition) {
                await interaction.editReply('You can\'t ban that user because they have the same/higher role than you.');
                return;
            }

            if (targetUserRolePosition >= botRolePosition) {
                await interaction.editReply('I can\'t ban that user because they have the same/higher role than me.');
                return;
            }

            try {
                await targetUser.send(`You have been banned from ${interaction.guild.name}.\nReason: ${reason}`);
            } catch (error) {
                console.error(`Cannot send a DM to ${targetUser.user.tag}. DMs may be disabled or the user has blocked the bot.`);
            }

            setTimeout(async () => {
                try {
                    await targetUser.ban({ reason });
                    await interaction.editReply(`User ${targetUser} was banned\nReason: ${reason}`);
                } catch (error) {
                    console.error(`There was an error when banning: ${error}`);
                    await interaction.editReply('There was an error when banning the user.');
                    await interaction.deleteReply();
                }
            }, 2000);
        } catch (error) {
            console.error(`An unexpected error occurred: ${error}`);
            await interaction.editReply('An unexpected error occurred.');
        }
    },

    name: 'ban',
    description: 'Bans a member from the server',
    developerOnly: true,
    options: [
        {
            name: 'target-user',
            description: 'The user to ban (mention or user ID)',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'reason',
            description: 'The reason for banning',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
};
