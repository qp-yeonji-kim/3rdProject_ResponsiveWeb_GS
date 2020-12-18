$(document).ready(function () {
    // 메인 슬라이드 설정
    var mainSlider = new Swiper('#coreValue .swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        autoplay: {
            delay: 5000,
        },
        a11y: {
            prevSlideMessage: '이전 슬라이드 보기',
            nextSlideMessage: '다음 슬라이드 보기',
            firstSlideMessage: '첫 번째 슬라이드',
            lastSlideMessage: '마지막 슬라이드',
        },
    });

    $('#coreValue .controller .play').hide();
    $('#coreValue .controller .stop').on('click', function () {
        $(this).hide().siblings('.autoplay').show();
        mainSlider.autoplay.stop();
    });
    $('.controller .play').on('click', function () {
        $(this).hide().siblings('.autoplay').show();
        mainSlider.autoplay.start();
    });


    // 뉴스 슬라이드 설정
    var newsSlider = new Swiper('#news .swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        autoplay: {
            delay: 5000,
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        breakpoints: {
            1201: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            }
        },
        a11y: {
            prevSlideMessage: '이전 슬라이드 보기',
            nextSlideMessage: '다음 슬라이드 보기',
            firstSlideMessage: '첫번째 슬라이드',
            lastSlideMessage: '마지막 슬라이드',
        },
    });

    $('#news .controller .play').hide();
    $('#news .controller .stop').on('click', function () {
        $(this).hide().siblings('.autoplay').show();
        newsSlider.autoplay.stop();
    });
    $('#news .controller .play').on('click', function () {
        $(this).hide().siblings('.autoplay').show();
        newsSlider.autoplay.start();
    });

    //subsidairy li접근 시 클래스명 붙이기
    $('.fields > li').on({
        'mouseenter focusin': function () {
            if ($(window).width() >= 1200) $(this).addClass('active');
        },
        'mouseleave focusout': function () {
            if ($(window).width() >= 1200) $(this).removeClass('active');
        }
    });

    /* tabpanel */
    //접근성 제어
    $('.tab:first-of-type, .tabpanel:first-of-type').addClass('on').attr('tabindex', 0);
    $('.tab:first-of-type').attr('aria-selected', true).siblings().attr('aria-selected', false);
    $('.tabpanel:first-of-type').attr('aria-hidden', false).siblings('.tabpanel').attr('aria-hidden', true);

    //키보드 제어
    $('.tab').on('keydown', function (e) {
        var key = e.keyCode;
        switch (key) {
            case 40:
            case 39:
                e.preventDefault();
                $(this).attr('tabIndex', -1);
                if ($(this).hasClass('last')) {
                    $(this).siblings('.first').attr('tabIndex', 0).focus();
                } else {
                    $(this).next().attr('tabIndex', 0).focus();
                }
                break;

            case 37:
            case 38:
                e.preventDefault();
                $(this).attr('tabIndex', -1);
                if ($(this).hasClass('first')) {
                    $(this).siblings('.last').attr('tabIndex', 0).focus();
                } else {
                    $(this).prev().attr('tabIndex', 0).focus();
                }
                break;
            case 36:
                e.preventDefault();
                $(this).siblings('.first').attr('tabIndex', 0).focus();
                break;
            case 35:
                e.preventDefault();
                $(this).siblings('.last').attr('tabIdnex', 0).focus();
                break;
            case 13:
            case 32:
                var $pullLi = $(this);
                tabOn($pullLi);
        }
    });

    //마우스제어
    $('.tab').on('click', function () {
        var $pullLi = $(this);
        tabOn($pullLi);
    });

    function tabOn($pullBtn) {
        $pullBtn.addClass('on').attr({
            tabIndex: 0,
            'aria-selected': true
        }).siblings().removeClass('on').attr({
            tabIndex: -1,
            'aria-selected': false
        });
        var pullPanel = $pullBtn.attr('aria-controls');
        $('#' + pullPanel).addClass('on').attr({
            tabIndex: 0,
            'aria-hidden': false
        }).siblings('.tabpanel').removeClass('on').attr({
            tabIndex: -1,
            'aria-hidden': true
        });
    }

    //느린 스크롤로 배경 이동
    $(window).on('scroll', function () {
        var scrollY = $(this).scrollTop();
        var windowSize = $(window).width();
        var start;
        var littleMov;

        if (windowSize > 1400) {
            start = $('#grow').offset().top;
            littleMov = (scrollY - start) * -0.2;
        } else if (windowSize > 1200) {
            start = $('.article_promote').offset().top;
            littleMov = (scrollY - start) * -0.05;
        } else {
            start = $('.article_promote').offset().top;
            littleMov = (scrollY - start) * -0.08;
        }

        $('.recruit_bg').css('background-position', '50%' + littleMov + 'px');
    });
});