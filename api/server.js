// implement your server here
// require your posts router and connect it here

const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Shelter API</h>
      <p>Welcome to the Shelter API</p>
    `);
  });
  
  module.exports = server;
  