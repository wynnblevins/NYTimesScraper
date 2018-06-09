(function ($) {
  'use strict';

  let $articlesWrapper = $('#articlesWrapper');

  function createModal(article) {
    var modalTemplate = `
    <div class="modal fade" id="${article._id}" tabindex="-1" 
    role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-group">
              <label for="text" class="control-label col-xs-4">Text Field</label> 
              <div class="col-xs-8">
                <div class="input-group">
                  <input id="noteField" id="text" name="text" type="text" class="form-control">
                </div>
              </div>
            </div> 
          </div>
          <div class="modal-footer">
            <button type="button" 
              data-dismiss="modal" data-article="${article._id}" 
              id="submitNotesButton" class="btn btn-primary">OK</button>
          </div>
        </div>
      </div>
    </div>
    `
    return modalTemplate;
  }

  let notes = [];

  function attachArticle(article) {
    console.log(article);
    let articleHtml = `    
      <div class="row article">
        <div class="col-lg-9 col-md-7 col-sm-6">
          <h3 class="abstractHdr">${article.title}</h3>
        </div>
        <div class="col-lg-3 col-md-5 col-sm-6">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button class="btn btn-success" id="editNotesButton" 
              data-toggle="modal" data-target="#${article._id}"><i class="far fa-edit"></i> Edit Notes</button>
            <button type="button" data-articleid="${article._id}"
              class="removeArticleBtn btn btn-danger"><i class="far fa-trash-alt"></i> Remove</button>
          </div>
        </div>
      </div>
    `;
    // associating modal with article via data-target
    $articlesWrapper.append(articleHtml);
  };

  function fetchSavedArticles() {
    $.get('/api/articles/saved').then((articlesData) => {
      // remove what exists on page already to prevent duplicates
      $articlesWrapper.empty();
      
      // attach retrieved articles
      for (var i = 0; i < articlesData.length; i++) {
        attachArticle(articlesData[i]);
        var modalMarkup = createModal(articlesData[i]);
        $('body').append(modalMarkup);
      }
    });
  }

  function onInit() {
    // load stored articles
    fetchSavedArticles();
  }

  $(document).on('click', 'button#submitNotesButton', function () {
    var articleId = $(this).data('article');
    var note = $('#noteField').val();
    
    $.post(`/api/articles/saved/${articleId}/note`, {
      body: note,
      articleId: articleId
    }, (data) => {
      console.log(data);
    })
  });

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

  $(document).ready(function () {
    onInit();
  });
})($);