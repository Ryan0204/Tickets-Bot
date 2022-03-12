const express = require('express')
const app = express()
const colors = require('colors');

const fetch = require('node-fetch')

app.get('/direct', (req, res) => {

fetch(req.query.url, { headers: { 'Accept-Encoding': 'utf8' } })
    .then(async (r) => {
      const html = await r.text()
      res.status(200).send(html)
    });

})

app.listen(8080, console.log('[Tickets]'.green, 'App listen in port 8080'));


/**********************************************************
 * @INFO
 * Bot Coded by RyanChan#0204 | https://discord.gg/XBnRvZaHcc
 * @INFO
 * Code for Rocket Community | Coding Lounge | https://rocketdev.host
 * @INFO
 * Please mention him / Rocket Community | Coding Lounge, when using this Code!
 * @INFO
 *********************************************************/

