$(document).ready(function() {
  $('.sidebar-add').click(function(e) {
    e.preventDefault();

    var selectedIndex = $(this).closest('.upsell-variant').find('select').val();
    if (selectedIndex == '') {
      alert('Please select an option.');
    } else {
      $.post('/cart/add.js', {
        quantity: 1,
        id: selectedIndex
      });
      setTimeout(function() { 
            // window.location.href = window.location.href

            if(window.location.href.indexOf("cart=success") > -1) {
              window.location.href = window.location.href
            } else if(window.location.href.indexOf("?") > -1) {
             window.location.href = window.location.href + "&cart=success";
           } else{
            window.location.href = window.location.href + "?cart=success";
          }

        }, 1000);
    }
  });
});