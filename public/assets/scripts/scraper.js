var scraper = (function ($){
  'use strict';

  $('#articlesNavLink').click(function () {
    console.log('Articles nav item was clicked.');
  });

  $('#homeNavLink').click(function () {
    console.log('Articles nav item was clicked.');
  });

  $('#scrapeButton').click(function () {
    $.get('/api/articles', function (data) {
      console.log(data);
    });
  });
})($);