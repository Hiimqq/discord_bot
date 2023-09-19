const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with PONG');

async function execute(interation) {
    await interation.reply('PONG!');

    throw new Error('OH NO!!!');
}

module.exports = {
    data,
    execute,
};