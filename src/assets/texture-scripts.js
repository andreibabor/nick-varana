$(document).ready(function() {
  $( "#AccessibleNav" ).hover(
    function() {
      $( ".menu-overlay" ).fadeIn("medium");
    }, function() {
      $( ".menu-overlay" ).fadeOut("medium");
    }
    );
  
  if ( $(".cart__qty").length > 0) {
    $( ".cart__qty .cart__qty").each(function() {
      $(this).find("input").wrap("<div class='qtty-wrap'></div>");
      $(this).find(".qtty-wrap").append( $("<a href='#' class='qtty-less'></a>") );
      $(this).find(".qtty-wrap").append( $("<a href='#' class='qtty-add'></a>") );
    });
    
    $('.qtty-add').click(function(e) {
      e.preventDefault();

      var currentQtty = $(this).parent().find('.cart__qty-input').val();
      currentQtty++;
      $(this).parent().find('.cart__qty-input').val(currentQtty);
      
      var itemId = $(this).closest('.cart__qty').attr('data-item');
      
      $.post('/cart/update.js', 'updates['+itemId+']=' + currentQtty);
      
      setTimeout(function() { 
       if(window.location.href.indexOf("cart=success") > -1) {
         window.location.href = window.location.href
       } else if(window.location.href.indexOf("?") > -1) {
         window.location.href = window.location.href + "&cart=success";
       } else{
        window.location.href = window.location.href + "?cart=success";
      }
    }, 1000);
    });

    $('.qtty-less').click(function(e) {
      e.preventDefault();

      var currentQtty = $(this).parent().find('.cart__qty-input').val();
      currentQtty--;

      if (currentQtty != '0') {
        $(this).parent().find('.cart__qty-input').val(currentQtty);
      }
      
      var itemId = $(this).closest('.cart__qty').attr('data-item');
      
      $.post('/cart/update.js', 'updates['+itemId+']=' + currentQtty);
      
      setTimeout(function() { 
       if(window.location.href.indexOf("cart=success") > -1) {
         window.location.href = window.location.href
       } else if(window.location.href.indexOf("?") > -1) {
         window.location.href = window.location.href + "&cart=success";
       } else{
        window.location.href = window.location.href + "?cart=success";
      }
    }, 1000);
    });
    
    $('.sidebar_cart_container input.btn.btn--small-wide.cart__submit.cart__submit-control').val('Proceed to Checkout');
  }
  
  if ( $("#CustomerLoginForm").length > 0) {
  	$('.main-content').addClass("login-page");
    $("#LoginHeading").html("Customer Login");
  }
  
  if ( $(".maintenance-template").length > 0) {
  	$('body').addClass("maintenance-template-body");
  }
  
  if ( $(".site-header__cart-count").length > 0) {
  	$('.site-header__cart').addClass("cart-has-items");
  }
  
  if ( $(".lookbook-template").length > 0) {
  	$('body').addClass("drawer-page-body");
  }
  
  if ( $("#RegisterForm").length > 0) {
  	$('.main-content').addClass("login-page");
    $(".form-vertical h1").html("Sign Up");
    $("#RegisterForm").prepend( $(".form-vertical h1") );
    $(".form-vertical input[type=submit]").val("Create Account");
  }
  
  $('.single-product-slider').owlCarousel({
    loop: true,
    items: 1,
    nav: true,
    navText: [
    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
  });

//bbb code
  // video product slider PDP page
  var video_slide = $('.owl-item video').length;

  if(video_slide > 0){
    $('.owl-item video').get(0).pause();

    $('.single-product-slider').on('translate.owl.carousel',function(e){
     $('.owl-item video').get(0).pause();
   });

    $('.single-product-slider').on('translated.owl.carousel',function(e){
      $('.owl-item.active video').get(0).play();
    })

  }
  // video product slider PDP page
  // bbb code
  
  var winHeight = $("body").height();
  console.log(winHeight);
  var showHeight = winHeight * 90 / 100;
  console.log(showHeight);
  
  $(window).bind('scroll', function () {
    if (!$(".lookbook2-template").length){ 
    	var headerHeight = $('.site-header').height();
      if ($(window).scrollTop() > headerHeight + 38) {
        $('.site-header').addClass('scrolled');
        $('.mobile-menu').addClass('scrolled');
      } else {
        $('.site-header').removeClass('scrolled');
        $('.mobile-menu').removeClass('scrolled');
      }

      if ($(window).scrollTop() > showHeight) {
        $('.backtop').fadeIn('medium');
      } else {
        $('.backtop').fadeOut('medium');
      }
    }
  });

  var iScrollPos = 0;
  $(window).scroll(function () {
    if (!$(".lookbook2-template").length){
      var iCurScrollPos = $(this).scrollTop();
      if (iCurScrollPos > iScrollPos) {
        $('.site-header').addClass('scrollup');
        $('.site-header').removeClass('visible');
      } else {
        $('.site-header').addClass('visible');
        if (iCurScrollPos < 38) {
          $('.site-header').removeClass('visible');
        }
      }
      iScrollPos = iCurScrollPos;
    }
  });
  
  $(".backtop").click(function () {
    $("html, body").animate({scrollTop: 0}, 600);
  });
  
  $('.tab-heads li a').click(function(e){
    e.preventDefault();
    var t = $(this).attr('href');

    if(!$(this).hasClass('active')){
      $('.tab-heads li a').removeClass('active');           
      $(this).addClass('active');

      $('.service-tab-content').hide();
      $(t).fadeIn('medium');
    }
  });
  
  $('.faq h3').click(function(){
    if(!$(this).hasClass('opened')){
      $(this).addClass('opened');
      $(this).parent().find('.faq-content').slideDown();
    } else {
      $(this).removeClass('opened');
      $(this).parent().find('.faq-content').slideUp();
    }
  });
  
  $('.mobile-slide-wrap').click(function(e) {
    e.preventDefault();

    if ($(this).hasClass('menu-opened')) {
      $('.mobile-menu').fadeOut('medium');
      $(this).removeClass('menu-opened');
      $('body').css('overflow', 'auto');
    } else {
      $('.mobile-menu').fadeIn('medium');
      $(this).addClass('menu-opened');
      $('body').css('overflow', 'hidden');
    }
  });
  
  $('.mobile-menu-nav .border a').click(function(e) {
    e.preventDefault();

    var target = $(this).attr('href');
    $(target).fadeIn('medium');
  });
  
  $('.mobile-menu-nav .minnermenu li.title a').click(function(e) {
    e.preventDefault();

    $(this).closest('.minnermenu').fadeOut('medium');
  });
  
  $('.mobile-main-nav-link').click(function(e) {
    e.preventDefault();

    if (!$(this).hasClass('active')) {
      $('.mobile-main-nav').hide();
      var target = $(this).attr('href');
      $(target).fadeIn('medium');
    }
    
    $('.minnermenu').hide();
  });
  
  $('.smenu > a').click(function(e) {
    e.preventDefault();
    
    if ($(this).hasClass('opened')) {
      $(this).parent().find('ul').slideUp('medium');
      $(this).removeClass('opened');
    } else {
      $(this).parent().find('ul').slideDown('medium');
      $(this).addClass('opened');
    }
  });
  
  $('footer.site-footer p.h4').click(function(e) {
    e.preventDefault();
    
    if ($(this).hasClass('opened')) {
      $(this).parent().find('.site-footer__linklist').slideUp('medium');
      $(this).removeClass('opened');
    } else {
      $(this).parent().find('.site-footer__linklist').slideDown('medium');
      $(this).addClass('opened');
    }
  });
  
  var winWidth = $(window).width();
  if (winWidth < 768) {
    if ( $(".main-slider-content").length > 0) {
      $(".main-slider-content .btn").insertAfter( $(".main-slider-content .medium-up--one-half p") );
    }
  }
  
  if ( $(".blog-grid").length > 0) {
    var winWidth = $(window).width();
    if (winWidth < 768) {
      $(".blog-grid").each(function() {
       $(this).find(".grid-image").insertBefore( $(this).find(".grid-content") );
     });
    }
  }
  
  if ( $(".template-index").length > 0) {
    $(".home-video-frame iframe").wrap("<div class='videoWrapper'></div>");
  }
  
  $(".parent-trigger").hover(function () {
  	$(this).find(".mega-nav").slideDown("medium");
    if ( $(this).find('.mega-nav').length > 0){
      $('.site-header').addClass('dropdown-visible');
    }
  },function () {
  	$(this).find(".mega-nav").hide();
    if ( $(this).find('.mega-nav').length > 0){
      $('.site-header').removeClass('dropdown-visible');
    }
  });
  
  $(".book-menu .menu-col a").hover(function () {
  	$(this).find(".visible").hide();
    $(this).find(".hidden").show();
  },function () {
  	$(this).find(".visible").show();
    $(this).find(".hidden").hide();
  });
  
  $(".parent > a").click(function(e) {
    e.preventDefault();
    
    if ($(this).parent().hasClass("active")) {
      $(".parent").removeClass("active");
      $(".submenu-opened").removeClass("submenu-opened");
      $(this).parent().find(".submenu").hide();
    } else {
      $(".parent").removeClass("active");
      $(".submenu-opened").removeClass("submenu-opened");
      $(".submenu").hide();
      $(this).parent().addClass("active");
      $(this).closest(".menu-col").addClass("submenu-opened");
      $(this).closest(".mega-nav").addClass("submenu-opened");
      $(this).parent().find(".submenu").toggle( "slide" );
    }
  });
  
  /*$(".blog-menu-link").hover(function () {
    var blogid = $(this).attr("data-id");
    $(".blog-menu-box").hide();
    $("#" + blogid).show();
  });*/
  
  var winWidth = $(window).width();
  // if (winWidth > 767) {
  //   var lookbookContainer = new fullpage('#lookbookContainer', {
  //     navigation: true,
  //     navigationPosition: 'right',
  //     autoScrolling:true,
      
  //     menu: '#fp-nav > ul',
  //     loopTop: true,
  //     loopBottom: true
  //   });
  // }
  
  $('.site-header__search-toggle').click(function(e) {
   e.preventDefault();

   if ($('body').hasClass('search-opened')) {
    $('body').removeClass('search-opened');
  } else {
    $('body').addClass('search-opened');
  }
});
  
  if ( $(".product-form-product-template .single-option-selector").length == 0) {
   $('.product-form__variants option:eq(1)').attr('selected', 'selected');
 }
 
 $("#AddToCart-product-template").click(function(e) {
  e.preventDefault();

  if ( $("#SingleOptionSelector-0").length > 0) {
    var psize = $("#SingleOptionSelector-0 :selected").val();
    if (psize == "") {
      alert("Please select the size.");
    } else if ( $("#SingleOptionSelector-1").length > 0) {
      var pfit = $("#SingleOptionSelector-1 :selected").val();
      if (pfit == "") {
        alert("Please select the color.");
      } else {
        $(this).submit();
      }
    } else {
      $(this).submit();
    }
  } else {
    $(this).submit();
  }
});
 
 var mPopup = localStorage.getItem("marketingPopup");

 if (mPopup != null) {
    // If exists
    if (mPopup != 'closed') {
      // Calculate difference
      // Set timeout
      var now = Date.now();
      var diff = now - mPopup;
      if (diff > 60000) {
      	popupTimer(0);
      } else {
        var x = 60000 - diff;
        popupTimer(x);
      }  
    }
  } else {
    // If doesn't exist
    var now = Date.now();
    localStorage.setItem("marketingPopup", now);
    popupTimer(60000);
  }
  
  function popupTimer(seconds) {
   setTimeout(function(){ $('.main-popup').fadeIn(); }, seconds);
 }
 $('.close-popup').click(function(e) {
  e.preventDefault();
  $('.main-popup').fadeOut();
  localStorage.setItem("marketingPopup", 'closed');
});
 $('.js-close-popup').on('click', function(e) {
  if (e.target !== this)
    return;
  $('.main-popup').fadeOut();
  localStorage.setItem("marketingPopup", 'closed');
});
 
 var $formPopop = $('.newsletter-form-popup')
 if ($formPopop.length > 0) {
  $('.newsletter-form-popup input[type="submit"]').bind('click', function (event) {
    if (event) event.preventDefault()
      register($formPopop)
    ga('send', {
      hitType: 'event',
      eventCategory: 'Newsletter',
      eventAction: 'Signup - Discount Popup'
    });
  })
}

function register($form) {
  $form.find('#mc-embedded-subscribe').val('Sending');
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'jsonp',
    contentType: 'application/json; charset=utf-8',
    error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
    success: function (data) {
      $form.find('#mc-embedded-subscribe').val('Submit')
      $form.find('.hide').hide()
      if (data.result === 'success') {
        // Yeahhhh Success
        console.log(data.msg)
        $form.find('#subscribe-result').html('<span>Thank you for subscribing.<br/>We\'ve sent you your discount code.</span>')
        $form.find('#mce-EMAIL').val('')
        setTimeout(function(){ 
        	$('.main-popup').removeClass('active');
          localStorage.setItem("marketingPopup", 'closed');
        }, 2000);
      } else {
        // Something went wrong, do something to notify the user.
        console.log(data.msg)
        $form.find('#subscribe-result').html('<span>' + data.msg.substring(4) + '</span>')
      }
    }
  })
};

if ( $(".lookbook-template").length > 0) {
  $(".prefooter").hide();
  $("#shopify-section-footer").hide();
}

if ( $(".template-index").length > 0) {
  $.get("https://get.geojs.io/v1/ip/country.json", function (response) {
    for(var key in response) {
      if (key == "name") {
        var country = response[key];
        if (country == "United Kingdom") {
          $(".template-index").addClass("showlocation");
        }
      }
    }
  }, "json");
}

$('.lbookanim .lbookright').hover(function () {
  jQuery(this).find('.product-card__image-wrapper').slideDown();
}, function () {
  jQuery(this).find('.product-card__image-wrapper').slideUp();
});
});

