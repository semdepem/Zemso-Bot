require('dotenv').config();
const { Client, IntentsBitField, ActivityType} = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        
    ],
    allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true} ,
});

eventHandler(client);

client.on( 'ready', (c) => {
    client.user.setActivity({
        name: 'your movements',
        type: ActivityType.Watching,
    });
});



client.login(process.env.TOKEN);