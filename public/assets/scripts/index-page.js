(function ($) {
  'use strict';
  
  function onInit() {
    console.log('index page front end script is loaded');
  }

  $(document).on('click', '.saveArticleBtn', function () {
    var article = $(this).data(article);
    $.post('/api/articles/saved', {
      title: article.articletext
    }).done(() => {
      console.log('saved article');
    }).fail(() => {
      console.error('something went wrong');
    });
  });

  $(document).ready(function () {
    onInit();
  });
})($);