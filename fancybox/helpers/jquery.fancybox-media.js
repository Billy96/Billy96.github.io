(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*!
 * Media helper for fancyBox
 * version: 1.0.6 (Fri, 14 Jun 2013)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: true
 *         }
 *     });
 *
 * Set custom URL parameters:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: {
 *                 youtube : {
 *                     params : {
 *                         autoplay : 0
 *                     }
 *                 }
 *             }
 *         }
 *     });
 *
 * Or:
 *     $(".fancybox").fancybox({,
 *         helpers : {
 *             media: true
 *         },
 *         youtube : {
 *             autoplay: 0
 *         }
 *     });
 *
 *  Supports:
 *
 *      Youtube
 *          http://www.youtube.com/watch?v=opj24KnzrWo
 *          http://www.youtube.com/embed/opj24KnzrWo
 *          http://youtu.be/opj24KnzrWo
 *			http://www.youtube-nocookie.com/embed/opj24KnzrWo
 *      Vimeo
 *          http://vimeo.com/40648169
 *          http://vimeo.com/channels/staffpicks/38843628
 *          http://vimeo.com/groups/surrealism/videos/36516384
 *          http://player.vimeo.com/video/45074303
 *      Metacafe
 *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
 *          http://www.metacafe.com/watch/7635964/
 *      Dailymotion
 *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
 *      Twitvid
 *          http://twitvid.com/QY7MD
 *      Twitpic
 *          http://twitpic.com/7p93st
 *      Instagram
 *          http://instagr.am/p/IejkuUGxQn/
 *          http://instagram.com/p/IejkuUGxQn/
 *      Google maps
 *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
 *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
 *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
 */
;

