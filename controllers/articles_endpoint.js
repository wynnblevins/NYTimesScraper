var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
  app.get('/api/articles', function(req, res) {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  
    axios.get(url, {
      params: {
        'api-key': process.env.API_KEY
      }
    }).then(function(response) {
      var $ = cheerio.load(response.data);
      console.log(response.data);
    });
  });
};