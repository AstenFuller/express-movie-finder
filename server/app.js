require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

app.use(morgan('dev'));

let cache = [];

app.get('/', (req, res) => {
    axios({
        url: `http://omdbapi.com/?i=${req.query.i}&apikey=${process.env.OMDB_API_KEY}`,
        method: 'get'
    })
    .then((response) => {
        res.send(response.data);
    })
    .catch((err) => console.log(err))
});



module.exports = app;