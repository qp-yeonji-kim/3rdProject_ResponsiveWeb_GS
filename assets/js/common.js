$(document).ready(function () {
    /* 언어 옵션 제어버튼 */
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

    
    /* 검색창 열기 버튼 */
    //1) 버튼 눌러 열고 닫기
    var $searchOpen = $('.header .search button');
    var $searchForm = $('.header .search_wrap form')
    $searchOpen.on('click', function(){
        $searchForm.parent().slideToggle();
    });
    //2) 포커스 빠져나가거나 다른 곳 클릭할 시 닫히기
    $searchForm.find('button').on('blur', function(){
        setTimeout(function(){
            if(!$searchForm.children().is(':focus')) {
                $searchForm.parent().slideUp();
                $searchOpen.focus();}
        }, 10);
    });

    
    /* gnb 네비게이션 Full down 효과 */
    var $dep1ul = $('#pcGnb > ul');
    var $dep2ul = $dep1ul.find('>li >ul');

    //1) depth2 ul 모두 숨기고 시작
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


    /* family site 옵션 열고 닫기 */
    var $familyOpen = $('#familySite .f_btn');
    var $familyLink = $('#familySite > ul > li')
    var $f_siteGo = $('#familySite .fGo_btn');

    //1) 클릭하면 옵션 열고 닫기
    $familyOpen.on('click', function(){
        $(this).toggleClass('on').next('ul').stop().slideToggle();
    });

    //2) 포커스 떠나면 옵션 닫기
    $familyLink.children('a:first, a:last').on('blur', function(){
        setTimeout(function(){
            if(! $familyLink.children('a').is(':focus')) {
                $familyOpen.removeClass('on').next('ul').stop().slideUp();
            };
        }, 10);
    });

    //3) a클릭할 시 텍스트, href변수에 담고 $familyOpen 글자 변경 - 작동 잘 안됨
    var aHref = $(this).attr('href');
    var aTxt = $(this).text();
    $familyLink.children('a').on('click', function(e){
        e.preventDefault();
        $familyOpen().text(aTxt).focus().next('ul').stop().slideToggle();
    });

    //4) GO버튼 누르면 페이지 이동
    $f_siteGo.on('click', function(e){
        e.preventDefault();
        window.open(aHref, 'popup');
    });
});