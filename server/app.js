require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

app.use(morgan('dev'));

let cache = [];

app.get('/', (req, res) => {
    if(req.query.i) {
        if(cache[req.query.i]) {
            res.send(cache[req.query.i])
            console.log('being sent from cache')
        } else {
            axios({
                url: `http://omdbapi.com/?i=${req.query.i}&apikey=${process.env.OMDB_API_KEY}`,
                method: 'get'
            })
            .then((response) => {
                cache[response.data.imdbID] = response.data;
                res.send(response.data);
            })
            .catch((err) => console.log(err))
        }
    }
    else if (req.query.t) {
        if(cache[req.query.t.toLowerCase()]) {
            res.send(cache[req.query.t.toLowerCase()])
            console.log('being sent from cache')
        } else {
            axios({
                url: `http://omdbapi.com/?t=${req.query.t}&apikey=${process.env.OMDB_API_KEY}`,
                method: 'get'
            })
            .then((response) => {
                cache[response.data.Title.toLowerCase()] = response.data;
                res.send(response.data);
            })
            .catch((err) => console.log(err))
        }
    }
    else {
        res.send('Look for a movie');
    }
});



module.exports = app;