(function ($) {
  "use strict"; //Shortcut for fancyBox object

  var F = $.fancybox,
      format = function format(url, rez, params) {
    params = params || '';

    if ($.type(params) === "object") {
      params = $.param(params, true);
    }

    $.each(rez, function (key, value) {
      url = url.replace('$' + key, value || '');
    });

    if (params.length) {
      url += (url.indexOf('?') > 0 ? '&' : '?') + params;
    }

    return url;
  }; //Add helper object


  F.helpers.media = {
    defaults: {
      youtube: {
        matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
        params: {
          autoplay: 1,
          autohide: 1,
          fs: 1,
          rel: 0,
          hd: 1,
          wmode: 'opaque',
          enablejsapi: 1
        },
        type: 'iframe',
        url: '//www.youtube.com/embed/$3'
      },
      vimeo: {
        matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
        params: {
          autoplay: 1,
          hd: 1,
          show_title: 1,
          show_byline: 1,
          show_portrait: 0,
          fullscreen: 1
        },
        type: 'iframe',
        url: '//player.vimeo.com/video/$1'
      },
      metacafe: {
        matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
        params: {
          autoPlay: 'yes'
        },
        type: 'swf',
        url: function url(rez, params, obj) {
          obj.swf.flashVars = 'playerVars=' + $.param(params, true);
          return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
        }
      },
      dailymotion: {
        matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
        params: {
          additionalInfos: 0,
          autoStart: 1
        },
        type: 'swf',
        url: '//www.dailymotion.com/swf/video/$1'
      },
      twitvid: {
        matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
        params: {
          autoplay: 0
        },
        type: 'iframe',
        url: '//www.twitvid.com/embed.php?guid=$1'
      },
      twitpic: {
        matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
        type: 'image',
        url: '//twitpic.com/show/full/$1/'
      },
      instagram: {
        matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
        type: 'image',
        url: '//$1/p/$2/media/?size=l'
      },
      google_maps: {
        matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
        type: 'iframe',
        url: function url(rez) {
          return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
        }
      }
    },
    beforeLoad: function beforeLoad(opts, obj) {
      var url = obj.href || '',
          type = false,
          what,
          item,
          rez,
          params;

      for (what in opts) {
        if (opts.hasOwnProperty(what)) {
          item = opts[what];
          rez = url.match(item.matcher);

          if (rez) {
            type = item.type;
            params = $.extend(true, {}, item.params, obj[what] || ($.isPlainObject(opts[what]) ? opts[what].params : null));
            url = $.type(item.url) === "function" ? item.url.call(this, rez, params, obj) : format(item.url, rez, params);
            break;
          }
        }
      }

      if (type) {
        obj.href = url;
        obj.type = type;
        obj.autoHeight = false;
      }
    }
  };
})(jQuery);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvbGFuZHNjYXBlL3NvdXJjZS9mYW5jeWJveC9oZWxwZXJzL2pxdWVyeS5mYW5jeWJveC1tZWRpYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBRSxXQUFVLENBQVYsRUFBYTtBQUNkLGVBRGMsQ0FHZDs7QUFDQSxNQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBVjtBQUFBLE1BQ0MsTUFBTSxHQUFHLFNBQVQsTUFBUyxDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQW9CLE1BQXBCLEVBQTZCO0FBQ3JDLElBQUEsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFuQjs7QUFFQSxRQUFLLENBQUMsQ0FBQyxJQUFGLENBQVEsTUFBUixNQUFxQixRQUExQixFQUFxQztBQUNwQyxNQUFBLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBRixDQUFRLE1BQVIsRUFBZ0IsSUFBaEIsQ0FBVDtBQUNBOztBQUVELElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxHQUFQLEVBQVksVUFBUyxHQUFULEVBQWMsS0FBZCxFQUFxQjtBQUNoQyxNQUFBLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBSixDQUFhLE1BQU0s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Q0FBaEMsQ0FBVDtBQUVBLFlBQUEsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFGLENBQVEsSUFBSSxDQUFDLEdBQWIsTUFBdUIsVUFBdkIsR0FBb0MsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFULENBQWUsSUFBZixFQUFxQixHQUFyQixFQUEwQixNQUExQixFQUFrQyxHQUFsQyxDQUFwQyxHQUE4RSxNQUFNLENBQUUsSUFBSSxDQUFDLEdBQVAsRUFBWSxHQUFaLEVBQWlCLE1BQWpCLENBQTFGO0FBRUE7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQsVUFBSSxJQUFKLEVBQVU7QUFDVCxRQUFBLEdBQUcsQ0FBQyxJQUFKLEdBQVcsR0FBWDtBQUNBLFFBQUEsR0FBRyxDQUFDLElBQUosR0FBVyxJQUFYO0FBRUEsUUFBQSxHQUFHLENBQUMsVUFBSixHQUFpQixLQUFqQjtBQUNBO0FBQ0Q7QUEzR2dCLEdBQWxCO0FBOEdBLENBdElDLEVBc0lBLE1BdElBLENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiFcbiAqIE1lZGlhIGhlbHBlciBmb3IgZmFuY3lCb3hcbiAqIHZlcnNpb246IDEuMC42IChGcmksIDE0IEp1biAyMDEzKVxuICogQHJlcXVpcmVzIGZhbmN5Qm94IHYyLjAgb3IgbGF0ZXJcbiAqXG4gKiBVc2FnZTpcbiAqICAgICAkKFwiLmZhbmN5Ym94XCIpLmZhbmN5Ym94KHtcbiAqICAgICAgICAgaGVscGVycyA6IHtcbiAqICAgICAgICAgICAgIG1lZGlhOiB0cnVlXG4gKiAgICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKiBTZXQgY3VzdG9tIFVSTCBwYXJhbWV0ZXJzOlxuICogICAgICQoXCIuZmFuY3lib3hcIikuZmFuY3lib3goe1xuICogICAgICAgICBoZWxwZXJzIDoge1xuICogICAgICAgICAgICAgbWVkaWE6IHtcbiAqICAgICAgICAgICAgICAgICB5b3V0dWJlIDoge1xuICogICAgICAgICAgICAgICAgICAgICBwYXJhbXMgOiB7XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheSA6IDBcbiAqICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgICAgIH1cbiAqICAgICAgICAgICAgIH1cbiAqICAgICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqIE9yOlxuICogICAgICQoXCIuZmFuY3lib3hcIikuZmFuY3lib3goeyxcbiAqICAgICAgICAgaGVscGVycyA6IHtcbiAqICAgICAgICAgICAgIG1lZGlhOiB0cnVlXG4gKiAgICAgICAgIH0sXG4gKiAgICAgICAgIHlvdXR1YmUgOiB7XG4gKiAgICAgICAgICAgICBhdXRvcGxheTogMFxuICogICAgICAgICB9XG4gKiAgICAgfSk7XG4gKlxuICogIFN1cHBvcnRzOlxuICpcbiAqICAgICAgWW91dHViZVxuICogICAgICAgICAgaHR0cDovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PW9wajI0S256cldvXG4gKiAgICAgICAgICBodHRwOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL29wajI0S256cldvXG4gKiAgICAgICAgICBodHRwOi8veW91dHUuYmUvb3BqMjRLbnpyV29cbiAqXHRcdFx0aHR0cDovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC9vcGoyNEtuenJXb1xuICogICAgICBWaW1lb1xuICogICAgICAgICAgaHR0cDovL3ZpbWVvLmNvbS80MDY0ODE2OVxuICogICAgICAgICAgaHR0cDovL3ZpbWVvLmNvbS9jaGFubmVscy9zdGFmZnBpY2tzLzM4ODQzNjI4XG4gKiAgICAgICAgICBodHRwOi8vdmltZW8uY29tL2dyb3Vwcy9zdXJyZWFsaXNtL3ZpZGVvcy8zNjUxNjM4NFxuICogICAgICAgICAgaHR0cDovL3BsYXllci52aW1lby5jb20vdmlkZW8vNDUwNzQzMDNcbiAqICAgICAgTWV0YWNhZmVcbiAqICAgICAgICAgIGh0dHA6Ly93d3cubWV0YWNhZmUuY29tL3dhdGNoLzc2MzU5NjQvZHJfc2V1c3NfdGhlX2xvcmF4X21vdmllX3RyYWlsZXIvXG4gKiAgICAgICAgICBodHRwOi8vd3d3Lm1ldGFjYWZlLmNvbS93YXRjaC83NjM1OTY0L1xuICogICAgICBEYWlseW1vdGlvblxuICogICAgICAgICAgaHR0cDovL3d3dy5kYWlseW1vdGlvbi5jb20vdmlkZW8veG95dHFoX2RyLXNldXNzLXRoZS1sb3JheC1wcmVtaWVyZV9wZW9wbGVcbiAqICAgICAgVHdpdHZpZFxuICogICAgICAgICAgaHR0cDovL3R3aXR2aWQuY29tL1FZN01EXG4gKiAgICAgIFR3aXRwaWNcbiAqICAgICAgICAgIGh0dHA6Ly90d2l0cGljLmNvbS83cDkzc3RcbiAqICAgICAgSW5zdGFncmFtXG4gKiAgICAgICAgICBodHRwOi8vaW5zdGFnci5hbS9wL0llamt1VUd4UW4vXG4gKiAgICAgICAgICBodHRwOi8vaW5zdGFncmFtLmNvbS9wL0llamt1VUd4UW4vXG4gKiAgICAgIEdvb2dsZSBtYXBzXG4gKiAgICAgICAgICBodHRwOi8vbWFwcy5nb29nbGUuY29tL21hcHM/cT1FaWZmZWwrVG93ZXIsK0F2ZW51ZStHdXN0YXZlK0VpZmZlbCwrUGFyaXMsK0ZyYW5jZSZ0PWgmej0xN1xuICogICAgICAgICAgaHR0cDovL21hcHMuZ29vZ2xlLmNvbS8/bGw9NDguODU3OTk1LDIuMjk0Mjk3JnNwbj0wLjAwNzY2NiwwLjAyMTEzNiZ0PW0mej0xNlxuICogICAgICAgICAgaHR0cDovL21hcHMuZ29vZ2xlLmNvbS8/bGw9NDguODU5NDYzLDIuMjkyNjI2JnNwbj0wLjAwMDk2NSwwLjAwMjY0MiZ0PW0mej0xOSZsYXllcj1jJmNibGw9NDguODU5NTI0LDIuMjkyNTMyJnBhbm9pZD1ZSjBscTI4T095M1ZUMklxSXVWWTBnJmNicD0xMiwxNTEuNTgsLDAsLTE1LjU2XG4gKi9cbjsoZnVuY3Rpb24gKCQpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0Ly9TaG9ydGN1dCBmb3IgZmFuY3lCb3ggb2JqZWN0XG5cdHZhciBGID0gJC5mYW5jeWJveCxcblx0XHRmb3JtYXQgPSBmdW5jdGlvbiggdXJsLCByZXosIHBhcmFtcyApIHtcblx0XHRcdHBhcmFtcyA9IHBhcmFtcyB8fCAnJztcblxuXHRcdFx0aWYgKCAkLnR5cGUoIHBhcmFtcyApID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0XHRwYXJhbXMgPSAkLnBhcmFtKHBhcmFtcywgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdCQuZWFjaChyZXosIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0dXJsID0gdXJsLnJlcGxhY2UoICckJyArIGtleSwgdmFsdWUgfHwgJycgKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAocGFyYW1zLmxlbmd0aCkge1xuXHRcdFx0XHR1cmwgKz0gKCB1cmwuaW5kZXhPZignPycpID4gMCA/ICcmJyA6ICc/JyApICsgcGFyYW1zO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdXJsO1xuXHRcdH07XG5cblx0Ly9BZGQgaGVscGVyIG9iamVjdFxuXHRGLmhlbHBlcnMubWVkaWEgPSB7XG5cdFx0ZGVmYXVsdHMgOiB7XG5cdFx0XHR5b3V0dWJlIDoge1xuXHRcdFx0XHRtYXRjaGVyIDogLyh5b3V0dWJlXFwuY29tfHlvdXR1XFwuYmV8eW91dHViZS1ub2Nvb2tpZVxcLmNvbSlcXC8od2F0Y2hcXD92PXx2XFwvfHVcXC98ZW1iZWRcXC8/KT8odmlkZW9zZXJpZXNcXD9saXN0PSguKil8W1xcdy1dezExfXxcXD9saXN0VHlwZT0oLiopJmxpc3Q9KC4qKSkuKi9pLFxuXHRcdFx0XHRwYXJhbXMgIDoge1xuXHRcdFx0XHRcdGF1dG9wbGF5ICAgIDogMSxcblx0XHRcdFx0XHRhdXRvaGlkZSAgICA6IDEsXG5cdFx0XHRcdFx0ZnMgICAgICAgICAgOiAxLFxuXHRcdFx0XHRcdHJlbCAgICAgICAgIDogMCxcblx0XHRcdFx0XHRoZCAgICAgICAgICA6IDEsXG5cdFx0XHRcdFx0d21vZGUgICAgICAgOiAnb3BhcXVlJyxcblx0XHRcdFx0XHRlbmFibGVqc2FwaSA6IDFcblx0XHRcdFx0fSxcblx0XHRcdFx0dHlwZSA6ICdpZnJhbWUnLFxuXHRcdFx0XHR1cmwgIDogJy8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyQzJ1xuXHRcdFx0fSxcblx0XHRcdHZpbWVvIDoge1xuXHRcdFx0XHRtYXRjaGVyIDogLyg/OnZpbWVvKD86cHJvKT8uY29tKVxcLyg/OlteXFxkXSspPyhcXGQrKSg/Oi4qKS8sXG5cdFx0XHRcdHBhcmFtcyAgOiB7XG5cdFx0XHRcdFx0YXV0b3BsYXkgICAgICA6IDEsXG5cdFx0XHRcdFx0aGQgICAgICAgICAgICA6IDEsXG5cdFx0XHRcdFx0c2hvd190aXRsZSAgICA6IDEsXG5cdFx0XHRcdFx0c2hvd19ieWxpbmUgICA6IDEsXG5cdFx0XHRcdFx0c2hvd19wb3J0cmFpdCA6IDAsXG5cdFx0XHRcdFx0ZnVsbHNjcmVlbiAgICA6IDFcblx0XHRcdFx0fSxcblx0XHRcdFx0dHlwZSA6ICdpZnJhbWUnLFxuXHRcdFx0XHR1cmwgIDogJy8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8kMSdcblx0XHRcdH0sXG5cdFx0XHRtZXRhY2FmZSA6IHtcblx0XHRcdFx0bWF0Y2hlciA6IC9tZXRhY2FmZS5jb21cXC8oPzp3YXRjaHxmcGxheWVyKVxcLyhbXFx3XFwtXXsxLDEwfSkvLFxuXHRcdFx0XHRwYXJhbXMgIDoge1xuXHRcdFx0XHRcdGF1dG9QbGF5IDogJ3llcydcblx0XHRcdFx0fSxcblx0XHRcdFx0dHlwZSA6ICdzd2YnLFxuXHRcdFx0XHR1cmwgIDogZnVuY3Rpb24oIHJleiwgcGFyYW1zLCBvYmogKSB7XG5cdFx0XHRcdFx0b2JqLnN3Zi5mbGFzaFZhcnMgPSAncGxheWVyVmFycz0nICsgJC5wYXJhbSggcGFyYW1zLCB0cnVlICk7XG5cblx0XHRcdFx0XHRyZXR1cm4gJy8vd3d3Lm1ldGFjYWZlLmNvbS9mcGxheWVyLycgKyByZXpbMV0gKyAnLy5zd2YnO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZGFpbHltb3Rpb24gOiB7XG5cdFx0XHRcdG1hdGNoZXIgOiAvZGFpbHltb3Rpb24uY29tXFwvdmlkZW9cXC8oLiopXFwvPyguKikvLFxuXHRcdFx0XHRwYXJhbXMgIDoge1xuXHRcdFx0XHRcdGFkZGl0aW9uYWxJbmZvcyA6IDAsXG5cdFx0XHRcdFx0YXV0b1N0YXJ0IDogMVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0eXBlIDogJ3N3ZicsXG5cdFx0XHRcdHVybCAgOiAnLy93d3cuZGFpbHltb3Rpb24uY29tL3N3Zi92aWRlby8kMSdcblx0XHRcdH0sXG5cdFx0XHR0d2l0dmlkIDoge1xuXHRcdFx0XHRtYXRjaGVyIDogL3R3aXR2aWRcXC5jb21cXC8oW2EtekEtWjAtOV9cXC1cXD9cXD1dKykvaSxcblx0XHRcdFx0cGFyYW1zICA6IHtcblx0XHRcdFx0XHRhdXRvcGxheSA6IDBcblx0XHRcdFx0fSxcblx0XHRcdFx0dHlwZSA6ICdpZnJhbWUnLFxuXHRcdFx0XHR1cmwgIDogJy8vd3d3LnR3aXR2aWQuY29tL2VtYmVkLnBocD9ndWlkPSQxJ1xuXHRcdFx0fSxcblx0XHRcdHR3aXRwaWMgOiB7XG5cdFx0XHRcdG1hdGNoZXIgOiAvdHdpdHBpY1xcLmNvbVxcLyg/ISg/OnBsYWNlfHBob3Rvc3xldmVudHMpXFwvKShbYS16QS1aMC05XFw/XFw9XFwtXSspL2ksXG5cdFx0XHRcdHR5cGUgOiAnaW1hZ2UnLFxuXHRcdFx0XHR1cmwgIDogJy8vdHdpdHBpYy5jb20vc2hvdy9mdWxsLyQxLydcblx0XHRcdH0sXG5cdFx0XHRpbnN0YWdyYW0gOiB7XG5cdFx0XHRcdG1hdGNoZXIgOiAvKGluc3RhZ3JcXC5hbXxpbnN0YWdyYW1cXC5jb20pXFwvcFxcLyhbYS16QS1aMC05X1xcLV0rKVxcLz8vaSxcblx0XHRcdFx0dHlwZSA6ICdpbWFnZScsXG5cdFx0XHRcdHVybCAgOiAnLy8kMS9wLyQyL21lZGlhLz9zaXplPWwnXG5cdFx0XHR9LFxuXHRcdFx0Z29vZ2xlX21hcHMgOiB7XG5cdFx0XHRcdG1hdGNoZXIgOiAvbWFwc1xcLmdvb2dsZVxcLihbYS16XXsyLDN9KFxcLlthLXpdezJ9KT8pXFwvKFxcP2xsPXxtYXBzXFw/KSguKikvaSxcblx0XHRcdFx0dHlwZSA6ICdpZnJhbWUnLFxuXHRcdFx0XHR1cmwgIDogZnVuY3Rpb24oIHJleiApIHtcblx0XHRcdFx0XHRyZXR1cm4gJy8vbWFwcy5nb29nbGUuJyArIHJlelsxXSArICcvJyArIHJlelszXSArICcnICsgcmV6WzRdICsgJyZvdXRwdXQ9JyArIChyZXpbNF0uaW5kZXhPZignbGF5ZXI9YycpID4gMCA/ICdzdmVtYmVkJyA6ICdlbWJlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGJlZm9yZUxvYWQgOiBmdW5jdGlvbihvcHRzLCBvYmopIHtcblx0XHRcdHZhciB1cmwgICA9IG9iai5ocmVmIHx8ICcnLFxuXHRcdFx0XHR0eXBlICA9IGZhbHNlLFxuXHRcdFx0XHR3aGF0LFxuXHRcdFx0XHRpdGVtLFxuXHRcdFx0XHRyZXosXG5cdFx0XHRcdHBhcmFtcztcblxuXHRcdFx0Zm9yICh3aGF0IGluIG9wdHMpIHtcblx0XHRcdFx0aWYgKG9wdHMuaGFzT3duUHJvcGVydHkod2hhdCkpIHtcblx0XHRcdFx0XHRpdGVtID0gb3B0c1sgd2hhdCBdO1xuXHRcdFx0XHRcdHJleiAgPSB1cmwubWF0Y2goIGl0ZW0ubWF0Y2hlciApO1xuXG5cdFx0XHRcdFx0aWYgKHJleikge1xuXHRcdFx0XHRcdFx0dHlwZSAgID0gaXRlbS50eXBlO1xuXHRcdFx0XHRcdFx0cGFyYW1zID0gJC5leHRlbmQodHJ1ZSwge30sIGl0ZW0ucGFyYW1zLCBvYmpbIHdoYXQgXSB8fCAoJC5pc1BsYWluT2JqZWN0KG9wdHNbIHdoYXQgXSkgPyBvcHRzWyB3aGF0IF0ucGFyYW1zIDogbnVsbCkpO1xuXG5cdFx0XHRcdFx0XHR1cmwgPSAkLnR5cGUoIGl0ZW0udXJsICkgPT09IFwiZnVuY3Rpb25cIiA/IGl0ZW0udXJsLmNhbGwoIHRoaXMsIHJleiwgcGFyYW1zLCBvYmogKSA6IGZvcm1hdCggaXRlbS51cmwsIHJleiwgcGFyYW1zICk7XG5cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZSkge1xuXHRcdFx0XHRvYmouaHJlZiA9IHVybDtcblx0XHRcdFx0b2JqLnR5cGUgPSB0eXBlO1xuXG5cdFx0XHRcdG9iai5hdXRvSGVpZ2h0ID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG59KGpRdWVyeSkpOyJdfQ==
