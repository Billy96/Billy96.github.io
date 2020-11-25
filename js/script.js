(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

(function ($) {
  // Search
  var $searchWrap = $('#search-form-wrap'),
      isSearchAnim = false,
      searchAnimDuration = 200;

  var startSearchAnim = function startSearchAnim() {
    isSearchAnim = true;
  };

  var stopSearchAnim = function stopSearchAnim(callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function () {
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function () {
      $('.search-form-input').focus();
    });
  });
  $('.search-form-input').on('blur', function () {
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  }); // Share

  $('body').on('click', function () {
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function (e) {
    e.stopPropagation();
    var $this = $(this),
        url = $this.attr('data-url'),
        encodedUrl = encodeURIComponent(url),
        id = 'article-share-box-' + $this.attr('data-id'),
        offset = $this.offset();

    if ($('#' + id).length) {
      var box = $('#' + id);

      if (box.hasClass('on')) {
        box.removeClass('on');
        return;
      }
    } else {
      var html = ['<div id="' + id + '" class="article-share-box">', '<input class="article-share-input" value="' + url + '">', '<div class="article-share-links">', '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>', '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>', '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>', '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>', '</div>', '</div>'].join('');
      var box = $(html);
      $('body').append(box);
    }

    $('.article-share-box.on').hide();
    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function (e) {
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function () {
    $(this).select();
  }).on('click', '.article-share-box-link', function (e) {
    e.preventDefault();
    e.stopPropagation();
    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  }); // Caption

  $('.article-entry').each(function (i) {
    $(this).find('img').each(function () {
      if ($(this).parent().hasClass('fancybox')) return;
      var alt = this.alt;
      if (alt) $(this).after('<span class="caption">' + alt + '</span>');
      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });
    $(this).find('.fancybox').each(function () {
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox) {
    $('.fancybox').fancybox();
  } // Mobile nav


  var $container = $('#container'),
      isMobileNavAnim = false,
      mobileNavAnimDuration = 200;

  var startMobileNavAnim = function startMobileNavAnim() {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function stopMobileNavAnim() {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  $('#main-nav-toggle').on('click', function () {
    if (isMobileNavAnim) return;
    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });
  $('#wrap').on('click', function () {
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;
    $container.removeClass('mobile-nav-on');
  });
})(jQuery);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvbGFuZHNjYXBlL3NvdXJjZS9qcy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLENBQUMsVUFBUyxDQUFULEVBQVc7QUFDVjtBQUNBLE1BQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxtQkFBRCxDQUFuQjtBQUFBLE1BQ0UsWUFBWSxHQUFHLEtBRGpCO0FBQUEsTUFFRSxrQkFBa0IsR0FBRyxHQUZ2Qjs7QUFJQSxNQUFJLGVBQWUsR0FBRyxTQUFsQixlQUFrQixHQUFVO0FBQzlCLElBQUEsWUFBWSxHQUFHLElBQWY7QUFDRCxHQUZEOztBQUlBLE1BQUksY0FBYyxHQUFHLFNBQWpCLGNBQWlCLENBQVMsUUFBVCxFQUFrQjtBQUNyQyxJQUFBLFVBQVUsQ0FBQyxZQUFVO0FBQ25CLE1BQUEsWUFBWSxHQUFHLEtBQWY7QUFDQSxNQUFBLFFBQVEsSUFBSSxRQUFRLEVBQXBCO0FBQ0QsS0FIUyxFQUdQLGtCQUhPLENBQVY7QUFJRCxHQUxEOztBQU9BLEVBQUEsQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUIsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVTtBQUN6QyxRQUFJLFlBQUosRUFBa0I7QUFFbEIsSUFBQSxlQUFlO0FBQ2YsSUFBQSxXQUFXLENBQUMsUUFBWixDQUFxQixJQUFyQjtBQUNBLElBQUEsY0FBYyxDQUFDLFlBQVU7QUFDdkIsTUFBQSxDQUFDLENBQUMsb0JBQUQsQ0FBRCxDQUF3QixLQUF4QjtBQUNELEtBRmEsQ0FBZDtBQUdELEdBUkQ7QUFVQSxFQUFBLENBQUMsQ0FBQyxvQkFBRCxDQUFELENBQXdCLEVBQXhCLENBQTJCLE1BQTNCLEVBQW1DLFlBQVU7QUFDM0MsSUFBQSxlQUFlO0FBQ2YsSUFBQSxXQUFXLENBQUMsV0FBWixDQUF3QixJQUF4QjtBQUNBLElBQUEsY0FBYztBQUNmLEdBSkQsRUEzQlUsQ0FpQ1Y7O0FBQ0Es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Q2xCLElBQUEsVUFBVSxDQUFDLFdBQVgsQ0FBdUIsZUFBdkI7QUFDQSxJQUFBLGlCQUFpQjtBQUNsQixHQU5EO0FBUUEsRUFBQSxDQUFDLENBQUMsT0FBRCxDQUFELENBQVcsRUFBWCxDQUFjLE9BQWQsRUFBdUIsWUFBVTtBQUMvQixRQUFJLGVBQWUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFYLENBQW9CLGVBQXBCLENBQXhCLEVBQThEO0FBRTlELElBQUEsVUFBVSxDQUFDLFdBQVgsQ0FBdUIsZUFBdkI7QUFDRCxHQUpEO0FBS0QsQ0F4SUQsRUF3SUcsTUF4SUgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIoZnVuY3Rpb24oJCl7XG4gIC8vIFNlYXJjaFxuICB2YXIgJHNlYXJjaFdyYXAgPSAkKCcjc2VhcmNoLWZvcm0td3JhcCcpLFxuICAgIGlzU2VhcmNoQW5pbSA9IGZhbHNlLFxuICAgIHNlYXJjaEFuaW1EdXJhdGlvbiA9IDIwMDtcblxuICB2YXIgc3RhcnRTZWFyY2hBbmltID0gZnVuY3Rpb24oKXtcbiAgICBpc1NlYXJjaEFuaW0gPSB0cnVlO1xuICB9O1xuXG4gIHZhciBzdG9wU2VhcmNoQW5pbSA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBpc1NlYXJjaEFuaW0gPSBmYWxzZTtcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfSwgc2VhcmNoQW5pbUR1cmF0aW9uKTtcbiAgfTtcblxuICAkKCcjbmF2LXNlYXJjaC1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGlmIChpc1NlYXJjaEFuaW0pIHJldHVybjtcblxuICAgIHN0YXJ0U2VhcmNoQW5pbSgpO1xuICAgICRzZWFyY2hXcmFwLmFkZENsYXNzKCdvbicpO1xuICAgIHN0b3BTZWFyY2hBbmltKGZ1bmN0aW9uKCl7XG4gICAgICAkKCcuc2VhcmNoLWZvcm0taW5wdXQnKS5mb2N1cygpO1xuICAgIH0pO1xuICB9KTtcblxuICAkKCcuc2VhcmNoLWZvcm0taW5wdXQnKS5vbignYmx1cicsIGZ1bmN0aW9uKCl7XG4gICAgc3RhcnRTZWFyY2hBbmltKCk7XG4gICAgJHNlYXJjaFdyYXAucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgc3RvcFNlYXJjaEFuaW0oKTtcbiAgfSk7XG5cbiAgLy8gU2hhcmVcbiAgJCgnYm9keScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgJCgnLmFydGljbGUtc2hhcmUtYm94Lm9uJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gIH0pLm9uKCdjbGljaycsICcuYXJ0aWNsZS1zaGFyZS1saW5rJywgZnVuY3Rpb24oZSl7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICB1cmwgPSAkdGhpcy5hdHRyKCdkYXRhLXVybCcpLFxuICAgICAgZW5jb2RlZFVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpLFxuICAgICAgaWQgPSAnYXJ0aWNsZS1zaGFyZS1ib3gtJyArICR0aGlzLmF0dHIoJ2RhdGEtaWQnKSxcbiAgICAgIG9mZnNldCA9ICR0aGlzLm9mZnNldCgpO1xuXG4gICAgaWYgKCQoJyMnICsgaWQpLmxlbmd0aCl7XG4gICAgICB2YXIgYm94ID0gJCgnIycgKyBpZCk7XG5cbiAgICAgIGlmIChib3guaGFzQ2xhc3MoJ29uJykpe1xuICAgICAgICBib3gucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGh0bWwgPSBbXG4gICAgICAgICc8ZGl2IGlkPVwiJyArIGlkICsgJ1wiIGNsYXNzPVwiYXJ0aWNsZS1zaGFyZS1ib3hcIj4nLFxuICAgICAgICAgICc8aW5wdXQgY2xhc3M9XCJhcnRpY2xlLXNoYXJlLWlucHV0XCIgdmFsdWU9XCInICsgdXJsICsgJ1wiPicsXG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJhcnRpY2xlLXNoYXJlLWxpbmtzXCI+JyxcbiAgICAgICAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPScgKyBlbmNvZGVkVXJsICsgJ1wiIGNsYXNzPVwiYXJ0aWNsZS1zaGFyZS10d2l0dGVyXCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJUd2l0dGVyXCI+PC9hPicsXG4gICAgICAgICAgICAnPGEgaHJlZj1cImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIucGhwP3U9JyArIGVuY29kZWRVcmwgKyAnXCIgY2xhc3M9XCJhcnRpY2xlLXNoYXJlLWZhY2Vib29rXCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJGYWNlYm9va1wiPjwvYT4nLFxuICAgICAgICAgICAgJzxhIGhyZWY9XCJodHRwOi8vcGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2J1dHRvbi8/dXJsPScgKyBlbmNvZGVkVXJsICsgJ1wiIGNsYXNzPVwiYXJ0aWNsZS1zaGFyZS1waW50ZXJlc3RcIiB0YXJnZXQ9XCJfYmxhbmtcIiB0aXRsZT1cIlBpbnRlcmVzdFwiPjwvYT4nLFxuICAgICAgICAgICAgJzxhIGhyZWY9XCJodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JyArIGVuY29kZWRVcmwgKyAnXCIgY2xhc3M9XCJhcnRpY2xlLXNoYXJlLWdvb2dsZVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwiR29vZ2xlK1wiPjwvYT4nLFxuICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAnPC9kaXY+J1xuICAgICAgXS5qb2luKCcnKTtcblxuICAgICAgdmFyIGJveCA9ICQoaHRtbCk7XG5cbiAgICAgICQoJ2JvZHknKS5hcHBlbmQoYm94KTtcbiAgICB9XG5cbiAgICAkKCcuYXJ0aWNsZS1zaGFyZS1ib3gub24nKS5oaWRlKCk7XG5cbiAgICBib3guY3NzKHtcbiAgICAgIHRvcDogb2Zmc2V0LnRvcCArIDI1LFxuICAgICAgbGVmdDogb2Zmc2V0LmxlZnRcbiAgICB9KS5hZGRDbGFzcygnb24nKTtcbiAgfSkub24oJ2NsaWNrJywgJy5hcnRpY2xlLXNoYXJlLWJveCcsIGZ1bmN0aW9uKGUpe1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pLm9uKCdjbGljaycsICcuYXJ0aWNsZS1zaGFyZS1ib3gtaW5wdXQnLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykuc2VsZWN0KCk7XG4gIH0pLm9uKCdjbGljaycsICcuYXJ0aWNsZS1zaGFyZS1ib3gtbGluaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCAnYXJ0aWNsZS1zaGFyZS1ib3gtd2luZG93LScgKyBEYXRlLm5vdygpLCAnd2lkdGg9NTAwLGhlaWdodD00NTAnKTtcbiAgfSk7XG5cbiAgLy8gQ2FwdGlvblxuICAkKCcuYXJ0aWNsZS1lbnRyeScpLmVhY2goZnVuY3Rpb24oaSl7XG4gICAgJCh0aGlzKS5maW5kKCdpbWcnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICBpZiAoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnZmFuY3lib3gnKSkgcmV0dXJuO1xuXG4gICAgICB2YXIgYWx0ID0gdGhpcy5hbHQ7XG5cbiAgICAgIGlmIChhbHQpICQodGhpcykuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2FwdGlvblwiPicgKyBhbHQgKyAnPC9zcGFuPicpO1xuXG4gICAgICAkKHRoaXMpLndyYXAoJzxhIGhyZWY9XCInICsgdGhpcy5zcmMgKyAnXCIgdGl0bGU9XCInICsgYWx0ICsgJ1wiIGNsYXNzPVwiZmFuY3lib3hcIj48L2E+Jyk7XG4gICAgfSk7XG5cbiAgICAkKHRoaXMpLmZpbmQoJy5mYW5jeWJveCcpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykuYXR0cigncmVsJywgJ2FydGljbGUnICsgaSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGlmICgkLmZhbmN5Ym94KXtcbiAgICAkKCcuZmFuY3lib3gnKS5mYW5jeWJveCgpO1xuICB9XG5cbiAgLy8gTW9iaWxlIG5hdlxuICB2YXIgJGNvbnRhaW5lciA9ICQoJyNjb250YWluZXInKSxcbiAgICBpc01vYmlsZU5hdkFuaW0gPSBmYWxzZSxcbiAgICBtb2JpbGVOYXZBbmltRHVyYXRpb24gPSAyMDA7XG5cbiAgdmFyIHN0YXJ0TW9iaWxlTmF2QW5pbSA9IGZ1bmN0aW9uKCl7XG4gICAgaXNNb2JpbGVOYXZBbmltID0gdHJ1ZTtcbiAgfTtcblxuICB2YXIgc3RvcE1vYmlsZU5hdkFuaW0gPSBmdW5jdGlvbigpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIGlzTW9iaWxlTmF2QW5pbSA9IGZhbHNlO1xuICAgIH0sIG1vYmlsZU5hdkFuaW1EdXJhdGlvbik7XG4gIH1cblxuICAkKCcjbWFpbi1uYXYtdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBpZiAoaXNNb2JpbGVOYXZBbmltKSByZXR1cm47XG5cbiAgICBzdGFydE1vYmlsZU5hdkFuaW0oKTtcbiAgICAkY29udGFpbmVyLnRvZ2dsZUNsYXNzKCdtb2JpbGUtbmF2LW9uJyk7XG4gICAgc3RvcE1vYmlsZU5hdkFuaW0oKTtcbiAgfSk7XG5cbiAgJCgnI3dyYXAnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGlmIChpc01vYmlsZU5hdkFuaW0gfHwgISRjb250YWluZXIuaGFzQ2xhc3MoJ21vYmlsZS1uYXYtb24nKSkgcmV0dXJuO1xuXG4gICAgJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnbW9iaWxlLW5hdi1vbicpO1xuICB9KTtcbn0pKGpRdWVyeSk7Il19
