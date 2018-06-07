var cheerio = require("cheerio");
var request = require('request');
module.exports = function (app) {
  app.get('/api/articles', function(req, res) {
    request('https://www.nytimes.com/', 
      function(err, resp, html) {
      
      var headlines = [];

      if (!err){
        const $ = cheerio.load(html);
        var linksCount = 20;
        var links = $('h2.story-heading > a');
        
        for (var i = 0; i < linksCount; i++) {
          var headline = {
            text: links[i].children[0].data
          };
          headlines.push(headline);
        }

        res.send(headlines);
      }
      else {
        res.send(err);
      }
    });
  });
};