jQuery(document).ready(function ($) {
    "use strict";
	//update these values if you change these breakpoints in the style.css file (or _layout.scss if you use SASS)
	var MqM = 768,
		MqL = 1024,
        faqsSections = $('.cd-faq-group'),
		faqTrigger = $('.cd-faq-trigger'),
		faqsContainer = $('.cd-faq-items'),
		faqsCategoriesContainer = $('.cd-faq-categories'),
		faqsCategories = faqsCategoriesContainer.find('a'),
		closeFaqsContainer = $('.cd-close-panel'),
        stop;
	
	//select a faq section 
	faqsCategories.on('click', function (event) {
		event.preventDefault();
		var selectedHref = $(this).attr('href'),
			target = $(selectedHref);
		if ( $(window).width() < MqM) {
			faqsContainer.scrollTop(0).addClass('slide-in').children('ul').removeClass('selected').end().children(selectedHref).addClass('selected');
			closeFaqsContainer.addClass('move-left');
			$('body').addClass('cd-overlay');
		} else {
	        $('body,html').animate({ 'scrollTop': target.offset().top - 19}, 200);
		}
	});

	//close faq lateral panel - mobile only
	$('body').bind('click touchstart', function (event) {
		if ($(event.target).is('body.cd-overlay') || $(event.target).is('.cd-close-panel')) {
			closePanel();
		}
	});
	faqsContainer.on('swiperight', function (event) {
		closePanel();
	});

	//show faq content clicking on faqTrigger
	faqTrigger.on('click', function (event) {
		event.preventDefault();
		$(this).next('.cd-faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');
	});

	if ( $(window).width() > MqL ) {
		//update category sidebar while scrolling
		$(window).on('scroll', function () {
			(!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory);
		});
	}

	$(window).on('resize', function () {
		if ($(window).width() <= MqL) {
			faqsCategoriesContainer.removeClass('is-fixed');
		} else {
			updateCategory();
			$(window).on('scroll', function () {
				(!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory);
			});
		}

		if (faqsCategoriesContainer.hasClass('is-fixed')) {
			faqsCategoriesContainer.css({
				'left': faqsContainer.offset().left
			});
		}
	});

	function closePanel() {
		event.preventDefault();
		faqsContainer.removeClass('slide-in').find('li').show();
		closeFaqsContainer.removeClass('move-left');
		$('body').removeClass('cd-overlay');
	}

	function updateCategory() {
		updateCategoryPosition();
		updateSelectedCategory();
	}
    
    function updateCategoryPosition() {
		var top = $('.cd-faq').offset().top,
            bottom = $('#bloc-4').offset().top,
			margin = 20;
		if (top - margin > $(window).scrollTop()) {
			faqsCategoriesContainer.removeClass('is-fixed').css({
				'left': 0,
				'top': 0
			});
		} else {
			var leftValue = faqsCategoriesContainer.offset().left,
				widthValue = faqsCategoriesContainer.width();
			faqsCategoriesContainer.addClass('is-fixed').css({
				'left': leftValue,
				'top': margin
			});
		}
    }
                       

	function updateSelectedCategory() {
		faqsSections.each(function () {
			var actual = $(this),
				margin = parseInt($('.cd-faq-title').eq(1).css('marginTop').replace('px', '')),
				activeCategory = $('.cd-faq-categories a[href="#' + actual.attr('id') + '"]'),
				topSection = (activeCategory.parent('li').is(':first-child')) ? 0 : Math.round(actual.offset().top);
			
			if ((topSection - 20 <= $(window).scrollTop()) && (Math.round(actual.offset().top) + actual.height() + margin - 20 > $(window).scrollTop())) {
				activeCategory.addClass('selected');
			} else {
				activeCategory.removeClass('selected');
			}
		});
	}
    
// Adding Class on Scroll to the Navigation
$(window).on("scroll", function () {
    stop = Math.round($(window).scrollTop());
    stop > 0 ? $(".site-navigation").addClass("scrollNav") : $(".site-navigation").removeClass("scrollNav");
});
    
// browser window scroll (in pixels) after which the "back to top" link is shown
var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.cd-top');

//hide or show the "back to top" link
$(window).scroll(function(){
    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible');
});

//smooth scroll to top
$back_to_top.on('click', function(event){
    event.preventDefault();
    $('body,html').animate({
        scrollTop: 0 ,
        }, scroll_top_duration
    );
});
}); // End jQuery Call
