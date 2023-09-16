const { } = require('discord.js');

const client = new Client({  });

client.on('ready', () => {
    console.log('logged in!');
});

client.login();