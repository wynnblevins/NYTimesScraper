(function ($) {
  'use strict';
  
  function onInit() {
    console.log('index page front end script is loaded');
  }

  $(document).on('click', '.saveArticleBtn', function () {
    var $articleButton = $(this);
    //var clickedArticleId = $articleButton.data()
  });

  $(document).ready(function () {
    onInit();
  });
})($);