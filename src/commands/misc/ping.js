module.exports = {
    name: "ping",
    description: 'Replies with the bot ping!',
    callback: async (client, interaction) => {
        await interaction.deferReply();

        try {
            const reply = await interaction.fetchReply();

            const ping = reply.createdTimestamp - interaction.createdTimestamp;

            interaction.editReply(`Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`);
        } catch (error) {
            console.error("Error fetching or calculating ping:", error);
            interaction.followUp("There was an error while fetching or calculating the ping.");
        }
    },
};
