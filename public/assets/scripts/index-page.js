(function ($) {
  'use strict';
  
  function onInit() {
    console.log('index page front end script is loaded');
  }

  $(document).on('click', '.saveArticleBtn', function () {
    var article = $(this).data(article);
    console.log(article);
  });

  $(document).ready(function () {
    onInit();
  });
})($);