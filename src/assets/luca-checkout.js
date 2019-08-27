jQuery(document).ready(function() {
  jQuery('.checkout-menu a').click(function(e) {
     e.preventDefault();

     var target = jQuery(this).attr("href");
     jQuery(target).fadeIn("medium");
  });
  
  jQuery('.cpopup-close').click(function(e) {
     e.preventDefault();

     jQuery(".checkout-popup").fadeOut("medium");
  });

  jQuery('[data-alternative-payments]').css({"text-align":"center", "margin-bottom": "14px"});
	var img = jQuery('<img id="cards">'); 
	img.attr('src', 'https://cdn.shopify.com/s/files/1/0597/8805/files/payments.png?10538');
	img.insertAfter('.alternative-payment-separator');
});