const { EmbedBuilder} = require('discord.js');

module.exports = {
        name: 'stoned',
        description: 'kanker turk',

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
                .setColor('#0099ff')
                .setTitle('Stoned!')
                .setDescription(`${interaction.user.username} Stoned Riza.`)
                .setImage('https://media.tenor.com/Ov8pRwGxwxMAAAAi/haram-stoned.gif'); 
    
            interaction.followUp({ embeds: [embed] });
        },
}