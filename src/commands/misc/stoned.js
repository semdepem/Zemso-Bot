const { EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');

module.exports = {
        name: 'stoned',
        description: 'kanker turk',
        options: [
            {
                name: 'target-user',
                description: 'The user to Stone (mention or user ID)',
                required: true,
                type: ApplicationCommandOptionType.String,
            }
        ],

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

               try {
                if (targetUser) {
                    await targetUser.send(`je wordt gesteenigd door mensen uit ${interaction.guild.name}.\n`);
                } else {
                    console.error(`Cannot send a DM to ${targetUser.user.tag}. DMs may be disabled or the user has blocked the bot.`);
                }
    
                setTimeout(async () => {
                    const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Stoned!')
                    .setDescription(`${interaction.user.username} Stoned ${targetUser}.`)
                    .setImage('https://media.tenor.com/Ov8pRwGxwxMAAAAi/haram-stoned.gif'); 

                    interaction.followUp({ embeds: [embed] });
                }, 200); 
            } catch (error) {
                console.error(`Cannot send a DM to ${targetUser.user.tag}. DMs may be disabled or the user has blocked the bot.`);
            }
        },
}