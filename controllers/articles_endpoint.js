var cheerio = require("cheerio");
var request = require('request');
module.exports = function (app, db) {
  app.get('/api/articles', function(req, res) {
    request('https://www.nytimes.com/', 
      function(err, resp, html) {
      
      var headlines = [];

      if (!err){
        const $ = cheerio.load(html);
        var linksCount = 20;
        var links = $('h2.story-heading > a');
        
        for (var i = 0; i < linksCount; i++) {
          var headlineTxt = '';
          for (var j = 0; j < links[i].childNodes.length; j++) {
            // making sure data is not undefined
            if (links[i].children[j].data) {
              headlineTxt += links[i].children[j].data;
            }
          }
          
          var headline = {
            title: headlineTxt
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

  app.get('/api/articles/saved', function (req, res) {
    db.Article.find({}).then(function (articles) {
      res.send(articles);
    });
  });

  app.post('/api/articles/saved', function (req, res) {
    db.Article.create(req.body).then(function (createdArticle) {
      res.send(createdArticle);
    });
  });

  app.get('/api/articles/saved/note', function (req, res) {
    console.log('Inside note GET endpoint for article');
  });

  app.post('/api/articles/saved/note', function (req, res) {
    console.log('Inside note POST endpoint for article');
  });
};