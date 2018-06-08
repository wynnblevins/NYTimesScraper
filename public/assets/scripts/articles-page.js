(function ($) {
  'use strict';

  let $articlesWrapper = $('#articlesWrapper');

  function attachArticle(article) {

    let articleHtml = `
      <div class="row article">
        <div class="col-10">
          <h3 class="abstractHdr">${article.title}</h3>
        </div>
        <div class="col-2">
          <button type="button" data-articleText="${article.title}" class="saveArticleBtn btn btn-info"><i class="far fa-save"></i> Save Article</button>
        </div>
      </div>
    `;
    
    $articlesWrapper.append(articleHtml);
  };

  function fetchSavedArticles() {
    $.get('/api/articles/saved').then((articlesData) => {
      for (var i = 0; i < articlesData.length; i++) {
        attachArticle(articlesData[i]);
      }
    });
  }

  function onInit() {
    // load stored articles
    fetchSavedArticles();
  }

  $(document).ready(function () {
    onInit();
  });
})($);