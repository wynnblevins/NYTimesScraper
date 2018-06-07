var scraper = (function ($){
  'use strict';

  let $articlesWrapper = $('#articlesWrapper');

  $('#articlesNavLink').click(function () {
    console.log('Articles nav item was clicked.');
  });

  $('#homeNavLink').click(function () {
    console.log('Articles nav item was clicked.');
  });

  $('#scrapeButton').click(() => {
    $.get('/api/articles', (data) => {
      for (var i = 0; i < data.length; i++) {
        attachArticle(data[i]);
      }
    });
  });

  let attachArticle = function (article) {
    let articleHtml = `
      <div class="row article">
        <div class="col-10">
          <h3 class="abstractHdr">${article.text}</h3>
        </div>
        <div class="col-2">
          <a href="#" class="btn btn-info"><i class="far fa-save"></i>

          Save Article</a>
        </div>
      </div>
    `;
    
    $articlesWrapper.append(articleHtml);
  };  
})($);