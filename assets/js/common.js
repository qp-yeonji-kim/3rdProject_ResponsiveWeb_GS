$(document).ready(function () {
	/* 검색창 열기 버튼 */
	//1) 버튼 눌러 열고 닫기
	var $searchOpen = $('.header .search button');
	var $searchForm = $('.header .search_wrap form')
	$searchOpen.on('click', function () {
		$searchForm.parent().slideToggle();
	});
	//2) 포커스 빠져나가거나 다른 곳 클릭할 시 닫히기
	$searchForm.find('button').on('blur', function () {
		setTimeout(function () {
			if (!$searchForm.children().is(':focus')) {
				$searchForm.parent().slideUp();
				$searchOpen.focus();
			}
		}, 10);
	});

	/* PC메뉴 full down */
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

	$dep1ul.find('a:first, a:last').on('blur', function () {
		setTimeout(function () {
			if (!$dep1ul.find('a').is(':focus')) gnbReturn();
		}, 10);
	});

	/* Tablet 메뉴 열기 */
	$('#mHeader .menuBtn button').on('click', function () {
		$(this).toggleClass('active');
		
		if (!$('#mGnb').hasClass('active')) {
			$('#mGnb').addClass('active');
			$('#mGnb').stop().slideDown();

		} else {
			$('#mGnb').removeClass('active');
			$('#mGnb').stop().slideUp(function () {
				$('#mGnb').find('li.active').removeClass('active').children('ul').slideUp();
			});
		} 

		$('#mGnb > ul > li > a').on('click', function (e) {
			e.preventDefault();
			$(this).parent().siblings().removeClass('active').find('ul').stop().slideUp();
			$(this).parent().toggleClass('active').find('ul').stop().slideToggle();
		});
	});

	/* family site 옵션 열고 닫기 */
	var $familyOpen = $('#familySite .f_btn');
	var $familyLink = $('#familySite > ul > li')
	var $f_siteGo = $('#familySite .fGo_btn');

	//1) 클릭하면 옵션 열고 닫기
	$familyOpen.on('click', function () {
		$(this).toggleClass('on').next('ul').stop().slideToggle();

		// 옵션에서 마우스가 나가면 자동 닫힘
		$('#familySite').on('mouseleave', function () {
			$familyOpen.next('ul').stop().slideUp();
		});
	});

	//2) 포커스 떠나면 옵션 닫기
	$familyLink.children('a:first, a:last').on('blur', function () {
		setTimeout(function () {
			if (!$familyLink.children('a').is(':focus')) {
				$familyOpen.removeClass('on').next('ul').stop().slideUp();
			};
		}, 10);
	});

	//3) a클릭할 시 텍스트, href변수에 담고 $familyOpen 글자 변경
	var aHref = $familyLink.first().children('a').attr('href');
	var aTxt = $familyLink.first().children('a').text();

	$familyLink.children('a').on('click', function (e) {
		e.preventDefault();
		aHref = $(this).attr('href');
		aTxt = $(this).text();
		console.log(aHref, aTxt);
		$familyOpen.text(aTxt).focus().next('ul').stop().slideToggle();
	});

	//4) GO버튼 누르면 페이지 이동
	$f_siteGo.on('click', function (e) {
		e.preventDefault();
		window.open(aHref, 'popup');
	});
});