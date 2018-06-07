(function ($) {
  'use strict';
  
  function onInit() {
    console.log('index page front end script is loaded');
  }

  $(document).on('click', '.saveArticleBtn', function () {
    var articleId = $(this).data('articleid');
    console.log(articleId);
  });

  $(document).ready(function () {
    onInit();
  });
})($);