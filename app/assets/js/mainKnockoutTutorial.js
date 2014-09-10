'use strict';

/* global define:true*/
define(['jquery',
    'knockout',
    '../../assets/js/models/knockoutTutorial.js',
    'jquery.bootstrap'
    ], function ($, koko, AppViewModel) {

  var GUI = new AppViewModel();

  koko.applyBindings(GUI);

});
