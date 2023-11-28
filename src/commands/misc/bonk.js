const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'bonk',
    description: 'Bonks the user',

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
            .setDescription(`${interaction.user.username} bonked ${targetUser.username}.`)
            .setImage('#'); //This still needs work because it does not work -_-

        interaction.followUp({ embeds: [embed] });
    },
};
