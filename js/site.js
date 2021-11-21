if (typeof PG === 'undefined') PG = {};
if (typeof PG.app === 'undefined') PG.app = {};

(function(exports, window) {
  var video = document.getElementById('video');

  var muteBtn = document.querySelector('.volume-mute');

  exports.toggleMute = function() {
    video.muted = !video.muted;
    muteBtn.classList.toggle('volume-mute--on');
    muteBtn.classList.toggle('volume-mute--off');
    muteBtn.classList.toggle('animate-flicker');
  };

  function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.navigation a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top - 20 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.navigation a').removeClass("active");
        currLink.addClass("active");
      }
      else if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $('.navigation a').removeClass("active");
        $('.js-contact').addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  $(document).ready(function() {

    $(window).scroll(function(){
      console.log('scrolled');

      if ($(window).scrollTop() >= 10) {
        $('.header').addClass('fixed-header');
        $('.header-mobile').addClass('fixed-header-mobile');
      }
      else {
        $('.header').removeClass('fixed-header');
        $('.header-mobile').removeClass('fixed-header-mobile');
      }
    });

    $('.js-logo').on('click', function() {
      $('html, body').animate({scrollTop: '0px'}, 500);
    });

    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");


      var target = this.hash,
        menu = target;
      $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top+10
      }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
          $('.navigation a').removeClass("active");
          $('.js-contact').addClass("active");
        }
      });
    });



  });

})(
  PG.app,
  window
);
