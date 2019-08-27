/*
 * Instagram jQuery plugin
 * v0.2.1
 * http://potomak.github.com/jquery-instagram/
 * Copyright (c) 2012 Giovanni Cappellotto
 * Licensed MIT
 
 * Modified by Bill Kurtson
 */

(function ($){
  $.fn.instagram = function (options) {
    var that = this,
        apiEndpoint = "https://api.instagram.com/v1",
        settings = {
            hash: null
          , userId: null
          , locationId: null
          , search: null
          , accessToken: null
          , clientId: null
          , show: null
          , onLoad: null
          , onComplete: null
          , maxId: null
          , minId: null
          , next_url: null
          , image_size: null
          , redirect_url: null
          , refresh: null
        };
        
    options && $.extend(settings, options);
    
    function createPhotoElement(photo, redirect_url) {
      var image_url = photo.images.thumbnail.url,
          caption = photo.caption.text;
      
      if (settings.image_size == 'low_resolution') {
        image_url = photo.images.low_resolution.url;
      }
      else if (settings.image_size == 'thumbnail') {
        image_url = photo.images.thumbnail.url;
      }
      else if (settings.image_size == 'standard_resolution') {
        image_url = photo.images.standard_resolution.url;
      }

      if( redirect_url == undefined )
        redirect_url = image_url;

        return $('<div>')
        .addClass('instagram-placeholder')
        .attr('id', photo.id)
        .append(
          $('<a>')
            .attr('href', redirect_url)
            .attr('target', '_blank')
            .append(
              $('<img>')
                .addClass('instagram-image')
                .attr('src', image_url)
            )
            .after($('<p>',{
                text: caption
              })
            )
        );
    }
    
    function createEmptyElement() {
      return $('<div>')
        .addClass('instagram-placeholder')
        .attr('id', 'empty')
        .append($('<p>').html('No photos for this query'));
    }
    
    function composeRequestURL() {

      var url = apiEndpoint,
          params = {};
      
      if (settings.next_url != null) {
        return settings.next_url;
      }

      if (settings.hash != null) {
        url += "/tags/" + settings.hash + "/media/recent";
      }
      else if (settings.search != null) {
        url += "/media/search";
        params.lat = settings.search.lat;
        params.lng = settings.search.lng;
        settings.search.max_timestamp != null && (params.max_timestamp = settings.search.max_timestamp);
        settings.search.min_timestamp != null && (params.min_timestamp = settings.search.min_timestamp);
        settings.search.distance != null && (params.distance = settings.search.distance);
      }
      else if (settings.userId != null) {
        url += "/users/" + settings.userId + "/media/recent";
      }
      else if (settings.locationId != null) {
        url += "/locations/" + settings.locationId + "/media/recent";
      }
      else {
        url += "/media/popular";
      }
      
      settings.accessToken != null && (params.access_token = settings.accessToken);
      settings.clientId != null && (params.client_id = settings.clientId);
      settings.minId != null && (params.min_id = settings.minId);
      settings.maxId != null && (params.max_id = settings.maxId);
      settings.show != null && (params.count = settings.show);

      url += "?" + $.param(params)
      
      return url;
    }
    
    settings.onLoad != null && typeof settings.onLoad == 'function' && settings.onLoad();
    
    function getInstaFeed(){
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: composeRequestURL(),
        success: function (res) {
          var length = typeof res.data != 'undefined' ? res.data.length : 0,
              limit = settings.show != null && settings.show < length ? settings.show : length,
              imageNr = Number( $(that).data("image-nr") );
          
          if (limit > 0) {
            for (var i = 0; i < limit; i++) {
              $this = $(that);
              $append = createPhotoElement(res.data[i], settings.redirect_url);

              if( $this.find(".instagram-placeholder").attr("id") != $append.attr("id") ){
                var relatedElem = $this.filter("#instagram-image-" + i);
                relatedElem.html($append);
              }
            }
          }
          else {
            that.html(createEmptyElement());
          }

          settings.onComplete != null && typeof settings.onComplete == 'function' && settings.onComplete(res.data, res);
        }
      });
    }
    
    getInstaFeed();
    if( settings.refresh != null ) // if no refresh rate is set, just load the latest image and don't refresh
      window.setInterval(getInstaFeed, settings.refresh);
    
    return this;
  };
})(jQuery);