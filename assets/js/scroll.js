var $defaultHeight = $('#question-body').height();
$('#question-body').css("max-height", $defaultHeight);

$(window).scroll(function () {
    var $heightScrolled = $(window).scrollTop();

    if ( $heightScrolled > 30 && $('#question-body').height() == $defaultHeight){
        $('#question-body').css("max-height", "0");
        $('#question-body').parent().css("height", "0");
    }
    else if($($heightScrolled <= 0 && '#question-body').height() == 0) {
        $('#question-body').css("max-height", $defaultHeight);
        $('#question-body').parent().css("height", $defaultHeight);
    }
});

$('#question-body').slimScroll({
    height: $defaultHeight,
    railVisible: true,
    allowPageScroll: true,
});

$('#question-body').parent().css("transition", "height 1s");

/*$('main').slimScroll({
    height: 'calc(100vh - 56px)',
    railVisible: true,
});*/