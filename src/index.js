require('dotenv').config();

const {
    Client, 
    GatewayIntentBits,
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

client.on(Events.ClientReady, () => {
    console.log('logged in!');
});

client.login(process.env.DISCORD_TOKEN);