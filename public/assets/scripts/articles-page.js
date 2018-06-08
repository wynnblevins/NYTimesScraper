(function ($) {
  'use strict';

  let $articlesWrapper = $('#articlesWrapper');

  function attachArticle(article) {

    let articleHtml = `
      <div class="row article">
        <div class="col-lg-9 col-md-7 col-sm-6">
          <h3 class="abstractHdr">${article.title}</h3>
        </div>
        <div class="col-lg-3 col-md-5 col-sm-6">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" data-articleId="${article._id}" 
              class="addNoteBtn btn btn-success"><i class="far fa-edit"></i> Add Note</button>
            <button type="button" data-articleId="${article._id}" 
              class="removeArticleBtn btn btn-danger"><i class="far fa-trash-alt"></i> Remove</button>
          </div>
        </div>
      </div>
    `;
    
    $articlesWrapper.append(articleHtml);
  };

  function fetchSavedArticles() {
    $.get('/api/articles/saved').then((articlesData) => {
      // remove what exists on page already to prevent duplicates
      $articlesWrapper.empty();
      
      // attach retrieved articles
      for (var i = 0; i < articlesData.length; i++) {
        attachArticle(articlesData[i]);
      }
    });
  }

  function onInit() {
    // load stored articles
    fetchSavedArticles();
  }

  $(document).on('click', '.removeArticleBtn', function () {
    var articleId = $(this).data('articleid');
    
    $.ajax({
      url: `/api/articles/saved/${articleId}`,
      type: 'DELETE', 
      success: function () {
        fetchSavedArticles();
      }
    });
  });

  $(document).on('click', '.saveArticleBtn', function () {
    var articleId = $(this).data('articleId');

  });

  $(document).ready(function () {
    onInit();
  });
})($);