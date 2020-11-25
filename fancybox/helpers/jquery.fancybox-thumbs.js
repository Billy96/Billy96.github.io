(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*!
* Thumbnail helper for fancyBox
* version: 1.0.7 (Mon, 01 Oct 2012)
* @requires fancyBox v2.0 or later
*
* Usage:
*     $(".fancybox").fancybox({
*         helpers : {
*             thumbs: {
*                 width  : 50,
*                 height : 50
*             }
*         }
*     });
*
*/
;

(function ($) {
  //Shortcut for fancyBox object
  var F = $.fancybox; //Add helper object

  F.helpers.thumbs = {
    defaults: {
      width: 50,
      // thumbnail width
      height: 50,
      // thumbnail height
      position: 'bottom',
      // 'top' or 'bottom'
      source: function source(item) {
        // function to obtain the URL of the thumbnail image
        var href;

        if (item.element) {
          href = $(item.element).find('img').attr('src');
        }

        if (!href && item.type === 'image' && item.href) {
          href = item.href;
        }

        return href;
      }
    },
    wrap: null,
    list: null,
    width: 0,
    init: function init(opts, obj) {
      var that = this,
          list,
          thumbWidth = opts.width,
          thumbHeight = opts.height,
          thumbSource = opts.source; //Build list structure

      list = '';

      for (var n = 0; n < obj.group.length; n++) {
        list += '<li><a style="width:' + thumbWidth + 'px;height:' + thumbHeight + 'px;" href="javascript:jQuery.fancybox.jumpto(' + n + ');"></a></li>';
      }

      this.wrap = $('<div id="fancybox-thumbs"></div>').addClass(opts.position).appendTo('body');
      this.list = $('<ul>' + list + '</ul>').appendTo(this.wrap); //Load each thumbnail

      $.each(obj.group, function (i) {
        var el = obj.group[i],
            href = thumbSource(el);

        if (!href) {
          return;
        }

        $("<img />").load(function () {
          var width = this.width,
              height = this.height,
              widthRatio,
              heightRatio,
              parent;

          if (!that.list || !width || !height) {
            return;
          } //Calculate thumbnail width/height and center it


          widthRatio = width / thumbWidth;
          heightRatio = height / thumbHeight;
          parent = that.list.children().eq(i).find('a');

          if (widthRatio >= 1 && heightRatio >= 1) {
            if (widthRatio > heightRatio) {
              width = Math.floor(width / heightRatio);
              height = thumbHeight;
            } else {
              width = thumbWidth;
              height = Math.floor(height / widthRatio);
            }
          }

          $(this).css({
            width: width,
            height: height,
            top: Math.floor(thumbHeight / 2 - height / 2),
            left: Math.floor(thumbWidth / 2 - width / 2)
          });
          parent.width(thumbWidth).height(thumbHeight);
          $(this).hide().appendTo(parent).fadeIn(300);
        }).attr('src', href).attr('title', el.title);
      }); //Set initial width

      this.width = this.list.children().eq(0).outerWidth(true);
      this.list.width(this.width * (obj.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5)));
    },
    beforeLoad: function beforeLoad(opts, obj) {
      //Remove self if gallery do not have at least two items
      if (obj.group.length < 2) {
        obj.helpers.thumbs = false;
        return;
      } //Increase bottom margin to give space for thumbs


      obj.margin[opts.position === 'top' ? 0 : 2] += opts.height + 15;
    },
    afterShow: function afterShow(opts, obj) {
      //Check if exists and create or update list
      if (this.list) {
        this.onUpdate(opts, obj);
      } else {
        this.init(opts, obj);
      } //Set active element


      this.list.children().removeClass('active').eq(obj.index).addClass('active');
    },
    //Center list
    onUpdate: function onUpdate(opts, obj) {
      if (this.list) {
        this.list.stop(true).animate({
          'left': Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5))
        }, 150);
      }
    },
    beforeClose: function beforeClose() {
      if (this.wrap) {
        this.wrap.remove();
      }

      this.wrap = null;
      this.list = null;
      this.width = 0;
    }
  };
})(jQuery);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvbGFuZHNjYXBlL3NvdXJjZS9mYW5jeWJveC9oZWxwZXJzL2pxdWVyeS5mYW5jeWJveC10aHVtYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUUsV0FBVSxDQUFWLEVBQWE7QUFDZDtBQUNBLE1BQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFWLENBRmMsQ0FJZDs7QUFDQSxFQUFBLENBQUMsQ0FBQyxPQUFGLENBQVUsTUFBVixHQUFtQjtBQUNsQixJQUFBLFFBQVEsRUFBRztBQUNWLE1BQUEsS0FBSyxFQUFNLEVBREQ7QUFDVztBQUNyQixNQUFBLE1BQU0sRUFBSyxFQUZEO0FBRVc7QUFDckIsTUFBQSxRQUFRLEVBQUcsUUFIRDtBQUdXO0FBQ3JCLE1BQUEsTUFBTSxFQUFLLGdCQUFXLElBQVgsRUFBa0I7QUFBRztBQUMvQixZQUFJLElBQUo7O0FBRUEsWUFBSSxJQUFJLENBQUMsT0FBVCxFQUFrQjtBQUNqQixVQUFBLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU4sQ0FBRCxDQUFnQixJQUFoQixDQUFxQixLQUFyQixFQUE0QixJQUE1QixDQUFpQyxLQUFqQyxDQUFQO0FBQ0E7O0FBRUQsWUFBSSxDQUFDLElBQUQsSUFBUyxJQUFJLENBQUMsSUFBTCxLQUFjLE9BQXZCLElBQWtDLElBQUksQ0FBQyxJQUEzQyxFQUFpRDtBQUNoRCxVQUFBLElBQUksR0FBRyxJQUFJLENBQUMsSUFBWjtBQUNBOztBQUVELGVBQU8sSUFBUDtBQUNBO0FBaEJTLEtBRE87QUFvQmxCLElBQUEsSUFBSSxFQUFJLElBcEJVO0FBcUJsQixJQUFBLElBQUksRUFBSSxJQXJCVTtBQXNCbEIsSUFBQSxLQUFL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OiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIiAvKiFcbiAqIFRodW1ibmFpbCBoZWxwZXIgZm9yIGZhbmN5Qm94XG4gKiB2ZXJzaW9uOiAxLjAuNyAoTW9uLCAwMSBPY3QgMjAxMilcbiAqIEByZXF1aXJlcyBmYW5jeUJveCB2Mi4wIG9yIGxhdGVyXG4gKlxuICogVXNhZ2U6XG4gKiAgICAgJChcIi5mYW5jeWJveFwiKS5mYW5jeWJveCh7XG4gKiAgICAgICAgIGhlbHBlcnMgOiB7XG4gKiAgICAgICAgICAgICB0aHVtYnM6IHtcbiAqICAgICAgICAgICAgICAgICB3aWR0aCAgOiA1MCxcbiAqICAgICAgICAgICAgICAgICBoZWlnaHQgOiA1MFxuICogICAgICAgICAgICAgfVxuICogICAgICAgICB9XG4gKiAgICAgfSk7XG4gKlxuICovXG47KGZ1bmN0aW9uICgkKSB7XG5cdC8vU2hvcnRjdXQgZm9yIGZhbmN5Qm94IG9iamVjdFxuXHR2YXIgRiA9ICQuZmFuY3lib3g7XG5cblx0Ly9BZGQgaGVscGVyIG9iamVjdFxuXHRGLmhlbHBlcnMudGh1bWJzID0ge1xuXHRcdGRlZmF1bHRzIDoge1xuXHRcdFx0d2lkdGggICAgOiA1MCwgICAgICAgLy8gdGh1bWJuYWlsIHdpZHRoXG5cdFx0XHRoZWlnaHQgICA6IDUwLCAgICAgICAvLyB0aHVtYm5haWwgaGVpZ2h0XG5cdFx0XHRwb3NpdGlvbiA6ICdib3R0b20nLCAvLyAndG9wJyBvciAnYm90dG9tJ1xuXHRcdFx0c291cmNlICAgOiBmdW5jdGlvbiAoIGl0ZW0gKSB7ICAvLyBmdW5jdGlvbiB0byBvYnRhaW4gdGhlIFVSTCBvZiB0aGUgdGh1bWJuYWlsIGltYWdlXG5cdFx0XHRcdHZhciBocmVmO1xuXG5cdFx0XHRcdGlmIChpdGVtLmVsZW1lbnQpIHtcblx0XHRcdFx0XHRocmVmID0gJChpdGVtLmVsZW1lbnQpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFocmVmICYmIGl0ZW0udHlwZSA9PT0gJ2ltYWdlJyAmJiBpdGVtLmhyZWYpIHtcblx0XHRcdFx0XHRocmVmID0gaXRlbS5ocmVmO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGhyZWY7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHdyYXAgIDogbnVsbCxcblx0XHRsaXN0ICA6IG51bGwsXG5cdFx0d2lkdGggOiAwLFxuXG5cdFx0aW5pdDogZnVuY3Rpb24gKG9wdHMsIG9iaikge1xuXHRcdFx0dmFyIHRoYXQgPSB0aGlzLFxuXHRcdFx0XHRsaXN0LFxuXHRcdFx0XHR0aHVtYldpZHRoICA9IG9wdHMud2lkdGgsXG5cdFx0XHRcdHRodW1iSGVpZ2h0ID0gb3B0cy5oZWlnaHQsXG5cdFx0XHRcdHRodW1iU291cmNlID0gb3B0cy5zb3VyY2U7XG5cblx0XHRcdC8vQnVpbGQgbGlzdCBzdHJ1Y3R1cmVcblx0XHRcdGxpc3QgPSAnJztcblxuXHRcdFx0Zm9yICh2YXIgbiA9IDA7IG4gPCBvYmouZ3JvdXAubGVuZ3RoOyBuKyspIHtcblx0XHRcdFx0bGlzdCArPSAnPGxpPjxhIHN0eWxlPVwid2lkdGg6JyArIHRodW1iV2lkdGggKyAncHg7aGVpZ2h0OicgKyB0aHVtYkhlaWdodCArICdweDtcIiBocmVmPVwiamF2YXNjcmlwdDpqUXVlcnkuZmFuY3lib3guanVtcHRvKCcgKyBuICsgJyk7XCI+PC9hPjwvbGk+Jztcblx0XHRcdH1cblxuXHRcdFx0dGhpcy53cmFwID0gJCgnPGRpdiBpZD1cImZhbmN5Ym94LXRodW1ic1wiPjwvZGl2PicpLmFkZENsYXNzKG9wdHMucG9zaXRpb24pLmFwcGVuZFRvKCdib2R5Jyk7XG5cdFx0XHR0aGlzLmxpc3QgPSAkKCc8dWw+JyArIGxpc3QgKyAnPC91bD4nKS5hcHBlbmRUbyh0aGlzLndyYXApO1xuXG5cdFx0XHQvL0xvYWQgZWFjaCB0aHVtYm5haWxcblx0XHRcdCQuZWFjaChvYmouZ3JvdXAsIGZ1bmN0aW9uIChpKSB7XG5cdFx0XHRcdHZhciBlbCAgID0gb2JqLmdyb3VwWyBpIF0sXG5cdFx0XHRcdFx0aHJlZiA9IHRodW1iU291cmNlKCBlbCApO1xuXG5cdFx0XHRcdGlmICghaHJlZikge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCQoXCI8aW1nIC8+XCIpLmxvYWQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciB3aWR0aCAgPSB0aGlzLndpZHRoLFxuXHRcdFx0XHRcdFx0aGVpZ2h0ID0gdGhpcy5oZWlnaHQsXG5cdFx0XHRcdFx0XHR3aWR0aFJhdGlvLCBoZWlnaHRSYXRpbywgcGFyZW50O1xuXG5cdFx0XHRcdFx0aWYgKCF0aGF0Lmxpc3QgfHwgIXdpZHRoIHx8ICFoZWlnaHQpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvL0NhbGN1bGF0ZSB0aHVtYm5haWwgd2lkdGgvaGVpZ2h0IGFuZCBjZW50ZXIgaXRcblx0XHRcdFx0XHR3aWR0aFJhdGlvICA9IHdpZHRoIC8gdGh1bWJXaWR0aDtcblx0XHRcdFx0XHRoZWlnaHRSYXRpbyA9IGhlaWdodCAvIHRodW1iSGVpZ2h0O1xuXG5cdFx0XHRcdFx0cGFyZW50ID0gdGhhdC5saXN0LmNoaWxkcmVuKCkuZXEoaSkuZmluZCgnYScpO1xuXG5cdFx0XHRcdFx0aWYgKHdpZHRoUmF0aW8gPj0gMSAmJiBoZWlnaHRSYXRpbyA+PSAxKSB7XG5cdFx0XHRcdFx0XHRpZiAod2lkdGhSYXRpbyA+IGhlaWdodFJhdGlvKSB7XG5cdFx0XHRcdFx0XHRcdHdpZHRoICA9IE1hdGguZmxvb3Iod2lkdGggLyBoZWlnaHRSYXRpbyk7XG5cdFx0XHRcdFx0XHRcdGhlaWdodCA9IHRodW1iSGVpZ2h0O1xuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR3aWR0aCAgPSB0aHVtYldpZHRoO1xuXHRcdFx0XHRcdFx0XHRoZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodCAvIHdpZHRoUmF0aW8pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdCQodGhpcykuY3NzKHtcblx0XHRcdFx0XHRcdHdpZHRoICA6IHdpZHRoLFxuXHRcdFx0XHRcdFx0aGVpZ2h0IDogaGVpZ2h0LFxuXHRcdFx0XHRcdFx0dG9wICAgIDogTWF0aC5mbG9vcih0aHVtYkhlaWdodCAvIDIgLSBoZWlnaHQgLyAyKSxcblx0XHRcdFx0XHRcdGxlZnQgICA6IE1hdGguZmxvb3IodGh1bWJXaWR0aCAvIDIgLSB3aWR0aCAvIDIpXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRwYXJlbnQud2lkdGgodGh1bWJXaWR0aCkuaGVpZ2h0KHRodW1iSGVpZ2h0KTtcblxuXHRcdFx0XHRcdCQodGhpcykuaGlkZSgpLmFwcGVuZFRvKHBhcmVudCkuZmFkZUluKDMwMCk7XG5cblx0XHRcdFx0fSlcblx0XHRcdFx0LmF0dHIoJ3NyYycsICAgaHJlZilcblx0XHRcdFx0LmF0dHIoJ3RpdGxlJywgZWwudGl0bGUpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vU2V0IGluaXRpYWwgd2lkdGhcblx0XHRcdHRoaXMud2lkdGggPSB0aGlzLmxpc3QuY2hpbGRyZW4oKS5lcSgwKS5vdXRlcldpZHRoKHRydWUpO1xuXG5cdFx0XHR0aGlzLmxpc3Qud2lkdGgodGhpcy53aWR0aCAqIChvYmouZ3JvdXAubGVuZ3RoICsgMSkpLmNzcygnbGVmdCcsIE1hdGguZmxvb3IoJCh3aW5kb3cpLndpZHRoKCkgKiAwLjUgLSAob2JqLmluZGV4ICogdGhpcy53aWR0aCArIHRoaXMud2lkdGggKiAwLjUpKSk7XG5cdFx0fSxcblxuXHRcdGJlZm9yZUxvYWQ6IGZ1bmN0aW9uIChvcHRzLCBvYmopIHtcblx0XHRcdC8vUmVtb3ZlIHNlbGYgaWYgZ2FsbGVyeSBkbyBub3QgaGF2ZSBhdCBsZWFzdCB0d28gaXRlbXNcblx0XHRcdGlmIChvYmouZ3JvdXAubGVuZ3RoIDwgMikge1xuXHRcdFx0XHRvYmouaGVscGVycy50aHVtYnMgPSBmYWxzZTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vSW5jcmVhc2UgYm90dG9tIG1hcmdpbiB0byBnaXZlIHNwYWNlIGZvciB0aHVtYnNcblx0XHRcdG9iai5tYXJnaW5bIG9wdHMucG9zaXRpb24gPT09ICd0b3AnID8gMCA6IDIgXSArPSAoKG9wdHMuaGVpZ2h0KSArIDE1KTtcblx0XHR9LFxuXG5cdFx0YWZ0ZXJTaG93OiBmdW5jdGlvbiAob3B0cywgb2JqKSB7XG5cdFx0XHQvL0NoZWNrIGlmIGV4aXN0cyBhbmQgY3JlYXRlIG9yIHVwZGF0ZSBsaXN0XG5cdFx0XHRpZiAodGhpcy5saXN0KSB7XG5cdFx0XHRcdHRoaXMub25VcGRhdGUob3B0cywgb2JqKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5pbml0KG9wdHMsIG9iaik7XG5cdFx0XHR9XG5cblx0XHRcdC8vU2V0IGFjdGl2ZSBlbGVtZW50XG5cdFx0XHR0aGlzLmxpc3QuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZXEob2JqLmluZGV4KS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0fSxcblxuXHRcdC8vQ2VudGVyIGxpc3Rcblx0XHRvblVwZGF0ZTogZnVuY3Rpb24gKG9wdHMsIG9iaikge1xuXHRcdFx0aWYgKHRoaXMubGlzdCkge1xuXHRcdFx0XHR0aGlzLmxpc3Quc3RvcCh0cnVlKS5hbmltYXRlKHtcblx0XHRcdFx0XHQnbGVmdCc6IE1hdGguZmxvb3IoJCh3aW5kb3cpLndpZHRoKCkgKiAwLjUgLSAob2JqLmluZGV4ICogdGhpcy53aWR0aCArIHRoaXMud2lkdGggKiAwLjUpKVxuXHRcdFx0XHR9LCAxNTApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRiZWZvcmVDbG9zZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMud3JhcCkge1xuXHRcdFx0XHR0aGlzLndyYXAucmVtb3ZlKCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMud3JhcCAgPSBudWxsO1xuXHRcdFx0dGhpcy5saXN0ICA9IG51bGw7XG5cdFx0XHR0aGlzLndpZHRoID0gMDtcblx0XHR9XG5cdH1cblxufShqUXVlcnkpKTsiXX0=
