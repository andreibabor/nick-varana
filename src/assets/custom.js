var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
	sURLVariables = sPageURL.split('&'),
	sParameterName,
	i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
};
$(document).ready(function() {

  	//alert($(window).width() + ' x ' + $(window).height());

	// Products Carousel 
	$('.products-slider').owlCarousel({
		margin:30,
		loop:true,
		nav:true,
		navText: [
		'<i class="fa fa-angle-left" aria-hidden="true"></i>',
		'<i class="fa fa-angle-right" aria-hidden="true"></i>'
		],
		dots: true,
		responsive:{
			0:{
				items:2
			},
			767:{
				items:3
			},
			1100:{
				items:4
			},
			1367:{
				items:5
			},
			1680:{
				items:6
			}
		}
	});

	$('.collection-list-slider').owlCarousel({
		margin:30,
		loop:true,
		nav:true,
		slideTransition: 'linear',
		navText: [
		'<i class="fa fa-angle-left" aria-hidden="true"></i>',
		'<i class="fa fa-angle-right" aria-hidden="true"></i>'
		],
		dots: false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:3
			}
		}
	});


	var winWidth = $(window).width();
    //begin upsell minicart mobile slider
    if (winWidth <= 767) {
    	$('.mobile-slider').owlCarousel({
    		margin:0,
    		items:2,
    		loop:false,
    		nav:true,
    		slideTransition: 'linear',
    		navText: [
    		'<i class="fa fa-angle-left" aria-hidden="true"></i>',
    		'<i class="fa fa-angle-right" aria-hidden="true"></i>'
    		],
    		dots: false
    	});
    } 
    //end upsell minicart mobile slider

	// Tabs
	$('.post-slider').owlCarousel({
		margin:30,
		loop:true,
		nav:true,
		navText: [
		'<i class="fa fa-angle-left" aria-hidden="true"></i>',
		'<i class="fa fa-angle-right" aria-hidden="true"></i>'
		],
		dots: true,
		responsive:{
			0:{
				items:1
			},
			1000:{
				items:2
			}
		}
	});
	var cps_owl = $('.collection__product_slider').owlCarousel({
		loop:true,
		nav:true,
		navText: [
		'<i class="fa fa-angle-left" aria-hidden="true"></i>',
		'<i class="fa fa-angle-right" aria-hidden="true"></i>'
		],
		dots: true,
		responsive:{
			0:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});

	cps_owl.on('changed.owl.carousel', function(e) {
		var currentIndex = e.page.index+1;
		$(".collection_discover__image").removeClass("active");
		$("#bps"+ currentIndex).addClass("active");
	});


	$(".site-nav .mega-menu > ul > li:not(title) > a").click(function(){
		if($(this).parent("li").hasClass("active")){
			$(this).parent("li").removeClass("active");
			$(".site-nav .mega-menu  > ul").removeClass("active");
		}else{
			$(".site-nav .mega-menu  > ul > li").removeClass("active");
			$(".site-nav .mega-menu  > ul").removeClass("active");
			$(this).parent("li").addClass("active");
			if($(this).parent("li").hasClass("parent")){
				$(this).parent("li").parent("ul").addClass("active");
			}
		}
		
	});



	$("ul.tabs>li>a").on("click",function(){
		if($(this).parent("li").hasClass("active")){
			$(this).parent("li").removeClass("active");
		}else{
			$("ul.tabs>li").removeClass("active");
			$(this).parent("li").addClass("active");
		}
	});

	$(".product-single__description.rte .tabs > li").each(function(){
		$("> a",this).attr("href","javascript:void(0)");
		$(this).append("<div class='tab__descriptions'>"+ $(".tabs-content").find("> li").eq($(this).index()).html() +"</div>");
	});

	$(".product-single__description.rte .tabs > li:first-child").addClass("active");

	/*$("body.template-product ul.media__nav>li:not(.active)").on("click",function(){
		
		$(".enlarge_pane_contain ").removeClass("active");
		$("body.template-product ul.media__nav>li.active").removeClass("active");
		
		$("#"+$(this).attr("data-id")).addClass("active");
		$(this).addClass("active");
	});*/

	$("a.site-header__icon.site-header__cart").attr("href","javascript:void(0)");
	$("a.site-header__icon.site-header__cart").on("click",function(){
		if ($(".sidebar_cart_container").hasClass("active")) {
			$(".sidebar_cart_container").removeClass("active");
			$("body").css("overflow", "auto");
		} else {
			$(".sidebar_cart_container").addClass("active");

			$(".sidebar_cart_items").addClass("focus");

			setTimeout(function() { 
				$(".sidebar_cart_items").removeClass("focus");
			}, 4000);

			$("body").css("overflow", "hidden");
		}      

	});
	$("body").on("click","#cart_close,.sidebar_cart_container.active .overlay, .cart__submit-continue a",function(){
		$(".sidebar_cart_container").removeClass("active");
		$("body").css("overflow", "auto");
	});

	if ( $(".grid--blog").length > 0) {
		$('.grid.grid--uniform.grid--blog').infiniteScroll({
			path: '.pagination__next__link',
			append: 'li.grid__item',
			history: false,
			hideNav: '.blog_pagination',
			status: '.page-load-status'
		});
	}

	$(".product-form.product-form-product-template").submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: '/cart/add.js',
			data: $(this).serialize(),
			dataType: 'json',
			success: function(res) {
				if(window.location.href.indexOf("cart=success") > -1) {
					window.location.href = window.location.href
				} else if(window.location.href.indexOf("?") > -1) {
					window.location.href = window.location.href + "&cart=success";
				} else{
					window.location.href = window.location.href + "?cart=success";
				}
			}
		}); 
	});

	$("body").on("click",".cart__remove",function(e) {
		e.preventDefault();
		var itemID = $(this).attr("data-item");
		$.post('/cart/update.js', 'updates['+itemID+']=0')
		.always(function() {
			if(window.location.href.indexOf("cart=success") > -1) {
				window.location.href = window.location.href
			} else if(window.location.href.indexOf("?") > -1) {
				window.location.href = window.location.href + "&cart=success";
			} else{
				window.location.href = window.location.href + "?cart=success";
			}
		});

	});
	$(".slideshow__text-wrap").on("click",function(){
		window.location.href = $(this).attr("data-link");
	});

	$(".related-blogs-slider .owl-nav").hide();

 // $(".sectionFooter").append('<div class="prefooter">'+$(".prefooter").html() +'</div>' + $("div#shopify-section-footer").html())


 if(getUrlParameter('cart')=='success'){
 	$("a.site-header__icon.site-header__cart").trigger("click");	
 }

 $("ul.bs-vert-nav li:not(.active)").on("click",function(){
 	$(".bs-vert-content li").removeClass("active");
 	$("ul.bs-vert-nav li").removeClass("active");
 	$(this).addClass("active");
 	$(".bs-vert-content li#"+$(this).attr("data-id")).addClass("active");
 });
 $(".bs-tab-nav li:not(.active)").on("click",function(){
 	var parentItem = $(this).parent("ul").parent("div").parent("div");
 	$(".bs-tab-cotent,.bs-tab-nav li",parentItem).removeClass("active");
 	$(this).addClass("active");
 	$(".bs-tab-cotent#tb-content-"+$(this).attr("data-id"),parentItem).addClass("active");
 });


});

$('.tabgroup > div').hide();
$('.tabgroup > div:first-of-type').show();
$('.slider-blog-section .tabs a').click(function(e){
	e.preventDefault();
	var $this = $(this),
	tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
	others = $this.closest('li').siblings().children('a'),
	target = $this.attr('href');
	others.removeClass('active');
	$this.addClass('active');
	$(tabgroup).children('div').hide();
	$(target).show();

})