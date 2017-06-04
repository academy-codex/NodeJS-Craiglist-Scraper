const fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var scraper = require('./scraper.js');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname + '/public/home.html'));
});

app.get('/scrape', (req,res)=>{
    
    var data = scraper.scrape('https://newyork.craigslist.org/search/sss?query=laptops');
    
    if (data.length)
        res.send(JSON.stringify(data,undefined,2));
    else
        res.send('No results to show');
});
  
app.listen(3000);
