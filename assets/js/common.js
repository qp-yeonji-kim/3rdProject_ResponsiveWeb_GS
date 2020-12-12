$(document).ready(function () {
    /* lang_menu 숨기고 보이기 */
    //1) 클릭 시 옵션 열고 닫기, 다른 곳으로 이동하면 옵션 숨기기
    var $langBtn = $('.header .lang');
    $langBtn.on('click', function(){
        $(this).toggleClass('on');
        $langBtn.on('mouseleave', function(){
            $(this).removeClass('on');
        });
    });
    //2) 첫 번째, 마지막 a태그에서 포커스가 ul밖으로 나갔으면 옵션 숨기기
    $langBtn.find('a:first, a:last').on('blur', function(){
        setTimeout(function(){
            if(!$('.lang a').is(':focus')) $langBtn.removeClass('on');
        }, 10);
    });


    /* 검색창 열고 닫기 */
    var $searchBtn = $('.header .search button');
    $searchBtn.on('click', function(){
        $(this).next().slideToggle();
    });
    
    /* gnb 네비게이션 Full down 효과 */
    var $dep1ul = $('#pcGnb > ul');
    var $dep2ul = $dep1ul.find('>li >ul');

    //1) depth2 ul  모두 숨기고 시작
    $dep2ul.hide();

    //2)depth1 ul에 마우스 진입과 나가기
    $dep1ul.hover(
        function () { //mouseenter
            // $('#pcGnb').addClass('on');
            $dep2ul.stop().slideDown();
        },
        function () { //mouseleave
            $dep2ul.stop().slideUp(function () {
                gnbReturn();
                // $('#pcGnb').removeClass('on');
            }); //초기화면 활성화 필요
        }
    );

    //3)depth1 li에 마우스, 포커스 진입
    $dep1ul.children().on('mouseenter focusin', function () {
        $('#pcGnb').addClass('on');
        $dep2ul.stop().slideDown(); //포커스제어 필요
        $(this).addClass('on').siblings().removeClass('on');
    });

    //열린 컨텐츠 초기화, li.on 제거
    function gnbReturn() {
        $('#pcGnb').removeClass('on');
        $dep2ul.stop().slideUp();
        $dep1ul.find('>li.on').removeClass('on');
    }

    //5)첫번째, 마지막 a에서 포커스 떠나기
    $dep1ul.find('a:first, a:last').on('blur', function () {
        setTimeout(function () {
            if (!$dep1ul.find('a').is(':focus')) gnbReturn();
        }, 10);
    });
});