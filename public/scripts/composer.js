$(document).ready(function () {
  $(window).scroll(function() {
    let scroll = $(window).scrollTop();
    if(scroll > 80) {
      $('#top-button').css('display', 'flex');
    } else {
      $('#top-button').hide();
    }
  })
});