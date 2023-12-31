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
        
        const hasAdminPermission = interaction.member.permissions.has(PermissionFlagsBits.Administrator);

        if (!hasAdminPermission) {
            await interaction.editReply('You do not have the necessary permissions to use this command.');
            return;
        }

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser){
            await interaction.editReply('This user does not exist in this server.');
            return;
        }

        if (targetUser.id === interaction.guild.ownerId){
            await interaction.editReply('You cant kick this member because its the server owner.');
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; //Highest role of target user
        const requestUserRolePosition = interaction.member.roles.highest.position; //Highest role of the user running the command
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // highest role of the bot

        if(targetUserRolePosition >= requestUserRolePosition){
            await interaction.editReply('you cant kick that user because they have the same/higher role than you.');
            return;
        }

        if(targetUserRolePosition >= botRolePosition){
            await interaction.editReply('I cant kick that user because they have the same/higher role than me. ');
            return;
        }

        try {
            if (targetUser) {
                await targetUser.send(`You have been kicked from ${interaction.guild.name}.\nReason: ${reason}`);
            } else {
                console.error(`Cannot send a DM to ${targetUser.user.tag}. DMs may be disabled or the user has blocked the bot.`);
            }

            setTimeout(async () => {
               // await targetUser.kick({ reason });
                await interaction.editReply(`User ${targetUser} was kicked\nReason: ${reason}`);
            }, 2000); 
        } catch (error) {
            console.error(`Cannot send a DM to ${targetUser.user.tag}. DMs may be disabled or the user has blocked the bot.`);
        }

        //kick the targetUser
        try {
            await targetUser.kick({ reason });
            await interaction.editReply(`user ${targetUser} was kicked\nReason: ${reason}`);
        } catch (error) {
            console.log(`There was an error when kicking: ${error}`);
        }
    },

    name: "kick",
    description: 'Kicks a member from server',
    devOnly: true,
    //testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user to kick',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for kicking',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    
};