$(window).load(function() {
  $(".sidebar_cart_inner input[name=checkout]").val("Checkout");
  
  if(window.location.href.indexOf("#") > -1) {
   var cUrl = $(location).attr('href');
   var target = cUrl.substr(cUrl.indexOf("#") + 1)
   $("." + target).trigger("click");
   
   $('html, body').animate({
    scrollTop: $(".service-content").offset().top-40
  }, 600);
 }
 
 var winWidth = $(window).width();
 if (winWidth >= 767 || $('.upsell_cart_container').length == 0 ) {
 // if($('.upsell_cart_container').length == 0){

  var cOuter = $(".sidebar_cart_container").outerHeight();
  console.log(cOuter);
  var cInner = $(".sidebar_cart_inner").height();

  if (cInner > cOuter) {
    var cOuter = $(".sidebar_cart_container").height();
    
    var extraHeight = 100;
    // var extraHeight = 70;
    
    var cFooter = $(".cart__footer").outerHeight() + extraHeight;
    console.log(cFooter);
    var cDiff = cOuter - cFooter;
    $(".sidebar_cart_items").css("height", cDiff);
    $(".sidebar_cart_items").addClass("scroll");
    
    $(".sidebar_cart_items").append("<div class='sidebar_cart_scroll'>Scroll for more items<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'><path d='M10.817 7.624l-4.375 4.2c-.245.235-.64.235-.884 0l-4.375-4.2c-.244-.234-.244-.614 0-.848.245-.235.64-.235.884 0L5.375 9.95V.6c0-.332.28-.6.625-.6s.625.268.625.6v9.35l3.308-3.174c.122-.117.282-.176.442-.176.16 0 .32.06.442.176.244.234.244.614 0 .848'></path></svg></div>");
  }
// }
}



if ( $(".collection__discover_slider").length > 0) {
 $(".collection__discover_slider .owl-item").each(function() {
  var dataid = $(this).find(".item").attr("data-id");
  var itemlink = $(this).find("a").attr("href");
  
  if (!$(this).hasClass("cloned")) {
    $("#bps" + dataid).find("img").wrap("<a href='" + itemlink + "'></a>");
  }
  
  var winWidth = $(window).width();
  if (winWidth < 768) {
    $(this).find(".grid-view-item__image").wrap("<a href='" + itemlink + "'></a>");
    var imageUrl = $("#bps" + dataid).find("img").attr("src");
    $(this).find(".grid-view-item__image").attr('src',imageUrl);
  }
});
}
});

