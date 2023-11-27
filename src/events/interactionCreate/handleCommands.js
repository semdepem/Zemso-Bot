const {devs, testServer, testServer2, supportServer, steamGamers} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.devOnly){
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'Only developers are allowed to run this command.',
                    ephemarel: true,
                });
                return;
            }
        }

        if (commandObject.testOnly){
            if (!(interaction.member.id === testServer)) {
                interaction.reply({
                    content: 'This command cannot be ran here',
                    ephemarel: true,
                });
                return;
            }            
        }

        if (commandObject.testOnly){
            if (!(interaction.member.id === testServer2)) {
                interaction.reply({
                    content: 'This command cannot be ran here',
                    ephemarel: true,
                });
                return;
            }            
        }

        if (commandObject.testOnly){
            if (!(interaction.member.id === supportServer)) {
                interaction.reply({
                    content: 'This command cannot be ran here',
                    ephemarel: true,
                });
                return;
            }            
        }

        if (commandObject.testOnly){
            if (!(interaction.member.id === steamGamers)) {
                interaction.reply({
                    content: 'This command cannot be ran here',
                    ephemarel: true,
                });
                return;
            }            
        }

        if (commandObject.permissionsRequired?.lenght){
            for (const permission of commandObject.permissionsRequired){
                if (!interaction.member.permission.has(permission)){
                    interaction.reply({
                        content: 'Not enough permissions',
                        ephemarel: true,
                    });
                    break;
                }
            }
        }
        if (commandObject.botPermissions?.lenght){
            for (const permission of commandObject.botPermissions){
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)){
                    interaction.reply({
                        content: "I dont have enogh permissions.",
                        ephemarel: true,
                    });
                    break;
                }
            }
        }
        await commandObject.callback(client, interaction);
        
    } catch (error) {
        console.log(`there was an error running this command "${error}".`);
    }
};