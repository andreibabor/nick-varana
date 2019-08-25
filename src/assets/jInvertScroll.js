var totalSections = $('#lookbookContainer .section').length - 0.9;
var numSections = $(window).width() * totalSections;
var windowWidth = $(window).width();
console.log(numSections);
console.log(totalSections);
console.log(windowWidth);

$('#fakecontent').height(numSections);




$("#lookbookContainer > section.section").css("width",windowWidth +"px");
$(window).on('scroll', function(e) {
  e.preventDefault();
  var scrollTop = $(window).scrollTop();
  var docHeight = $(document).height();
  var winHeight = $(window).height();
  var scrollPercent = (scrollTop) / (docHeight - winHeight);
  var scrollPercentRounded = scrollPercent*100;
  scrollPercentRounded = scrollPercentRounded*totalSections;
  /*if(windowWidth > 749){
  	$("#lookbookContainer").css({"left": -scrollPercentRounded+"%","top": parseInt(parseInt($(window).scrollTop()) + parseInt($(".page-container").css("padding-top"))) + "px"});
  }else {*/
    $("#lookbookContainer").css("left", -scrollPercentRounded+"%");
  //}

});