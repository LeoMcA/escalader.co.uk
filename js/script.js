$(document).ready(function(){

  var theBestFunction = function(){
    if($(window).width() < 980){

      $(window).off('scroll');

      $('.box').css({'display': ''});
      $('.box:first').css({'display': '', 'position': ''});

    } else {
      $('.box').css({'display': 'none'});
      $('.box:first').css({'display': 'block', 'position': 'fixed'});
      var lidMoveHeight = $('.row-box:eq(1)').offset().top - $('.row-box:first').offset().top - 75;
      var lidStopHeight = $('.row-box:eq(2)').offset().top - $('.row-box:first').offset().top - 75;

      $(window).off('scroll');
      $(window).on('scroll', function(){
        if($(window).scrollTop() <= lidMoveHeight) {
          $('.box:first').css({'position': 'fixed', 'top': ''});
          $('.box:first .box-ribbon').css({'display': '', 'opacity': 1 - $(window).scrollTop() / (lidMoveHeight - 20)});
          $('.box:first .box-lid').css({'left': 57});
        } else if($(window).scrollTop() <= lidStopHeight) {
          $('.box:first').css({'position': 'fixed', 'top': ''});
          $('.box:first .box-ribbon').css({'display': 'none'});
          $('.box:first .box-lid').css({'display': '', 'left': 57 + 2 * ($(window).scrollTop() - lidMoveHeight)});
        } else {
          $('.box:first .box-lid').css({'display': 'none'});
          $('.box:first').css({'position': 'relative', 'top': lidStopHeight});
        }
      });
    }
  }

  theBestFunction();
  $(window).resize(theBestFunction);

});
