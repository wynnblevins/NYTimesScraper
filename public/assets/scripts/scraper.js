var scraper = (function ($){
  'use strict';

  let $articlesWrapper = $('#articlesWrapper');

  $('#articlesNavLink').click(function () {
    console.log('Articles nav item was clicked.');
  });

  $('#homeNavLink').click(function () {
    console.log('Articles nav item was clicked.');
  });

  $('#scrapeButton').click(function () {
    // Built by LucyBot. www.lucybot.com
    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "e8d7b2a2149143378f5d20b5f78bf0ee",
    });
    
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      for (let i = 0; i < result.response.docs.length; i++) {
        let currDoc = result.response.docs[i];
        attachArticle(currDoc);    
      }

      $('#articlesAddedModal').modal('show');      
    }).fail(function(err) {
      throw err;
    });
  });

  let attachArticle = function (article) {
    let articleHtml = `
      <div class="row article">
        <div class="col-10">
          <h3 class="abstractHdr">${article.headline.main}</h3>
        </div>
        <div class="col-2">
          <button class="saveArticleBtn btn btn-info">Save Article</button>
        </div>
      </div>
    `;
    
    $articlesWrapper.append(articleHtml);
  };  
})($);