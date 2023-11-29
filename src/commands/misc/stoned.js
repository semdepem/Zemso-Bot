const { EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');

module.exports = {
        name: 'stoned',
        description: 'Throw stones to someone',
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

                const Stoner = interaction.user;
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
                    await targetUser.send(`you got stoned by ${Stoner.username}!!!! from ${interaction.guild.name}.\n`);
                    await targetUser.send(`https://media.tenor.com/uGN34orccIEAAAAC/skillissue-skill.gif\n`);
                } else {
                    console.error(`Cannot send a DM to ${targetUser.user}. DMs may be disabled or the user has blocked the bot.`);
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
            
                setTimeout(async () => {
                    const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Stoned!')
                    .setDescription(`${interaction.user.username} Stoned ${targetUser}.`)
                    .setImage('https://media.tenor.com/Ov8pRwGxwxMAAAAi/haram-stoned.gif'); 

                    interaction.followUp({ embeds: [embed] });
                }, 200); 
       
                console.error(`Cannot send a DM to ${targetUser.user}. DMs may be disabled or the user has blocked the bot.`);
            }
        },
}