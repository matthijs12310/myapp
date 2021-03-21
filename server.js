'use strict';

const express = require('express');
const mineflayer = require('mineflayer');
const options = {
    host: 'localhost',
    port: 51455
}

let bot;

const sendPage = (res) => {
    res.send(`
    <h1>${bot ? 'Bot is ingelogd' : 'Bot is nog niet ingelogd.'}</h1>
    <form action="/result" method="POST">
    <button>Join</button>
    </form>
    <form action="/end" method="POST">
    <button>Disconnect</button>
    </form>
    `);
};

const app = express();

app.get('/', (req, res) => {
    sendPage(res);
});

app.get('/about', (req, res) => {
    res.send('About page here');    
});

app.post('/result', (req, res) => {
    if (!bot)
    {
        bot = mineflayer.createBot(options);
    }
    res.redirect('/');
});

app.post('/end', (req, res) => {
    if (bot)
    {
        bot.end();
        bot = undefined;
    }
    res.redirect('/');
});

app.listen(3000);