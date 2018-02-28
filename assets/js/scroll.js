var $defaultHeight = $('#question-body').height();
$('#question-body').css("max-height", $defaultHeight);

$(window).scroll(function () {
    var $heightScrolled = $(window).scrollTop();

    if ( $heightScrolled > 0)
    {
        $('#question-body').css("max-height", "0");
    }
    else {
        $('#question-body').css("max-height", $defaultHeight);
    }
});