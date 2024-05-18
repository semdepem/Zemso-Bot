const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'bonk',
    description: 'Bonks the user',
    options: [
        {
            name: 'target-user',
            description: 'The user to show the profile picture (mention or user ID)',
            required: false,
            type: ApplicationCommandOptionType.String,
        },
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

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Bonk!')
            .setDescription(`${interaction.user.username} bonked ${targetUser.toString()}.`)
            .setImage('https://media.tenor.com/5YrUft9OXfUAAAAC/bonk-doge.gif'); 

        interaction.followUp({ embeds: [embed] });
    },
};
