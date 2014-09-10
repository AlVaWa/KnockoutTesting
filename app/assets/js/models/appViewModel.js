'use strict';

/* global define:true*/
define(['jquery',
    'knockout'
    ], function ($, ko) {
  return function () {
    var self = this;


    // Example observable
    self.status = ko.observable('active');


      $(document).ready(function() {

          $("#about").hide();
          $("#contact").hide();
          $("#homeLink").click(function () {
              console.log("Click!");
              $("#home").show();
              $("#about").hide();
              $("#contact").hide();
          });
          $("#aboutLink").click(function () {
              $("#home").hide();
              $("#about").show();
              $("#contact").hide();
          });
          $("#contactLink").click(function () {
              $("#home").hide();
              $("#about").hide();
              $("#contact").show();
          });
      });



  };
});