// custom.js
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
        items:2
      },
      1100:{
        items:4
      },
      1367:{
        items:4
      },
      1680:{
        items:4
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

    // HomePage Custom Products Slideshow 
  $('.custom-products-homepage').owlCarousel({
    margin:30,
    loop:false,
    nav:true,
    slideTransition: 'linear',
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

  var allPanels = $('ul.tabs li .tab__descriptions').hide();

  $('ul.tabs li a').click(function () {
    if (!$(this).next().is(":visible")) {
      $(this).next().slideDown();
      $(this).parent("li").addClass("active");
    }else{
      $(this).next().slideUp();
      $(this).find('span.glyphicon-plus').addClass('glyphicon-active');
      $(this).parent("li").removeClass("active");
    }
// return false;
});

  // $($('ul.tabs li .tab__descriptions')[0]).show();

// $("ul.tabs>li").on("click",function(){
  //  if($(this).parent("li").hasClass("active")){
  //    // $(this).parent("li").removeClass("active");
  //     // $(this).parent("li .tab__descriptions").slideUp("slow");
  //     $(this).closest(".tab__descriptions").slideDown("slow");

  //  }else{
  //    // $("ul.tabs>li").removeClass("active");
  
  //     $(this).closest(".tab__descriptions").slideUp("slow");
  //    // $(this).parent("li .tab__descriptions").addClass("active");
  //  }
  // });

  $(".product-single__description.rte .tabs > li").each(function(){
    $("> a",this).attr("href","javascript:void(0)");
    $(this).append("<div class='tab__descriptions'>"+ $(".tabs-content").find("> li").eq($(this).index()).html() +"</div>");
  });

  $(".product-single__description.rte .tabs > li:first-child").addClass("active");
  $(".product-single__description.rte .tabs > li:first-child .tab__descriptions").show();

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
    var variant_id = $('#ProductSelect-product-template').val();

    dataVariant = {
      "quantity": 1,
      "id": variant_id
    }

    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      // data: $(this).serialize(),
      data: dataVariant,
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

});
//end custom.js