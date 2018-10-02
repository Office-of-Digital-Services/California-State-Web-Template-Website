/* -----------------------------------------
   INIT THIRD PARTY PLUGINS - /source/js/cagov/plugins.js
----------------------------------------- */

//requirejs.config({
//    //By default load any module IDs from js/lib
//    baseUrl: '/js/libs'
//});

$(document).ready(function () {
    // Tabs to accordion
    // https://github.com/openam/bootstrap-responsive-tabs
    fakewaffle.responsiveTabs(['xs', 'sm']);

    // https://github.com/jsliang/eqHeight.coffee
    // Generic EQ Heights for top level children
    // Example: Use on .group to effect columns
    $(".eqHeight").eqHeight();
});
