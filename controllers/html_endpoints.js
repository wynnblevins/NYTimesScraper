module.exports = function (app) {
  app.get('/articles', (req, res) => {
    res.render('articles', { showNavbarBtn: false });
  });
  
  app.get('*', function (req, res) {
    res.render('index', { showNavbarBtn: true });
  });
};