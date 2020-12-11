 $(document).ready(function () {
  /* gnb 네비게이션 */
  var $pcGnb = $('#pcGnb > ul');
  var $dep2ul = $pcGnb.find('>li >ul');

  //1) depth2 ul  모두 숨기고 시작
  $dep2ul.hide();

  //2)depth1 ul에 마우스 진입과 나가기
  $pcGnb.hover(
    function () { //mouseente
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
  $pcGnb.children().on('mouseenter focusin', function () {
    $('#pcGnb').addClass('on');
    $dep2ul.stop().slideDown(); //포커스제어 필요
    $(this).addClass('on').siblings().removeClass('on');
  });

  function gnbReturn() {
    //열려진 컨텐츠 초기화, li.on 제거
    $('#pcGnb').removeClass('on');
    $dep2ul.stop().slideUp();
    $pcGnb.find('>li.on').removeClass('on');
  }

  //5)첫번째와 마지막 a 에서 포커스가 떠나기
  $pcGnb.find('a:first, a:last').on('blur', function () {
    setTimeout(function () {
      if (!$pcGnb.find('a').is(':focus')) gnbReturn();
    }, 10);
  });
});