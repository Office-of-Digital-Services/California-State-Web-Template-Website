/* -----------------------------------------
   PANELS - /source/js/cagov/panel.js
----------------------------------------- */

$(document).ready(function(){ 
    // Finds the first panel in the sidebar
    // Adds the "first" class
    $(".main-secondary .panel").first().addClass("first");
       
    // Add a hook to the standout panel for adding a triangle
    $(".panel.highlight").find(".panel-heading").prepend( "<span class='triangle'></span>" );
});
