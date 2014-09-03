'use strict';

/* global define:true*/
define(['jquery',
    'knockout'
    ], function ($, ko) {
  return function () {
    var self = this;


    // Example observable
    self.status = ko.observable('active');


  };
});
