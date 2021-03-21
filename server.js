'use strict';

const express = require('express');
const mineflayer = require('mineflayer');
const options = {
    host: '135.125.123.119',
    port: 25586,
    username: `dannyjrofficial@gmail.com`,
    password: 'Cowboy4790!'
};

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

app.post('/dltest', (req ,res) =>{
    const file = `${__dirname}/Install.exe`;
    res.download(file); // Set disposition and send it.
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
app.get('/download', function(req, res){
    const file = `${__dirname}/boo.txt`;
    res.download(file); // Set disposition and send it.
});

console.log(process.env.PORT);

app.listen(process.env.PORT || 3000);