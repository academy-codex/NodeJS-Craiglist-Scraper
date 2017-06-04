const axios = require('axios');
var cheerio = require('cheerio');
const fs = require('fs');

var results = [];

var scrape = (url)=>{
    
    axios.get(url).then((response)=>{

        var html = response.data;
        var $ = cheerio.load(html);
        
        var resultProto = {
            title:"",
            price:"",
        };
        
        $('p.result-info').filter(function() {
            
            var data = $(this);
            
            var result = Object.create(resultProto);
            result.title = data.find('.result-title').text();
            result.price = data.find('.result-price').text();
            console.log(result);
            results.push(result);
        });
        
            console.log("Results---------------\n\n");
            console.log(results);
            fs.writeFileSync('results.txt', JSON.stringify(results, undefined, 2));
            //return results;
    }).catch((error)=>{
        console.log(error);
    });

  
};


scrape("https://newyork.craigslist.org/search/sss?query=laptops");




//module.exports = {scrape:scrape};