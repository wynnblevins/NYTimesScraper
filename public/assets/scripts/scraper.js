var scraper = (function ($){
  'use strict';

  let $articlesWrapper = $('#articlesWrapper');

  $('#scrapeButton').click(() => {
    $.get('/api/articles', (data) => {
      $('#articlesWrapper').empty();

      for (var i = 0; i < data.length; i++) {
        attachArticle(data[i]);
      }
    });
  });

  let attachArticle = function (article) {
    let articleHtml = `
      <div class="row article">
        <div class="col-10">
          <h3 class="abstractHdr">${article.title}</h3>
        </div>
        <div class="col-2">
          <button type="button" data-articleText="${article.title}" 
          class="saveArticleBtn btn btn-info"><i class="far fa-save"></i> Save Article</button>
        </div>
      </div>
    `;
    
    $articlesWrapper.append(articleHtml);
  };  
})($);