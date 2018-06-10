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
          
          let headline = null;
          if (headlineTxt) {
            headline = {
              title: headlineTxt
            };
          } 
          
          // logic to keep empty headlines out of app
          if (headline) {
            headlines.push(headline);
          }
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

  app.delete('/api/articles/saved/:articleId', function (req, res) {
    let articleId = req.params.articleId;
    
    db.Article.remove({ _id: articleId }, function(err) {
      if (!err) {
        res.sendStatus(204); // 204 Success with no content,
      } else {
        res.sendStatus(500);
      }
    });
  });
  
  app.get('/api/articles/saved/:articleId/note', function (req, res) {
    db.Article.findOne({_id: req.params.articleId})
      .populate('notes')
      .then(function (note) {
      res.send(note);
    });
  });

  app.post('/api/articles/saved/:articleId/note', function (req, res) {
    db.Note.create(req.body).then(function (dbNote) {
      
      db.Article.findOneAndUpdate(
        { _id: req.params.articleId }, 
        { $set: {notes: dbNote._id }}, 
        { new: false }
      ).then(function (doc, err) {
        if (!err) {
          res.sendStatus(200)
        }
      });
    })
  });
};