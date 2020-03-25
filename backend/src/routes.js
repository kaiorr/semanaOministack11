const express = require('express');
const crypto = require('crypto');
const routes = express.Router();
const connection = require('./database/connection');


routes.post('/ongs', async (req, res) => {
    
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    });

return res.json();

});

module.exports = routes;