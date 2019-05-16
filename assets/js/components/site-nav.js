$(document).ready(function() {

  var hamburgerEl = $('.js-hamburger');

  hamburgerEl.click(function () {

    $('.js-mobile-navigation').slideToggle("fast", function () {
      if(!hamburgerEl.hasClass('is-active')) {
        $('.js-hamburger').addClass('is-active');
      } else {
        $('.js-hamburger').removeClass('is-active');
      }


    });
  });

});