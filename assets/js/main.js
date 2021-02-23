$(document).ready(function () {
	// 메인 슬라이드 설정
	var mainSlider = new Swiper('#coreValue .swiper-container', {
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
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
			1240: {
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

	//introduce hover, focus시 아이콘 움직이기
	$('#introduce .wrap-list a').on('mouseenter focus', function(){
		if ($(window).width() > 1024)	$(this).siblings('.intro-icon').addClass('active');
	});

	$('#introduce .wrap-list a').on('mouseleave blur', function(){
		if ($(window).width() > 1024) $('#introduce .intro-icon').removeClass('active');
	});

	//subsidairy li접근 시 클래스명 붙이기
	$('.fields > li').on({
		'mouseenter focusin': function () {
			if ($(window).width() > 1024) $(this).addClass('active');
		},
		'mouseleave focusout': function () {
			if ($(window).width() > 1024) $(this).removeClass('active');
		}
	});

	//느린 스크롤로 배경 이동
	$(window).on('scroll', function () {
		var windowSize = $(window).width();
		var scrollY = $(this).scrollTop();
		var start;
		var littleMov;

		if (windowSize > 1400) {
			start = $('#news').offset().top;
			littleMov = (start - scrollY) * -0.08;
		}  else if (windowSize > 1024) {
			start = $('#news').offset().top;
			littleMov = (start - scrollY) * -0.01;
		} else if (windowSize > 400) {
			start = $('#news').offset().top;
			littleMov = (start - scrollY) * -0.04;
		} else{
			start = $('#news').offset().top;
			littleMov = (start - scrollY) * -0.01;
		}

		$('.recruit_bg').css('background-position', '50%' + littleMov + 'px');
	});
});