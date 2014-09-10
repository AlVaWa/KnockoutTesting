'use strict';

require.config({
  paths: {
    'bower_components': '../../bower_components',
    'jquery': '../../bower_components/jquery/dist/jquery',
    'jquery.bootstrap': '../../bower_components/bootstrap-sass/dist/js/bootstrap',
    'sammy': 'sammy'
  },
  shim: {
    'jquery.bootstrap': {
      deps: ['jquery']
    },
    'sammy':{
        deps:['jquery']
    }
  },
  map: {
    '*': {
      'knockout': '../../bower_components/knockout.js/knockout',
      'ko': '../../bower_components/knockout.js/knockout'
    }
  }
});

// Use the debug version of knockout in development only
/* global window:true*/
if (window.knockoutBootstrapDebug) {
  require.config({
    map: {
      '*': {
        'knockout': '../../bower_components/knockout.js/knockout.debug.js',
        'ko': '../../bower_components/knockout.js/knockout.debug.js'
      }
    }
  });
}

if (!window.requireTestMode) {
  require(['mainKnockoutTutorial'], function () { });
}
