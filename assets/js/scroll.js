var $defaultHeight = $('#question-body').height();

$(window).scroll(function () {
    var $heightScrolled = $(window).scrollTop();

    if ( $heightScrolled > 30 && $('#question-body').height() == $defaultHeight){
        $('#question-body').css("max-height", "0");
    }
    else if($($heightScrolled <= 0 && '#question-body').height() == 0) {
        $('#question-body').css("max-height", $defaultHeight);
    }
});
