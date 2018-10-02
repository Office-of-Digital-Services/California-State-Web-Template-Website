/* -----------------------------------------
   CARDS - /source/js/cagov/cards.js
----------------------------------------- */

$(document).ready(function () {
    // Finds the first panel in the sidebar
    // Adds the "first" class
    $(".main-secondary .card").first().addClass("first");

    // Add a hook to the standout card for adding a triangle
    $(".card.highlight").find(".card-heading").prepend("<span class='triangle'></span>");
});
