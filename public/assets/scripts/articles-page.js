(function ($) {
  'use strict';

  let $articlesWrapper = $('#articlesWrapper');

  function createModal(article) {
    let modalTemplate = `
    <div class="modal fade" id="modal${article._id}" tabindex="-1" 
    role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="form-group">
              <label for="text" class="control-label col-xs-4">Text Field</label> 
              <div class="col-xs-8">
                <div class="input-group">
                  <input id="text" name="text" type="text" class="form-control noteField">
                </div>
              </div>
            </div> 
          </div>
          <div class="modal-footer">
            <button type="button" 
              data-article="${article._id}" 
              id="submitNotesButton" class="btn btn-primary">OK</button>
          </div>
        </div>
      </div>
    </div>
    `
    return modalTemplate;
  }

  function attachArticle(article) {
    console.log(article);
    let articleHtml = `    
      <div class="row article">
        <div class="col-lg-9 col-md-7 col-sm-6">
          <h3 class="abstractHdr">${article.title}</h3>
        </div>
        <div class="col-lg-3 col-md-5 col-sm-6">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button class="btn btn-success editNotesButton" data-articleid="${article._id}">
              <i class="far fa-edit"></i> Edit Notes
            </button>
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
      for (let i = 0; i < articlesData.length; i++) {
        attachArticle(articlesData[i]);
        let modalMarkup = createModal(articlesData[i]);
        $('body').append(modalMarkup);
      }
    });
  }

  function onInit() {
    // load stored articles
    fetchSavedArticles();
  }

  $(document).on('click', 'button.editNotesButton', function () {
    var articleId = $(this).data('articleid');
    let noteId = $(this).data('noteid');

    $.get(`/api/articles/saved/${articleId}/note`)
      .then(function (articleData) {
        $(`#modal${articleId}`).modal('toggle');
        
        // first time an article's notes are retrieved, notes is 
        // nonexistant, this if statement keeps unknown property related  
        // errors out of console and keep things nice for other devs :-)
        if (articleData.notes && articleData.notes.body) {
          $(`#modal${articleId} input.form-control.noteField`).val(articleData.notes.body);
        }
      });
  });

  $(document).on('click', 'button#submitNotesButton', function () {
    var articleId = $(this).data('article');
    var note = $('div.modal.fade.show input.form-control.noteField').val();
    
    $.post(`/api/articles/saved/${articleId}/note`, {
      body: note,
      articleId: articleId
    }, (data) => {
      $(`#modal${articleId}`).modal('toggle');
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