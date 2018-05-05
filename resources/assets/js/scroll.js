$(window).scroll(function () {
    var $heightScrolled = $(window).scrollTop();

    if ($heightScrolled > 30) {
        $('body > header.sticky-top').addClass("sticky-shadow");
    }
    else if ($heightScrolled <= 0) {
        $('body > header.sticky-top').removeClass("sticky-shadow");
    }
});