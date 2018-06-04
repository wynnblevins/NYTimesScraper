module.exports = function (app) {
  app.get('/articles', (req, res) => {
    res.render('articles', {});
  });
  
  app.get('*', function (req, res) {
    res.render('index', {});
  });
};