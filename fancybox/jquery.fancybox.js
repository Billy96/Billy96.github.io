(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
;

(function (window, document, $, undefined) {
  "use strict";

  var H = $("html"),
      W = $(window),
      D = $(document),
      F = $.fancybox = function () {
    F.open.apply(this, arguments);
  },
      IE = navigator.userAgent.match(/msie/i),
      didUpdate = null,
      isTouch = document.createTouch !== undefined,
      isQuery = function isQuery(obj) {
    return obj && obj.hasOwnProperty && obj instanceof $;
  },
      isString = function isString(str) {
    return str && $.type(str) === "string";
  },
      isPercentage = function isPercentage(str) {
    return isString(str) && str.indexOf('%') > 0;
  },
      isScrollable = function isScrollable(el) {
    return el && !(el.style.overflow && el.style.overflow === 'hidden') && (el.clientWidth && el.scrollWidth > el.clientWidth || el.clientHeight && el.scrollHeight > el.clientHeight);
  },
      getScalar = function getScalar(orig, dim) {
    var value = parseInt(orig, 10) || 0;

    if (dim && isPercentage(orig)) {
      value = F.getViewport()[dim] / 100 * value;
    }

    return Math.ceil(value);
  },
      getValue = function getValue(value, dim) {
    return getScalar(value, dim) + 'px';
  };

  $.extend(F, {
    // The current version of fancyBox
    version: '2.1.5',
    defaults: {
      padding: 15,
      margin: 20,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      pixelRatio: 1,
      // Set to 2 for retina display support
      autoSize: true,
      autoHeight: false,
      autoWidth: false,
      autoResize: true,
      autoCenter: !isTouch,
      fitToView: true,
      aspectRatio: false,
      topRatio: 0.5,
      leftRatio: 0.5,
      scrolling: 'auto',
      // 'auto', 'yes' or 'no'
      wrapCSS: '',
      arrows: true,
      closeBtn: true,
      closeClick: false,
      nextClick: false,
      mouseWheel: true,
      autoPlay: false,
      playSpeed: 3000,
      preload: 3,
      modal: false,
      loop: true,
      ajax: {
        dataType: 'html',
        headers: {
          'X-fancyBox': true
        }
      },
      iframe: {
        scrolling: 'auto',
        preload: true
      },
      swf: {
        wmode: 'transparent',
        allowfullscreen: 'true',
        allowscriptaccess: 'always'
      },
      keys: {
        next: {
          13: 'left',
          // enter
          34: 'up',
          // page down
          39: 'left',
          // right arrow
          40: 'up' // down arrow

        },
        prev: {
          8: 'right',
          // backspace
          33: 'down',
          // page up
          37: 'right',
          // left arrow
          38: 'down' // up arrow

        },
        close: [27],
        // escape key
        play: [32],
        // space - start/stop slideshow
        toggle: [70] // letter "f" - toggle fullscreen

      },
      direction: {
        next: 'left',
        prev: 'right'
      },
      scrollOutside: true,
      // Override some properties
      index: 0,
      type: null,
      href: null,
      content: null,
      title: null,
      // HTML templates
      tpl: {
        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image: '<img class="fancybox-image" src="{href}" alt="" />',
        iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
        error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
      },
      // Properties for each animation type
      // Opening fancyBox
      openEffect: 'fade',
      // 'elastic', 'fade' or 'none'
      openSpeed: 250,
      openEasing: 'swing',
      openOpacity: true,
      openMethod: 'zoomIn',
      // Closing fancyBox
      closeEffect: 'fade',
      // 'elastic', 'fade' or 'none'
      closeSpeed: 250,
      closeEasing: 'swing',
      closeOpacity: true,
      closeMethod: 'zoomOut',
      // Changing next gallery item
      nextEffect: 'elastic',
      // 'elastic', 'fade' or 'none'
      nextSpeed: 250,
      nextEasing: 'swing',
      nextMethod: 'changeIn',
      // Changing previous gallery item
      prevEffect: 'elastic',
      // 'elastic', 'fade' or 'none'
      prevSpeed: 250,
      prevEasing: 'swing',
      prevMethod: 'changeOut',
      // Enable default helpers
      helpers: {
        overlay: true,
        title: true
      },
      // Callbacks
      onCancel: $.noop,
      // If canceling
      beforeLoad: $.noop,
      // Before loading
      afterLoad: $.noop,
      // After loading
      beforeShow: $.noop,
      // Before changing in current item
      afterShow: $.noop,
      // After opening
      beforeChange: $.noop,
      // Before changing gallery item
      beforeClose: $.noop,
      // Before closing
      afterClose: $.noop // After closing

    },
    //Current state
    group: {},
    // Selected group
    opts: {},
    // Group options
    previous: null,
    // Previous element
    coming: null,
    // Element being loaded
    current: null,
    // Currently loaded element
    isActive: false,
    // Is activated
    isOpen: false,
    // Is currently open
    isOpened: false,
    // Have been fully opened at least once
    wrap: null,
    skin: null,
    outer: null,
    inner: null,
    player: {
      timer: null,
      isActive: false
    },
    // Loaders
    ajaxLoad: null,
    imgPreload: null,
    // Some collections
    transitions: {},
    helpers: {},

    /*
     *	Static methods
     */
    open: function open(group, opts) {
      if (!group) {
        return;
      }

      if (!$.isPlainObject(opts)) {
        opts = {};
      } // Close if already active


      if (false === F.close(true)) {
        return;
      } // Normalize group


      if (!$.isArray(group)) {
        group = isQuery(group) ? $(group).get() : [group];
      } // Recheck if the type of each element is `object` and set content type (image, ajax, etc)


      $.each(group, function (i, element) {
        var obj = {},
            href,
            title,
            content,
            type,
            rez,
            hrefParts,
            selector;

        if ($.type(element) === "object") {
          // Check if is DOM element
          if (element.nodeType) {
            element = $(element);
          }

          if (isQuery(element)) {
            obj = {
              href: element.data('fancybox-href') || element.attr('href'),
              title: $('<div/>').text(element.data('fancybox-title') || element.attr('title')).html(),
              isDom: true,
              element: element
            };

            if ($.metadata) {
              $.extend(true, obj, element.metadata());
            }
          } else {
            obj = element;
          }
        }

        href = opts.href || obj.href || (isString(element) ? element : null);
        title = opts.title !== undefined ? opts.title : obj.title || '';
        content = opts.content || obj.content;
        type = content ? 'html' : opts.type || obj.type;

        if (!type && obj.isDom) {
          type = element.data('fancybox-type');

          if (!type) {
            rez = element.prop('class').match(/fancybox\.(\w+)/);
            type = rez ? rez[1] : null;
          }
        }

        if (isString(href)) {
          // Try to guess the content type
          if (!type) {
            if (F.isImage(href)) {
              type = 'image';
            } else if (F.isSWF(href)) {
              type = 'swf';
            } else if (href.charAt(0) === '#') {
              type = 'inline';
            } else if (isString(element)) {
              type = 'html';
              content = element;
            }
          } // Split url into two pieces with source url and content selector, e.g,
          // "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"


          if (type === 'ajax') {
            hrefParts = href.split(/\s+/, 2);
            href = hrefParts.shift();
            selector = hrefParts.shift();
          }
        }

        if (!content) {
          if (type === 'inline') {
            if (href) {
              content = $(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href); //strip for ie7
            } else if (obj.isDom) {
              content = element;
            }
          } else if (type === 'html') {
            content = href;
          } else if (!type && !href && obj.isDom) {
            type = 'inline';
            content = element;
          }
        }

        $.extend(obj, {
          href: href,
          type: type,
          content: content,
          title: title,
          selector: selector
        });
        group[i] = obj;
      }); // Extend the defaults

      F.opts = $.extend(true, {}, F.defaults, opts); // All options are merged recursive except keys

      if (opts.keys !== undefined) {
        F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
      }

      F.group = group;
      return F._start(F.opts.index);
    },
    // Cancel image loading or abort ajax request
    cancel: function cancel() {
      var coming = F.coming;

      if (coming && false === F.trigger('onCancel')) {
        return;
      }

      F.hideLoading();

      if (!coming) {
        return;
      }

      if (F.ajaxLoad) {
        F.ajaxLoad.abort();
      }

      F.ajaxLoad = null;

      if (F.imgPreload) {
        F.imgPreload.onload = F.imgPreload.onerror = null;
      }

      if (coming.wrap) {
        coming.wrap.stop(true, true).trigger('onReset').remove();
      }

      F.coming = null; // If the first item has been canceled, then clear everything

      if (!F.current) {
        F._afterZoomOut(coming);
      }
    },
    // Start closing animation if is open; remove immediately if opening/closing
    close: function close(event) {
      F.cancel();

      if (false === F.trigger('beforeClose')) {
        return;
      }

      F.unbindEvents();

      if (!F.isActive) {
        return;
      }

      if (!F.isOpen || event === true) {
        $('.fancybox-wrap').stop(true).trigger('onReset').remove();

        F._afterZoomOut();
      } else {
        F.isOpen = F.isOpened = false;
        F.isClosing = true;
        $('.fancybox-item, .fancybox-nav').remove();
        F.wrap.stop(true, true).removeClass('fancybox-opened');
        F.transitions[F.current.closeMethod]();
      }
    },
    // Manage slideshow:
    //   $.fancybox.play(); - toggle slideshow
    //   $.fancybox.play( true ); - start
    //   $.fancybox.play( false ); - stop
    play: function play(action) {
      var clear = function clear() {
        clearTimeout(F.player.timer);
      },
          set = function set() {
        clear();

        if (F.current && F.player.isActive) {
          F.player.timer = setTimeout(F.next, F.current.playSpeed);
        }
      },
          stop = function stop() {
        clear();
        D.unbind('.player');
        F.player.isActive = false;
        F.trigger('onPlayEnd');
      },
          start = function start() {
        if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
          F.player.isActive = true;
          D.bind({
            'onCancel.player beforeClose.player': stop,
            'onUpdate.player': set,
            'beforeLoad.player': clear
          });
          set();
          F.trigger('onPlayStart');
        }
      };

      if (action === true || !F.player.isActive && action !== false) {
        start();
      } else {
        stop();
      }
    },
    // Navigate to next gallery item
    next: function next(direction) {
      var current = F.current;

      if (current) {
        if (!isString(direction)) {
          direction = current.direction.next;
        }

        F.jumpto(current.index + 1, direction, 'next');
      }
    },
    // Navigate to previous gallery item
    prev: function prev(direction) {
      var current = F.current;

      if (current) {
        if (!isString(direction)) {
          direction = current.direction.prev;
        }

        F.jumpto(current.index - 1, direction, 'prev');
      }
    },
    // Navigate to gallery item by index
    jumpto: function jumpto(index, direction, router) {
      var current = F.current;

      if (!current) {
        return;
      }

      index = getScalar(index);
      F.direction = direction || current.direction[index >= current.index ? 'next' : 'prev'];
      F.router = router || 'jumpto';

      if (current.loop) {
        if (index < 0) {
          index = current.group.length + index % current.group.length;
        }

        index = index % current.group.length;
      }

      if (current.group[index] !== undefined) {
        F.cancel();

        F._start(index);
      }
    },
    // Center inside viewport and toggle position type to fixed or absolute if needed
    reposition: function reposition(e, onlyAbsolute) {
      var current = F.current,
          wrap = current ? current.wrap : null,
          pos;

      if (wrap) {
        pos = F._getPosition(onlyAbsolute);

        if (e && e.type === 'scroll') {
          delete pos.position;
          wrap.stop(true, true).animate(pos, 200);
        } else {
          wrap.css(pos);
          current.pos = $.extend({}, current.dim, pos);
        }
      }
    },
    update: function update(e) {
      var type = e && e.originalEvent && e.originalEvent.type,
          anyway = !type || type === 'orientationchange';

      if (anyway) {
        clearTimeout(didUpdate);
        didUpdate = null;
      }

      if (!F.isOpen || didUpdate) {
        return;
      }

      didUpdate = setTimeout(function () {
        var current = F.current;

        if (!current || F.isClosing) {
          return;
        }

        F.wrap.removeClass('fancybox-tmp');

        if (anyway || type === 'load' || type === 'resize' && current.autoResize) {
          F._setDimension();
        }

        if (!(type === 'scroll' && current.canShrink)) {
          F.reposition(e);
        }

        F.trigger('onUpdate');
        didUpdate = null;
      }, anyway && !isTouch ? 0 : 300);
    },
    // Shrink content to fit inside viewport or restore if resized
    toggle: function toggle(action) {
      if (F.isOpen) {
        F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView; // Help browser to restore document dimensions

        if (isTouch) {
          F.wrap.removeAttr('style').addClass('fancybox-tmp');
          F.trigger('onUpdate');
        }

        F.update();
      }
    },
    hideLoading: function hideLoading() {
      D.unbind('.loading');
      $('#fancybox-loading').remove();
    },
    showLoading: function showLoading() {
      var el, viewport;
      F.hideLoading();
      el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body'); // If user will press the escape-button, the request will be canceled

      D.bind('keydown.loading', function (e) {
        if ((e.which || e.keyCode) === 27) {
          e.preventDefault();
          F.cancel();
        }
      });

      if (!F.defaults.fixed) {
        viewport = F.getViewport();
        el.css({
          position: 'absolute',
          top: viewport.h * 0.5 + viewport.y,
          left: viewport.w * 0.5 + viewport.x
        });
      }

      F.trigger('onLoading');
    },
    getViewport: function getViewport() {
      var locked = F.current && F.current.locked || false,
          rez = {
        x: W.scrollLeft(),
        y: W.scrollTop()
      };

      if (locked && locked.length) {
        rez.w = locked[0].clientWidth;
        rez.h = locked[0].clientHeight;
      } else {
        // See http://bugs.jquery.com/ticket/6724
        rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
        rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
      }

      return rez;
    },
    // Unbind the keyboard / clicking actions
    unbindEvents: function unbindEvents() {
      if (F.wrap && isQuery(F.wrap)) {
        F.wrap.unbind('.fb');
      }

      D.unbind('.fb');
      W.unbind('.fb');
    },
    bindEvents: function bindEvents() {
      var current = F.current,
          keys;

      if (!current) {
        return;
      } // Changing document height on iOS devices triggers a 'resize' event,
      // that can change document height... repeating infinitely


      W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);
      keys = current.keys;

      if (keys) {
        D.bind('keydown.fb', function (e) {
          var code = e.which || e.keyCode,
              target = e.target || e.srcElement; // Skip esc key if loading, because showLoading will cancel preloading

          if (code === 27 && F.coming) {
            return false;
          } // Ignore key combinations and key events within form elements


          if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
            $.each(keys, function (i, val) {
              if (current.group.length > 1 && val[code] !== undefined) {
                F[i](val[code]);
                e.preventDefault();
                return false;
              }

              if ($.inArray(code, val) > -1) {
                F[i]();
                e.preventDefault();
                return false;
              }
            });
          }
        });
      }

      if ($.fn.mousewheel && current.mouseWheel) {
        F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
          var target = e.target || null,
              parent = $(target),
              canScroll = false;

          while (parent.length) {
            if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
              break;
            }

            canScroll = isScrollable(parent[0]);
            parent = $(parent).parent();
          }

          if (delta !== 0 && !canScroll) {
            if (F.group.length > 1 && !current.canShrink) {
              if (deltaY > 0 || deltaX > 0) {
                F.prev(deltaY > 0 ? 'down' : 'left');
              } else if (deltaY < 0 || deltaX < 0) {
                F.next(deltaY < 0 ? 'up' : 'right');
              }

              e.preventDefault();
            }
          }
        });
      }
    },
    trigger: function trigger(event, o) {
      var ret,
          obj = o || F.coming || F.current;

      if (obj) {
        if ($.isFunction(obj[event])) {
          ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
        }

        if (ret === false) {
          return false;
        }

        if (obj.helpers) {
          $.each(obj.helpers, function (helper, opts) {
            if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
              F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
            }
          });
        }
      }

      D.trigger(event);
    },
    isImage: function isImage(str) {
      return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
    },
    isSWF: function isSWF(str) {
      return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
    },
    _start: function _start(index) {
      var coming = {},
          obj,
          href,
          type,
          margin,
          padding;
      index = getScalar(index);
      obj = F.group[index] || null;

      if (!obj) {
        return false;
      }

      coming = $.extend(true, {}, F.opts, obj); // Convert margin and padding properties to array - top, right, bottom, left

      margin = coming.margin;
      padding = coming.padding;

      if ($.type(margin) === 'number') {
        coming.margin = [margin, margin, margin, margin];
      }

      if ($.type(padding) === 'number') {
        coming.padding = [padding, padding, padding, padding];
      } // 'modal' propery is just a shortcut


      if (coming.modal) {
        $.extend(true, coming, {
          closeBtn: false,
          closeClick: false,
          nextClick: false,
          arrows: false,
          mouseWheel: false,
          keys: null,
          helpers: {
            overlay: {
              closeClick: false
            }
          }
        });
      } // 'autoSize' property is a shortcut, too


      if (coming.autoSize) {
        coming.autoWidth = coming.autoHeight = true;
      }

      if (coming.width === 'auto') {
        coming.autoWidth = true;
      }

      if (coming.height === 'auto') {
        coming.autoHeight = true;
      }
      /*
       * Add reference to the group, so it`s possible to access from callbacks, example:
       * afterLoad : function() {
       *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
       * }
       */


      coming.group = F.group;
      coming.index = index; // Give a chance for callback or helpers to update coming item (type, title, etc)

      F.coming = coming;

      if (false === F.trigger('beforeLoad')) {
        F.coming = null;
        return;
      }

      type = coming.type;
      href = coming.href;

      if (!type) {
        F.coming = null; //If we can not determine content type then drop silently or display next/prev item if looping through gallery

        if (F.current && F.router && F.router !== 'jumpto') {
          F.current.index = index;
          return F[F.router](F.direction);
        }

        return false;
      }

      F.isActive = true;

      if (type === 'image' || type === 'swf') {
        coming.autoHeight = coming.autoWidth = false;
        coming.scrolling = 'visible';
      }

      if (type === 'image') {
        coming.aspectRatio = true;
      }

      if (type === 'iframe' && isTouch) {
        coming.scrolling = 'scroll';
      } // Build the neccessary markup


      coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo(coming.parent || 'body');
      $.extend(coming, {
        skin: $('.fancybox-skin', coming.wrap),
        outer: $('.fancybox-outer', coming.wrap),
        inner: $('.fancybox-inner', coming.wrap)
      });
      $.each(["Top", "Right", "Bottom", "Left"], function (i, v) {
        coming.skin.css('padding' + v, getValue(coming.padding[i]));
      });
      F.trigger('onReady'); // Check before try to load; 'inline' and 'html' types need content, others - href

      if (type === 'inline' || type === 'html') {
        if (!coming.content || !coming.content.length) {
          return F._error('content');
        }
      } else if (!href) {
        return F._error('href');
      }

      if (type === 'image') {
        F._loadImage();
      } else if (type === 'ajax') {
        F._loadAjax();
      } else if (type === 'iframe') {
        F._loadIframe();
      } else {
        F._afterLoad();
      }
    },
    _error: function _error(type) {
      $.extend(F.coming, {
        type: 'html',
        autoWidth: true,
        autoHeight: true,
        minWidth: 0,
        minHeight: 0,
        scrolling: 'no',
        hasError: type,
        content: F.coming.tpl.error
      });

      F._afterLoad();
    },
    _loadImage: function _loadImage() {
      // Reset preload image so it is later possible to check "complete" property
      var img = F.imgPreload = new Image();

      img.onload = function () {
        this.onload = this.onerror = null;
        F.coming.width = this.width / F.opts.pixelRatio;
        F.coming.height = this.height / F.opts.pixelRatio;

        F._afterLoad();
      };

      img.onerror = function () {
        this.onload = this.onerror = null;

        F._error('image');
      };

      img.src = F.coming.href;

      if (img.complete !== true) {
        F.showLoading();
      }
    },
    _loadAjax: function _loadAjax() {
      var coming = F.coming;
      F.showLoading();
      F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
        url: coming.href,
        error: function error(jqXHR, textStatus) {
          if (F.coming && textStatus !== 'abort') {
            F._error('ajax', jqXHR);
          } else {
            F.hideLoading();
          }
        },
        success: function success(data, textStatus) {
          if (textStatus === 'success') {
            coming.content = data;

            F._afterLoad();
          }
        }
      }));
    },
    _loadIframe: function _loadIframe() {
      var coming = F.coming,
          iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime())).attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling).attr('src', coming.href); // This helps IE

      $(coming.wrap).bind('onReset', function () {
        try {
          $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
        } catch (e) {}
      });

      if (coming.iframe.preload) {
        F.showLoading();
        iframe.one('load', function () {
          $(this).data('ready', 1); // iOS will lose scrolling if we resize

          if (!isTouch) {
            $(this).bind('load.fb', F.update);
          } // Without this trick:
          //   - iframe won't scroll on iOS devices
          //   - IE7 sometimes displays empty iframe


          $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

          F._afterLoad();
        });
      }

      coming.content = iframe.appendTo(coming.inner);

      if (!coming.iframe.preload) {
        F._afterLoad();
      }
    },
    _preloadImages: function _preloadImages() {
      var group = F.group,
          current = F.current,
          len = group.length,
          cnt = current.preload ? Math.min(current.preload, len - 1) : 0,
          item,
          i;

      for (i = 1; i <= cnt; i += 1) {
        item = group[(current.index + i) % len];

        if (item.type === 'image' && item.href) {
          new Image().src = item.href;
        }
      }
    },
    _afterLoad: function _afterLoad() {
      var coming = F.coming,
          previous = F.current,
          placeholder = 'fancybox-placeholder',
          current,
          content,
          type,
          scrolling,
          href,
          embed;
      F.hideLoading();

      if (!coming || F.isActive === false) {
        return;
      }

      if (false === F.trigger('afterLoad', coming, previous)) {
        coming.wrap.stop(true).trigger('onReset').remove();
        F.coming = null;
        return;
      }

      if (previous) {
        F.trigger('beforeChange', previous);
        previous.wrap.stop(true).removeClass('fancybox-opened').find('.fancybox-item, .fancybox-nav').remove();
      }

      F.unbindEvents();
      current = coming;
      content = coming.content;
      type = coming.type;
      scrolling = coming.scrolling;
      $.extend(F, {
        wrap: current.wrap,
        skin: current.skin,
        outer: current.outer,
        inner: current.inner,
        current: current,
        previous: previous
      });
      href = current.href;

      switch (type) {
        case 'inline':
        case 'ajax':
        case 'html':
          if (current.selector) {
            content = $('<div>').html(content).find(current.selector);
          } else if (isQuery(content)) {
            if (!content.data(placeholder)) {
              content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter(content).hide());
            }

            content = content.show().detach();
            current.wrap.bind('onReset', function () {
              if ($(this).find(content).length) {
                content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
              }
            });
          }

          break;

        case 'image':
          content = current.tpl.image.replace(/\{href\}/g, href);
          break;

        case 'swf':
          content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
          embed = '';
          $.each(current.swf, function (name, val) {
            content += '<param name="' + name + '" value="' + val + '"></param>';
            embed += ' ' + name + '="' + val + '"';
          });
          content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
          break;
      }

      if (!(isQuery(content) && content.parent().is(current.inner))) {
        current.inner.append(content);
      } // Give a chance for helpers or callbacks to update elements


      F.trigger('beforeShow'); // Set scrolling before calculating dimensions

      current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : scrolling === 'no' ? 'hidden' : scrolling); // Set initial dimensions and start position

      F._setDimension();

      F.reposition();
      F.isOpen = false;
      F.coming = null;
      F.bindEvents();

      if (!F.isOpened) {
        $('.fancybox-wrap').not(current.wrap).stop(true).trigger('onReset').remove();
      } else if (previous.prevMethod) {
        F.transitions[previous.prevMethod]();
      }

      F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();

      F._preloadImages();
    },
    _setDimension: function _setDimension() {
      var viewport = F.getViewport(),
          steps = 0,
          canShrink = false,
          canExpand = false,
          wrap = F.wrap,
          skin = F.skin,
          inner = F.inner,
          current = F.current,
          width = current.width,
          height = current.height,
          minWidth = current.minWidth,
          minHeight = current.minHeight,
          maxWidth = current.maxWidth,
          maxHeight = current.maxHeight,
          scrolling = current.scrolling,
          scrollOut = current.scrollOutside ? current.scrollbarWidth : 0,
          margin = current.margin,
          wMargin = getScalar(margin[1] + margin[3]),
          hMargin = getScalar(margin[0] + margin[2]),
          wPadding,
          hPadding,
          wSpace,
          hSpace,
          origWidth,
          origHeight,
          origMaxWidth,
          origMaxHeight,
          ratio,
          width_,
          height_,
          maxWidth_,
          maxHeight_,
          iframe,
          body; // Reset dimensions so we could re-check actual size

      wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');
      wPadding = getScalar(skin.outerWidth(true) - skin.width());
      hPadding = getScalar(skin.outerHeight(true) - skin.height()); // Any space between content and viewport (margin, padding, border, title)

      wSpace = wMargin + wPadding;
      hSpace = hMargin + hPadding;
      origWidth = isPercentage(width) ? (viewport.w - wSpace) * getScalar(width) / 100 : width;
      origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

      if (current.type === 'iframe') {
        iframe = current.content;

        if (current.autoHeight && iframe.data('ready') === 1) {
          try {
            if (iframe[0].contentWindow.document.location) {
              inner.width(origWidth).height(9999);
              body = iframe.contents().find('body');

              if (scrollOut) {
                body.css('overflow-x', 'hidden');
              }

              origHeight = body.outerHeight(true);
            }
          } catch (e) {}
        }
      } else if (current.autoWidth || current.autoHeight) {
        inner.addClass('fancybox-tmp'); // Set width or height in case we need to calculate only one dimension

        if (!current.autoWidth) {
          inner.width(origWidth);
        }

        if (!current.autoHeight) {
          inner.height(origHeight);
        }

        if (current.autoWidth) {
          origWidth = inner.width();
        }

        if (current.autoHeight) {
          origHeight = inner.height();
        }

        inner.removeClass('fancybox-tmp');
      }

      width = getScalar(origWidth);
      height = getScalar(origHeight);
      ratio = origWidth / origHeight; // Calculations for the content

      minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
      maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);
      minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
      maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight); // These will be used to determine if wrap can fit in the viewport

      origMaxWidth = maxWidth;
      origMaxHeight = maxHeight;

      if (current.fitToView) {
        maxWidth = Math.min(viewport.w - wSpace, maxWidth);
        maxHeight = Math.min(viewport.h - hSpace, maxHeight);
      }

      maxWidth_ = viewport.w - wMargin;
      maxHeight_ = viewport.h - hMargin;

      if (current.aspectRatio) {
        if (width > maxWidth) {
          width = maxWidth;
          height = getScalar(width / ratio);
        }

        if (height > maxHeight) {
          height = maxHeight;
          width = getScalar(height * ratio);
        }

        if (width < minWidth) {
          width = minWidth;
          height = getScalar(width / ratio);
        }

        if (height < minHeight) {
          height = minHeight;
          width = getScalar(height * ratio);
        }
      } else {
        width = Math.max(minWidth, Math.min(width, maxWidth));

        if (current.autoHeight && current.type !== 'iframe') {
          inner.width(width);
          height = inner.height();
        }

        height = Math.max(minHeight, Math.min(height, maxHeight));
      } // Try to fit inside viewport (including the title)


      if (current.fitToView) {
        inner.width(width).height(height);
        wrap.width(width + wPadding); // Real wrap dimensions

        width_ = wrap.width();
        height_ = wrap.height();

        if (current.aspectRatio) {
          while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
            if (steps++ > 19) {
              break;
            }

            height = Math.max(minHeight, Math.min(maxHeight, height - 10));
            width = getScalar(height * ratio);

            if (width < minWidth) {
              width = minWidth;
              height = getScalar(width / ratio);
            }

            if (width > maxWidth) {
              width = maxWidth;
              height = getScalar(width / ratio);
            }

            inner.width(width).height(height);
            wrap.width(width + wPadding);
            width_ = wrap.width();
            height_ = wrap.height();
          }
        } else {
          width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
          height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
        }
      }

      if (scrollOut && scrolling === 'auto' && height < origHeight && width + wPadding + scrollOut < maxWidth_) {
        width += scrollOut;
      }

      inner.width(width).height(height);
      wrap.width(width + wPadding);
      width_ = wrap.width();
      height_ = wrap.height();
      canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
      canExpand = current.aspectRatio ? width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight : (width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight);
      $.extend(current, {
        dim: {
          width: getValue(width_),
          height: getValue(height_)
        },
        origWidth: origWidth,
        origHeight: origHeight,
        canShrink: canShrink,
        canExpand: canExpand,
        wPadding: wPadding,
        hPadding: hPadding,
        wrapSpace: height_ - skin.outerHeight(true),
        skinSpace: skin.height() - height
      });

      if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
        inner.height('auto');
      }
    },
    _getPosition: function _getPosition(onlyAbsolute) {
      var current = F.current,
          viewport = F.getViewport(),
          margin = current.margin,
          width = F.wrap.width() + margin[1] + margin[3],
          height = F.wrap.height() + margin[0] + margin[2],
          rez = {
        position: 'absolute',
        top: margin[0],
        left: margin[3]
      };

      if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
        rez.position = 'fixed';
      } else if (!current.locked) {
        rez.top += viewport.y;
        rez.left += viewport.x;
      }

      rez.top = getValue(Math.max(rez.top, rez.top + (viewport.h - height) * current.topRatio));
      rez.left = getValue(Math.max(rez.left, rez.left + (viewport.w - width) * current.leftRatio));
      return rez;
    },
    _afterZoomIn: function _afterZoomIn() {
      var current = F.current;

      if (!current) {
        return;
      }

      F.isOpen = F.isOpened = true;
      F.wrap.css('overflow', 'visible').addClass('fancybox-opened').hide().show(0);
      F.update(); // Assign a click event

      if (current.closeClick || current.nextClick && F.group.length > 1) {
        F.inner.css('cursor', 'pointer').bind('click.fb', function (e) {
          if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
            e.preventDefault();
            F[current.closeClick ? 'close' : 'next']();
          }
        });
      } // Create a close button


      if (current.closeBtn) {
        $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function (e) {
          e.preventDefault();
          F.close();
        });
      } // Create navigation arrows


      if (current.arrows && F.group.length > 1) {
        if (current.loop || current.index > 0) {
          $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
        }

        if (current.loop || current.index < F.group.length - 1) {
          $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
        }
      }

      F.trigger('afterShow'); // Stop the slideshow if this is the last item

      if (!current.loop && current.index === current.group.length - 1) {
        F.play(false);
      } else if (F.opts.autoPlay && !F.player.isActive) {
        F.opts.autoPlay = false;
        F.play(true);
      }
    },
    _afterZoomOut: function _afterZoomOut(obj) {
      obj = obj || F.current;
      $('.fancybox-wrap').trigger('onReset').remove();
      $.extend(F, {
        group: {},
        opts: {},
        router: false,
        current: null,
        isActive: false,
        isOpened: false,
        isOpen: false,
        isClosing: false,
        wrap: null,
        skin: null,
        outer: null,
        inner: null
      });
      F.trigger('afterClose', obj);
    }
  });
  /*
   *	Default transitions
   */

  F.transitions = {
    getOrigPosition: function getOrigPosition() {
      var current = F.current,
          element = current.element,
          orig = current.orig,
          pos = {},
          width = 50,
          height = 50,
          hPadding = current.hPadding,
          wPadding = current.wPadding,
          viewport = F.getViewport();

      if (!orig && current.isDom && element.is(':visible')) {
        orig = element.find('img:first');

        if (!orig.length) {
          orig = element;
        }
      }

      if (isQuery(orig)) {
        pos = orig.offset();

        if (orig.is('img')) {
          width = orig.outerWidth();
          height = orig.outerHeight();
        }
      } else {
        pos.top = viewport.y + (viewport.h - height) * current.topRatio;
        pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
      }

      if (F.wrap.css('position') === 'fixed' || current.locked) {
        pos.top -= viewport.y;
        pos.left -= viewport.x;
      }

      pos = {
        top: getValue(pos.top - hPadding * current.topRatio),
        left: getValue(pos.left - wPadding * current.leftRatio),
        width: getValue(width + wPadding),
        height: getValue(height + hPadding)
      };
      return pos;
    },
    step: function step(now, fx) {
      var ratio,
          padding,
          value,
          prop = fx.prop,
          current = F.current,
          wrapSpace = current.wrapSpace,
          skinSpace = current.skinSpace;

      if (prop === 'width' || prop === 'height') {
        ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

        if (F.isClosing) {
          ratio = 1 - ratio;
        }

        padding = prop === 'width' ? current.wPadding : current.hPadding;
        value = now - padding;
        F.skin[prop](getScalar(prop === 'width' ? value : value - wrapSpace * ratio));
        F.inner[prop](getScalar(prop === 'width' ? value : value - wrapSpace * ratio - skinSpace * ratio));
      }
    },
    zoomIn: function zoomIn() {
      var current = F.current,
          startPos = current.pos,
          effect = current.openEffect,
          elastic = effect === 'elastic',
          endPos = $.extend({
        opacity: 1
      }, startPos); // Remove "position" property that breaks older IE

      delete endPos.position;

      if (elastic) {
        startPos = this.getOrigPosition();

        if (current.openOpacity) {
          startPos.opacity = 0.1;
        }
      } else if (effect === 'fade') {
        startPos.opacity = 0.1;
      }

      F.wrap.css(startPos).animate(endPos, {
        duration: effect === 'none' ? 0 : current.openSpeed,
        easing: current.openEasing,
        step: elastic ? this.step : null,
        complete: F._afterZoomIn
      });
    },
    zoomOut: function zoomOut() {
      var current = F.current,
          effect = current.closeEffect,
          elastic = effect === 'elastic',
          endPos = {
        opacity: 0.1
      };

      if (elastic) {
        endPos = this.getOrigPosition();

        if (current.closeOpacity) {
          endPos.opacity = 0.1;
        }
      }

      F.wrap.animate(endPos, {
        duration: effect === 'none' ? 0 : current.closeSpeed,
        easing: current.closeEasing,
        step: elastic ? this.step : null,
        complete: F._afterZoomOut
      });
    },
    changeIn: function changeIn() {
      var current = F.current,
          effect = current.nextEffect,
          startPos = current.pos,
          endPos = {
        opacity: 1
      },
          direction = F.direction,
          distance = 200,
          field;
      startPos.opacity = 0.1;

      if (effect === 'elastic') {
        field = direction === 'down' || direction === 'up' ? 'top' : 'left';

        if (direction === 'down' || direction === 'right') {
          startPos[field] = getValue(getScalar(startPos[field]) - distance);
          endPos[field] = '+=' + distance + 'px';
        } else {
          startPos[field] = getValue(getScalar(startPos[field]) + distance);
          endPos[field] = '-=' + distance + 'px';
        }
      } // Workaround for http://bugs.jquery.com/ticket/12273


      if (effect === 'none') {
        F._afterZoomIn();
      } else {
        F.wrap.css(startPos).animate(endPos, {
          duration: current.nextSpeed,
          easing: current.nextEasing,
          complete: F._afterZoomIn
        });
      }
    },
    changeOut: function changeOut() {
      var previous = F.previous,
          effect = previous.prevEffect,
          endPos = {
        opacity: 0.1
      },
          direction = F.direction,
          distance = 200;

      if (effect === 'elastic') {
        endPos[direction === 'down' || direction === 'up' ? 'top' : 'left'] = (direction === 'up' || direction === 'left' ? '-' : '+') + '=' + distance + 'px';
      }

      previous.wrap.animate(endPos, {
        duration: effect === 'none' ? 0 : previous.prevSpeed,
        easing: previous.prevEasing,
        complete: function complete() {
          $(this).trigger('onReset').remove();
        }
      });
    }
  };
  /*
   *	Overlay helper
   */

  F.helpers.overlay = {
    defaults: {
      closeClick: true,
      // if true, fancyBox will be closed when user clicks on the overlay
      speedOut: 200,
      // duration of fadeOut animation
      showEarly: true,
      // indicates if should be opened immediately or wait until the content is ready
      css: {},
      // custom CSS properties
      locked: !isTouch,
      // if true, the content will be locked into overlay
      fixed: true // if false, the overlay CSS position property will not be set to "fixed"

    },
    overlay: null,
    // current handle
    fixed: false,
    // indicates if the overlay has position "fixed"
    el: $('html'),
    // element that contains "the lock"
    // Public methods
    create: function create(opts) {
      var parent;
      opts = $.extend({}, this.defaults, opts);

      if (this.overlay) {
        this.close();
      }

      parent = F.coming ? F.coming.parent : opts.parent;
      this.overlay = $('<div class="fancybox-overlay"></div>').appendTo(parent && parent.lenth ? parent : 'body');
      this.fixed = false;

      if (opts.fixed && F.defaults.fixed) {
        this.overlay.addClass('fancybox-overlay-fixed');
        this.fixed = true;
      }
    },
    open: function open(opts) {
      var that = this;
      opts = $.extend({}, this.defaults, opts);

      if (this.overlay) {
        this.overlay.unbind('.overlay').width('auto').height('auto');
      } else {
        this.create(opts);
      }

      if (!this.fixed) {
        W.bind('resize.overlay', $.proxy(this.update, this));
        this.update();
      }

      if (opts.closeClick) {
        this.overlay.bind('click.overlay', function (e) {
          if ($(e.target).hasClass('fancybox-overlay')) {
            if (F.isActive) {
              F.close();
            } else {
              that.close();
            }

            return false;
          }
        });
      }

      this.overlay.css(opts.css).show();
    },
    close: function close() {
      W.unbind('resize.overlay');

      if (this.el.hasClass('fancybox-lock')) {
        $('.fancybox-margin').removeClass('fancybox-margin');
        this.el.removeClass('fancybox-lock');
        W.scrollTop(this.scrollV).scrollLeft(this.scrollH);
      }

      $('.fancybox-overlay').remove().hide();
      $.extend(this, {
        overlay: null,
        fixed: false
      });
    },
    // Private, callbacks
    update: function update() {
      var width = '100%',
          offsetWidth; // Reset width/height so it will not mess

      this.overlay.width(width).height('100%'); // jQuery does not return reliable result for IE

      if (IE) {
        offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

        if (D.width() > offsetWidth) {
          width = D.width();
        }
      } else if (D.width() > W.width()) {
        width = D.width();
      }

      this.overlay.width(width).height(D.height());
    },
    // This is where we can manipulate DOM, because later it would cause iframes to reload
    onReady: function onReady(opts, obj) {
      var overlay = this.overlay;
      $('.fancybox-overlay').stop(true, true);

      if (!overlay) {
        this.create(opts);
      }

      if (opts.locked && this.fixed && obj.fixed) {
        obj.locked = this.overlay.append(obj.wrap);
        obj.fixed = false;
      }

      if (opts.showEarly === true) {
        this.beforeShow.apply(this, arguments);
      }
    },
    beforeShow: function beforeShow(opts, obj) {
      if (obj.locked && !this.el.hasClass('fancybox-lock')) {
        if (this.fixPosition !== false) {
          $('*').filter(function () {
            return $(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap");
          }).addClass('fancybox-margin');
        }

        this.el.addClass('fancybox-margin');
        this.scrollV = W.scrollTop();
        this.scrollH = W.scrollLeft();
        this.el.addClass('fancybox-lock');
        W.scrollTop(this.scrollV).scrollLeft(this.scrollH);
      }

      this.open(opts);
    },
    onUpdate: function onUpdate() {
      if (!this.fixed) {
        this.update();
      }
    },
    afterClose: function afterClose(opts) {
      // Remove overlay if exists and fancyBox is not opening
      // (e.g., it is not being open using afterClose callback)
      if (this.overlay && !F.coming) {
        this.overlay.fadeOut(opts.speedOut, $.proxy(this.close, this));
      }
    }
  };
  /*
   *	Title helper
   */

  F.helpers.title = {
    defaults: {
      type: 'float',
      // 'float', 'inside', 'outside' or 'over',
      position: 'bottom' // 'top' or 'bottom'

    },
    beforeShow: function beforeShow(opts) {
      var current = F.current,
          text = current.title,
          type = opts.type,
          title,
          target;

      if ($.isFunction(text)) {
        text = text.call(current.element, current);
      }

      if (!isString(text) || $.trim(text) === '') {
        return;
      }

      title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

      switch (type) {
        case 'inside':
          target = F.skin;
          break;

        case 'outside':
          target = F.wrap;
          break;

        case 'over':
          target = F.inner;
          break;

        default:
          // 'float'
          target = F.skin;
          title.appendTo('body');

          if (IE) {
            title.width(title.width());
          }

          title.wrapInner('<span class="child"></span>'); //Increase bottom margin so this title will also fit into viewport

          F.current.margin[2] += Math.abs(getScalar(title.css('margin-bottom')));
          break;
      }

      title[opts.position === 'top' ? 'prependTo' : 'appendTo'](target);
    }
  }; // jQuery plugin initialization

  $.fn.fancybox = function (options) {
    var index,
        that = $(this),
        selector = this.selector || '',
        run = function run(e) {
      var what = $(this).blur(),
          idx = index,
          relType,
          relVal;

      if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
        relType = options.groupAttr || 'data-fancybox-group';
        relVal = what.attr(relType);

        if (!relVal) {
          relType = 'rel';
          relVal = what.get(0)[relType];
        }

        if (relVal && relVal !== '' && relVal !== 'nofollow') {
          what = selector.length ? $(selector) : that;
          what = what.filter('[' + relType + '="' + relVal + '"]');
          idx = what.index(this);
        }

        options.index = idx; // Stop an event from bubbling if everything is fine

        if (F.open(what, options) !== false) {
          e.preventDefault();
        }
      }
    };

    options = options || {};
    index = options.index || 0;

    if (!selector || options.live === false) {
      that.unbind('click.fb-start').bind('click.fb-start', run);
    } else {
      D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
    }

    this.filter('[data-fancybox-start=1]').trigger('click');
    return this;
  }; // Tests that need a body at doc ready


  D.ready(function () {
    var w1, w2;

    if ($.scrollbarWidth === undefined) {
      // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
      $.scrollbarWidth = function () {
        var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
            child = parent.children(),
            width = child.innerWidth() - child.height(99).innerWidth();
        parent.remove();
        return width;
      };
    }

    if ($.support.fixedPosition === undefined) {
      $.support.fixedPosition = function () {
        var elem = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
            fixed = elem[0].offsetTop === 20 || elem[0].offsetTop === 15;
        elem.remove();
        return fixed;
      }();
    }

    $.extend(F.defaults, {
      scrollbarWidth: $.scrollbarWidth(),
      fixed: $.support.fixedPosition,
      parent: $('body')
    }); //Get real width of page scroll-bar

    w1 = $(window).width();
    H.addClass('fancybox-lock-test');
    w2 = $(window).width();
    H.removeClass('fancybox-lock-test');
    $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
  });
})(window, document, jQuery);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvbGFuZHNjYXBlL3NvdXJjZS9mYW5jeWJveC9qcXVlcnkuZmFuY3lib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFBRSxXQUFVLE1BQVYsRUFBa0IsUUFBbEIsRUFBNEIsQ0FBNUIsRUFBK0IsU0FBL0IsRUFBMEM7QUFDM0M7O0FBRUEsTUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQUQsQ0FBVDtBQUFBLE1BQ0MsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFELENBRE47QUFBQSxNQUVDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBRCxDQUZOO0FBQUEsTUFHQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQUYsR0FBYSxZQUFZO0FBQzVCLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxLQUFQLENBQWMsSUFBZCxFQUFvQixTQUFwQjtBQUNBLEdBTEY7QUFBQSxNQU1DLEVBQUUsR0FBSSxTQUFTLENBQUMsU0FBVixDQUFvQixLQUFwQixDQUEwQixPQUExQixDQU5QO0FBQUEsTUFPQyxTQUFTLEdBQUcsSUFQYjtBQUFBLE1BUUMsT0FBTyxHQUFJLFFBQVEsQ0FBQyxXQUFULEtBQXlCLFNBUnJDO0FBQUEsTUFVQyxPQUFPLEdBQUcsU0FBVixPQUFVLENBQVMsR0FBVCxFQUFjO0FBQ3ZCLFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFYLElBQTZCLEdBQUcsWUFBWSxDQUFuRDtBQUNBLEdBWkY7QUFBQSxNQWFDLFFBQVEsR0FBRyxTQUFYLFFBQVcsQ0FBUyxHQUFULEVBQWM7QUFDeEIsV0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUYsQ0FBTyxHQUFQLE1BQWdCLFFBQTlCO0FBQ0EsR0FmRjtBQUFBLE1BZ0JDLFlBQVksR0FBRyxTQUFmLFlBQWUs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UUFBbEQsQ0FBMkQsTUFBM0QsQ0FBWjtBQUFBLFlBQ0MsS0FBSyxHQUFLLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxTQUFSLEtBQXNCLEVBQXRCLElBQTRCLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxTQUFSLEtBQXNCLEVBRDdEO0FBR0EsUUFBQSxJQUFJLENBQUMsTUFBTDtBQUVBLGVBQU8sS0FBUDtBQUNBLE9BUDBCLEVBQTNCO0FBUUE7O0FBRUQsSUFBQSxDQUFDLENBQUMsTUFBRixDQUFTLENBQUMsQ0FBQyxRQUFYLEVBQXFCO0FBQ3BCLE1BQUEsY0FBYyxFQUFHLENBQUMsQ0FBQyxjQUFGLEVBREc7QUFFcEIsTUFBQSxLQUFLLEVBQUksQ0FBQyxDQUFDLE9BQUYsQ0FBVSxhQUZDO0FBR3BCLE1BQUEsTUFBTSxFQUFHLENBQUMsQ0FBQyxNQUFEO0FBSFUsS0FBckIsRUEzQmtCLENBaUNsQjs7QUFDQSxJQUFBLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsS0FBVixFQUFMO0FBRUEsSUFBQSxDQUFDLENBQUMsUUFBRixDQUFXLG9CQUFYO0FBRUEsSUFBQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLEtBQVYsRUFBTDtBQUVBLElBQUEsQ0FBQyxDQUFDLFdBQUYsQ0FBYyxvQkFBZDtBQUVBLElBQUEsQ0FBQyxDQUFDLDJEQUEyRCxFQUFFLEdBQUcsRUFBaEUsSUFBc0UsY0FBdkUsQ0FBRCxDQUF3RixRQUF4RixDQUFpRyxNQUFqRztBQUNBLEdBM0NEO0FBNkNBLENBcDlEQyxFQW85REEsTUFwOURBLEVBbzlEUSxRQXA5RFIsRUFvOURrQixNQXA5RGxCLENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiFcbiAqIGZhbmN5Qm94IC0galF1ZXJ5IFBsdWdpblxuICogdmVyc2lvbjogMi4xLjUgKEZyaSwgMTQgSnVuIDIwMTMpXG4gKiByZXF1aXJlcyBqUXVlcnkgdjEuNiBvciBsYXRlclxuICpcbiAqIEV4YW1wbGVzIGF0IGh0dHA6Ly9mYW5jeWFwcHMuY29tL2ZhbmN5Ym94L1xuICogTGljZW5zZTogd3d3LmZhbmN5YXBwcy5jb20vZmFuY3lib3gvI2xpY2Vuc2VcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMiBKYW5pcyBTa2FybmVsaXMgLSBqYW5pc0BmYW5jeWFwcHMuY29tXG4gKlxuICovXG5cbjsoZnVuY3Rpb24gKHdpbmRvdywgZG9jdW1lbnQsICQsIHVuZGVmaW5lZCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHR2YXIgSCA9ICQoXCJodG1sXCIpLFxuXHRcdFcgPSAkKHdpbmRvdyksXG5cdFx0RCA9ICQoZG9jdW1lbnQpLFxuXHRcdEYgPSAkLmZhbmN5Ym94ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ri5vcGVuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHR9LFxuXHRcdElFID0gIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL21zaWUvaSksXG5cdFx0ZGlkVXBkYXRlXHQ9IG51bGwsXG5cdFx0aXNUb3VjaFx0XHQ9IGRvY3VtZW50LmNyZWF0ZVRvdWNoICE9PSB1bmRlZmluZWQsXG5cblx0XHRpc1F1ZXJ5XHQ9IGZ1bmN0aW9uKG9iaikge1xuXHRcdFx0cmV0dXJuIG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkgJiYgb2JqIGluc3RhbmNlb2YgJDtcblx0XHR9LFxuXHRcdGlzU3RyaW5nID0gZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHRyZXR1cm4gc3RyICYmICQudHlwZShzdHIpID09PSBcInN0cmluZ1wiO1xuXHRcdH0sXG5cdFx0aXNQZXJjZW50YWdlID0gZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHRyZXR1cm4gaXNTdHJpbmcoc3RyKSAmJiBzdHIuaW5kZXhPZignJScpID4gMDtcblx0XHR9LFxuXHRcdGlzU2Nyb2xsYWJsZSA9IGZ1bmN0aW9uKGVsKSB7XG5cdFx0XHRyZXR1cm4gKGVsICYmICEoZWwuc3R5bGUub3ZlcmZsb3cgJiYgZWwuc3R5bGUub3ZlcmZsb3cgPT09ICdoaWRkZW4nKSAmJiAoKGVsLmNsaWVudFdpZHRoICYmIGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGgpIHx8IChlbC5jbGllbnRIZWlnaHQgJiYgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0KSkpO1xuXHRcdH0sXG5cdFx0Z2V0U2NhbGFyID0gZnVuY3Rpb24ob3JpZywgZGltKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBwYXJzZUludChvcmlnLCAxMCkgfHwgMDtcblxuXHRcdFx0aWYgKGRpbSAmJiBpc1BlcmNlbnRhZ2Uob3JpZykpIHtcblx0XHRcdFx0dmFsdWUgPSBGLmdldFZpZXdwb3J0KClbIGRpbSBdIC8gMTAwICogdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBNYXRoLmNlaWwodmFsdWUpO1xuXHRcdH0sXG5cdFx0Z2V0VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSwgZGltKSB7XG5cdFx0XHRyZXR1cm4gZ2V0U2NhbGFyKHZhbHVlLCBkaW0pICsgJ3B4Jztcblx0XHR9O1xuXG5cdCQuZXh0ZW5kKEYsIHtcblx0XHQvLyBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIGZhbmN5Qm94XG5cdFx0dmVyc2lvbjogJzIuMS41JyxcblxuXHRcdGRlZmF1bHRzOiB7XG5cdFx0XHRwYWRkaW5nIDogMTUsXG5cdFx0XHRtYXJnaW4gIDogMjAsXG5cblx0XHRcdHdpZHRoICAgICA6IDgwMCxcblx0XHRcdGhlaWdodCAgICA6IDYwMCxcblx0XHRcdG1pbldpZHRoICA6IDEwMCxcblx0XHRcdG1pbkhlaWdodCA6IDEwMCxcblx0XHRcdG1heFdpZHRoICA6IDk5OTksXG5cdFx0XHRtYXhIZWlnaHQgOiA5OTk5LFxuXHRcdFx0cGl4ZWxSYXRpbzogMSwgLy8gU2V0IHRvIDIgZm9yIHJldGluYSBkaXNwbGF5IHN1cHBvcnRcblxuXHRcdFx0YXV0b1NpemUgICA6IHRydWUsXG5cdFx0XHRhdXRvSGVpZ2h0IDogZmFsc2UsXG5cdFx0XHRhdXRvV2lkdGggIDogZmFsc2UsXG5cblx0XHRcdGF1dG9SZXNpemUgIDogdHJ1ZSxcblx0XHRcdGF1dG9DZW50ZXIgIDogIWlzVG91Y2gsXG5cdFx0XHRmaXRUb1ZpZXcgICA6IHRydWUsXG5cdFx0XHRhc3BlY3RSYXRpbyA6IGZhbHNlLFxuXHRcdFx0dG9wUmF0aW8gICAgOiAwLjUsXG5cdFx0XHRsZWZ0UmF0aW8gICA6IDAuNSxcblxuXHRcdFx0c2Nyb2xsaW5nIDogJ2F1dG8nLCAvLyAnYXV0bycsICd5ZXMnIG9yICdubydcblx0XHRcdHdyYXBDU1MgICA6ICcnLFxuXG5cdFx0XHRhcnJvd3MgICAgIDogdHJ1ZSxcblx0XHRcdGNsb3NlQnRuICAgOiB0cnVlLFxuXHRcdFx0Y2xvc2VDbGljayA6IGZhbHNlLFxuXHRcdFx0bmV4dENsaWNrICA6IGZhbHNlLFxuXHRcdFx0bW91c2VXaGVlbCA6IHRydWUsXG5cdFx0XHRhdXRvUGxheSAgIDogZmFsc2UsXG5cdFx0XHRwbGF5U3BlZWQgIDogMzAwMCxcblx0XHRcdHByZWxvYWQgICAgOiAzLFxuXHRcdFx0bW9kYWwgICAgICA6IGZhbHNlLFxuXHRcdFx0bG9vcCAgICAgICA6IHRydWUsXG5cblx0XHRcdGFqYXggIDoge1xuXHRcdFx0XHRkYXRhVHlwZSA6ICdodG1sJyxcblx0XHRcdFx0aGVhZGVycyAgOiB7ICdYLWZhbmN5Qm94JzogdHJ1ZSB9XG5cdFx0XHR9LFxuXHRcdFx0aWZyYW1lIDoge1xuXHRcdFx0XHRzY3JvbGxpbmcgOiAnYXV0bycsXG5cdFx0XHRcdHByZWxvYWQgICA6IHRydWVcblx0XHRcdH0sXG5cdFx0XHRzd2YgOiB7XG5cdFx0XHRcdHdtb2RlOiAndHJhbnNwYXJlbnQnLFxuXHRcdFx0XHRhbGxvd2Z1bGxzY3JlZW4gICA6ICd0cnVlJyxcblx0XHRcdFx0YWxsb3dzY3JpcHRhY2Nlc3MgOiAnYWx3YXlzJ1xuXHRcdFx0fSxcblxuXHRcdFx0a2V5cyAgOiB7XG5cdFx0XHRcdG5leHQgOiB7XG5cdFx0XHRcdFx0MTMgOiAnbGVmdCcsIC8vIGVudGVyXG5cdFx0XHRcdFx0MzQgOiAndXAnLCAgIC8vIHBhZ2UgZG93blxuXHRcdFx0XHRcdDM5IDogJ2xlZnQnLCAvLyByaWdodCBhcnJvd1xuXHRcdFx0XHRcdDQwIDogJ3VwJyAgICAvLyBkb3duIGFycm93XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHByZXYgOiB7XG5cdFx0XHRcdFx0OCAgOiAncmlnaHQnLCAgLy8gYmFja3NwYWNlXG5cdFx0XHRcdFx0MzMgOiAnZG93bicsICAgLy8gcGFnZSB1cFxuXHRcdFx0XHRcdDM3IDogJ3JpZ2h0JywgIC8vIGxlZnQgYXJyb3dcblx0XHRcdFx0XHQzOCA6ICdkb3duJyAgICAvLyB1cCBhcnJvd1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbG9zZSAgOiBbMjddLCAvLyBlc2NhcGUga2V5XG5cdFx0XHRcdHBsYXkgICA6IFszMl0sIC8vIHNwYWNlIC0gc3RhcnQvc3RvcCBzbGlkZXNob3dcblx0XHRcdFx0dG9nZ2xlIDogWzcwXSAgLy8gbGV0dGVyIFwiZlwiIC0gdG9nZ2xlIGZ1bGxzY3JlZW5cblx0XHRcdH0sXG5cblx0XHRcdGRpcmVjdGlvbiA6IHtcblx0XHRcdFx0bmV4dCA6ICdsZWZ0Jyxcblx0XHRcdFx0cHJldiA6ICdyaWdodCdcblx0XHRcdH0sXG5cblx0XHRcdHNjcm9sbE91dHNpZGUgIDogdHJ1ZSxcblxuXHRcdFx0Ly8gT3ZlcnJpZGUgc29tZSBwcm9wZXJ0aWVzXG5cdFx0XHRpbmRleCAgIDogMCxcblx0XHRcdHR5cGUgICAgOiBudWxsLFxuXHRcdFx0aHJlZiAgICA6IG51bGwsXG5cdFx0XHRjb250ZW50IDogbnVsbCxcblx0XHRcdHRpdGxlICAgOiBudWxsLFxuXG5cdFx0XHQvLyBIVE1MIHRlbXBsYXRlc1xuXHRcdFx0dHBsOiB7XG5cdFx0XHRcdHdyYXAgICAgIDogJzxkaXYgY2xhc3M9XCJmYW5jeWJveC13cmFwXCIgdGFiSW5kZXg9XCItMVwiPjxkaXYgY2xhc3M9XCJmYW5jeWJveC1za2luXCI+PGRpdiBjbGFzcz1cImZhbmN5Ym94LW91dGVyXCI+PGRpdiBjbGFzcz1cImZhbmN5Ym94LWlubmVyXCI+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+Jyxcblx0XHRcdFx0aW1hZ2UgICAgOiAnPGltZyBjbGFzcz1cImZhbmN5Ym94LWltYWdlXCIgc3JjPVwie2hyZWZ9XCIgYWx0PVwiXCIgLz4nLFxuXHRcdFx0XHRpZnJhbWUgICA6ICc8aWZyYW1lIGlkPVwiZmFuY3lib3gtZnJhbWV7cm5kfVwiIG5hbWU9XCJmYW5jeWJveC1mcmFtZXtybmR9XCIgY2xhc3M9XCJmYW5jeWJveC1pZnJhbWVcIiBmcmFtZWJvcmRlcj1cIjBcIiB2c3BhY2U9XCIwXCIgaHNwYWNlPVwiMFwiIHdlYmtpdEFsbG93RnVsbFNjcmVlbiBtb3phbGxvd2Z1bGxzY3JlZW4gYWxsb3dGdWxsU2NyZWVuJyArIChJRSA/ICcgYWxsb3d0cmFuc3BhcmVuY3k9XCJ0cnVlXCInIDogJycpICsgJz48L2lmcmFtZT4nLFxuXHRcdFx0XHRlcnJvciAgICA6ICc8cCBjbGFzcz1cImZhbmN5Ym94LWVycm9yXCI+VGhlIHJlcXVlc3RlZCBjb250ZW50IGNhbm5vdCBiZSBsb2FkZWQuPGJyLz5QbGVhc2UgdHJ5IGFnYWluIGxhdGVyLjwvcD4nLFxuXHRcdFx0XHRjbG9zZUJ0biA6ICc8YSB0aXRsZT1cIkNsb3NlXCIgY2xhc3M9XCJmYW5jeWJveC1pdGVtIGZhbmN5Ym94LWNsb3NlXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPjwvYT4nLFxuXHRcdFx0XHRuZXh0ICAgICA6ICc8YSB0aXRsZT1cIk5leHRcIiBjbGFzcz1cImZhbmN5Ym94LW5hdiBmYW5jeWJveC1uZXh0XCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPjxzcGFuPjwvc3Bhbj48L2E+Jyxcblx0XHRcdFx0cHJldiAgICAgOiAnPGEgdGl0bGU9XCJQcmV2aW91c1wiIGNsYXNzPVwiZmFuY3lib3gtbmF2IGZhbmN5Ym94LXByZXZcIiBocmVmPVwiamF2YXNjcmlwdDo7XCI+PHNwYW4+PC9zcGFuPjwvYT4nXG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBQcm9wZXJ0aWVzIGZvciBlYWNoIGFuaW1hdGlvbiB0eXBlXG5cdFx0XHQvLyBPcGVuaW5nIGZhbmN5Qm94XG5cdFx0XHRvcGVuRWZmZWN0ICA6ICdmYWRlJywgLy8gJ2VsYXN0aWMnLCAnZmFkZScgb3IgJ25vbmUnXG5cdFx0XHRvcGVuU3BlZWQgICA6IDI1MCxcblx0XHRcdG9wZW5FYXNpbmcgIDogJ3N3aW5nJyxcblx0XHRcdG9wZW5PcGFjaXR5IDogdHJ1ZSxcblx0XHRcdG9wZW5NZXRob2QgIDogJ3pvb21JbicsXG5cblx0XHRcdC8vIENsb3NpbmcgZmFuY3lCb3hcblx0XHRcdGNsb3NlRWZmZWN0ICA6ICdmYWRlJywgLy8gJ2VsYXN0aWMnLCAnZmFkZScgb3IgJ25vbmUnXG5cdFx0XHRjbG9zZVNwZWVkICAgOiAyNTAsXG5cdFx0XHRjbG9zZUVhc2luZyAgOiAnc3dpbmcnLFxuXHRcdFx0Y2xvc2VPcGFjaXR5IDogdHJ1ZSxcblx0XHRcdGNsb3NlTWV0aG9kICA6ICd6b29tT3V0JyxcblxuXHRcdFx0Ly8gQ2hhbmdpbmcgbmV4dCBnYWxsZXJ5IGl0ZW1cblx0XHRcdG5leHRFZmZlY3QgOiAnZWxhc3RpYycsIC8vICdlbGFzdGljJywgJ2ZhZGUnIG9yICdub25lJ1xuXHRcdFx0bmV4dFNwZWVkICA6IDI1MCxcblx0XHRcdG5leHRFYXNpbmcgOiAnc3dpbmcnLFxuXHRcdFx0bmV4dE1ldGhvZCA6ICdjaGFuZ2VJbicsXG5cblx0XHRcdC8vIENoYW5naW5nIHByZXZpb3VzIGdhbGxlcnkgaXRlbVxuXHRcdFx0cHJldkVmZmVjdCA6ICdlbGFzdGljJywgLy8gJ2VsYXN0aWMnLCAnZmFkZScgb3IgJ25vbmUnXG5cdFx0XHRwcmV2U3BlZWQgIDogMjUwLFxuXHRcdFx0cHJldkVhc2luZyA6ICdzd2luZycsXG5cdFx0XHRwcmV2TWV0aG9kIDogJ2NoYW5nZU91dCcsXG5cblx0XHRcdC8vIEVuYWJsZSBkZWZhdWx0IGhlbHBlcnNcblx0XHRcdGhlbHBlcnMgOiB7XG5cdFx0XHRcdG92ZXJsYXkgOiB0cnVlLFxuXHRcdFx0XHR0aXRsZSAgIDogdHJ1ZVxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbGJhY2tzXG5cdFx0XHRvbkNhbmNlbCAgICAgOiAkLm5vb3AsIC8vIElmIGNhbmNlbGluZ1xuXHRcdFx0YmVmb3JlTG9hZCAgIDogJC5ub29wLCAvLyBCZWZvcmUgbG9hZGluZ1xuXHRcdFx0YWZ0ZXJMb2FkICAgIDogJC5ub29wLCAvLyBBZnRlciBsb2FkaW5nXG5cdFx0XHRiZWZvcmVTaG93ICAgOiAkLm5vb3AsIC8vIEJlZm9yZSBjaGFuZ2luZyBpbiBjdXJyZW50IGl0ZW1cblx0XHRcdGFmdGVyU2hvdyAgICA6ICQubm9vcCwgLy8gQWZ0ZXIgb3BlbmluZ1xuXHRcdFx0YmVmb3JlQ2hhbmdlIDogJC5ub29wLCAvLyBCZWZvcmUgY2hhbmdpbmcgZ2FsbGVyeSBpdGVtXG5cdFx0XHRiZWZvcmVDbG9zZSAgOiAkLm5vb3AsIC8vIEJlZm9yZSBjbG9zaW5nXG5cdFx0XHRhZnRlckNsb3NlICAgOiAkLm5vb3AgIC8vIEFmdGVyIGNsb3Npbmdcblx0XHR9LFxuXG5cdFx0Ly9DdXJyZW50IHN0YXRlXG5cdFx0Z3JvdXAgICAgOiB7fSwgLy8gU2VsZWN0ZWQgZ3JvdXBcblx0XHRvcHRzICAgICA6IHt9LCAvLyBHcm91cCBvcHRpb25zXG5cdFx0cHJldmlvdXMgOiBudWxsLCAgLy8gUHJldmlvdXMgZWxlbWVudFxuXHRcdGNvbWluZyAgIDogbnVsbCwgIC8vIEVsZW1lbnQgYmVpbmcgbG9hZGVkXG5cdFx0Y3VycmVudCAgOiBudWxsLCAgLy8gQ3VycmVudGx5IGxvYWRlZCBlbGVtZW50XG5cdFx0aXNBY3RpdmUgOiBmYWxzZSwgLy8gSXMgYWN0aXZhdGVkXG5cdFx0aXNPcGVuICAgOiBmYWxzZSwgLy8gSXMgY3VycmVudGx5IG9wZW5cblx0XHRpc09wZW5lZCA6IGZhbHNlLCAvLyBIYXZlIGJlZW4gZnVsbHkgb3BlbmVkIGF0IGxlYXN0IG9uY2VcblxuXHRcdHdyYXAgIDogbnVsbCxcblx0XHRza2luICA6IG51bGwsXG5cdFx0b3V0ZXIgOiBudWxsLFxuXHRcdGlubmVyIDogbnVsbCxcblxuXHRcdHBsYXllciA6IHtcblx0XHRcdHRpbWVyICAgIDogbnVsbCxcblx0XHRcdGlzQWN0aXZlIDogZmFsc2Vcblx0XHR9LFxuXG5cdFx0Ly8gTG9hZGVyc1xuXHRcdGFqYXhMb2FkICAgOiBudWxsLFxuXHRcdGltZ1ByZWxvYWQgOiBudWxsLFxuXG5cdFx0Ly8gU29tZSBjb2xsZWN0aW9uc1xuXHRcdHRyYW5zaXRpb25zIDoge30sXG5cdFx0aGVscGVycyAgICAgOiB7fSxcblxuXHRcdC8qXG5cdFx0ICpcdFN0YXRpYyBtZXRob2RzXG5cdFx0ICovXG5cblx0XHRvcGVuOiBmdW5jdGlvbiAoZ3JvdXAsIG9wdHMpIHtcblx0XHRcdGlmICghZ3JvdXApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoISQuaXNQbGFpbk9iamVjdChvcHRzKSkge1xuXHRcdFx0XHRvcHRzID0ge307XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsb3NlIGlmIGFscmVhZHkgYWN0aXZlXG5cdFx0XHRpZiAoZmFsc2UgPT09IEYuY2xvc2UodHJ1ZSkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBOb3JtYWxpemUgZ3JvdXBcblx0XHRcdGlmICghJC5pc0FycmF5KGdyb3VwKSkge1xuXHRcdFx0XHRncm91cCA9IGlzUXVlcnkoZ3JvdXApID8gJChncm91cCkuZ2V0KCkgOiBbZ3JvdXBdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZWNoZWNrIGlmIHRoZSB0eXBlIG9mIGVhY2ggZWxlbWVudCBpcyBgb2JqZWN0YCBhbmQgc2V0IGNvbnRlbnQgdHlwZSAoaW1hZ2UsIGFqYXgsIGV0Yylcblx0XHRcdCQuZWFjaChncm91cCwgZnVuY3Rpb24oaSwgZWxlbWVudCkge1xuXHRcdFx0XHR2YXIgb2JqID0ge30sXG5cdFx0XHRcdFx0aHJlZixcblx0XHRcdFx0XHR0aXRsZSxcblx0XHRcdFx0XHRjb250ZW50LFxuXHRcdFx0XHRcdHR5cGUsXG5cdFx0XHRcdFx0cmV6LFxuXHRcdFx0XHRcdGhyZWZQYXJ0cyxcblx0XHRcdFx0XHRzZWxlY3RvcjtcblxuXHRcdFx0XHRpZiAoJC50eXBlKGVsZW1lbnQpID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgaXMgRE9NIGVsZW1lbnRcblx0XHRcdFx0XHRpZiAoZWxlbWVudC5ub2RlVHlwZSkge1xuXHRcdFx0XHRcdFx0ZWxlbWVudCA9ICQoZWxlbWVudCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGlzUXVlcnkoZWxlbWVudCkpIHtcblx0XHRcdFx0XHRcdG9iaiA9IHtcblx0XHRcdFx0XHRcdFx0aHJlZiAgICA6IGVsZW1lbnQuZGF0YSgnZmFuY3lib3gtaHJlZicpIHx8IGVsZW1lbnQuYXR0cignaHJlZicpLFxuXHRcdFx0XHRcdFx0XHR0aXRsZSAgIDogJCgnPGRpdi8+JykudGV4dCggZWxlbWVudC5kYXRhKCdmYW5jeWJveC10aXRsZScpIHx8IGVsZW1lbnQuYXR0cigndGl0bGUnKSApLmh0bWwoKSxcblx0XHRcdFx0XHRcdFx0aXNEb20gICA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQgOiBlbGVtZW50XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRpZiAoJC5tZXRhZGF0YSkge1xuXHRcdFx0XHRcdFx0XHQkLmV4dGVuZCh0cnVlLCBvYmosIGVsZW1lbnQubWV0YWRhdGEoKSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0b2JqID0gZWxlbWVudDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRocmVmICA9IG9wdHMuaHJlZiAgfHwgb2JqLmhyZWYgfHwgKGlzU3RyaW5nKGVsZW1lbnQpID8gZWxlbWVudCA6IG51bGwpO1xuXHRcdFx0XHR0aXRsZSA9IG9wdHMudGl0bGUgIT09IHVuZGVmaW5lZCA/IG9wdHMudGl0bGUgOiBvYmoudGl0bGUgfHwgJyc7XG5cblx0XHRcdFx0Y29udGVudCA9IG9wdHMuY29udGVudCB8fCBvYmouY29udGVudDtcblx0XHRcdFx0dHlwZSAgICA9IGNvbnRlbnQgPyAnaHRtbCcgOiAob3B0cy50eXBlICB8fCBvYmoudHlwZSk7XG5cblx0XHRcdFx0aWYgKCF0eXBlICYmIG9iai5pc0RvbSkge1xuXHRcdFx0XHRcdHR5cGUgPSBlbGVtZW50LmRhdGEoJ2ZhbmN5Ym94LXR5cGUnKTtcblxuXHRcdFx0XHRcdGlmICghdHlwZSkge1xuXHRcdFx0XHRcdFx0cmV6ICA9IGVsZW1lbnQucHJvcCgnY2xhc3MnKS5tYXRjaCgvZmFuY3lib3hcXC4oXFx3KykvKTtcblx0XHRcdFx0XHRcdHR5cGUgPSByZXogPyByZXpbMV0gOiBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc1N0cmluZyhocmVmKSkge1xuXHRcdFx0XHRcdC8vIFRyeSB0byBndWVzcyB0aGUgY29udGVudCB0eXBlXG5cdFx0XHRcdFx0aWYgKCF0eXBlKSB7XG5cdFx0XHRcdFx0XHRpZiAoRi5pc0ltYWdlKGhyZWYpKSB7XG5cdFx0XHRcdFx0XHRcdHR5cGUgPSAnaW1hZ2UnO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKEYuaXNTV0YoaHJlZikpIHtcblx0XHRcdFx0XHRcdFx0dHlwZSA9ICdzd2YnO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGhyZWYuY2hhckF0KDApID09PSAnIycpIHtcblx0XHRcdFx0XHRcdFx0dHlwZSA9ICdpbmxpbmUnO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGlzU3RyaW5nKGVsZW1lbnQpKSB7XG5cdFx0XHRcdFx0XHRcdHR5cGUgICAgPSAnaHRtbCc7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQgPSBlbGVtZW50O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFNwbGl0IHVybCBpbnRvIHR3byBwaWVjZXMgd2l0aCBzb3VyY2UgdXJsIGFuZCBjb250ZW50IHNlbGVjdG9yLCBlLmcsXG5cdFx0XHRcdFx0Ly8gXCIvbXlwYWdlLmh0bWwgI215X2lkXCIgd2lsbCBsb2FkIFwiL215cGFnZS5odG1sXCIgYW5kIGRpc3BsYXkgZWxlbWVudCBoYXZpbmcgaWQgXCJteV9pZFwiXG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdhamF4Jykge1xuXHRcdFx0XHRcdFx0aHJlZlBhcnRzID0gaHJlZi5zcGxpdCgvXFxzKy8sIDIpO1xuXHRcdFx0XHRcdFx0aHJlZiAgICAgID0gaHJlZlBhcnRzLnNoaWZ0KCk7XG5cdFx0XHRcdFx0XHRzZWxlY3RvciAgPSBocmVmUGFydHMuc2hpZnQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIWNvbnRlbnQpIHtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ2lubGluZScpIHtcblx0XHRcdFx0XHRcdGlmIChocmVmKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRlbnQgPSAkKCBpc1N0cmluZyhocmVmKSA/IGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpIDogaHJlZiApOyAvL3N0cmlwIGZvciBpZTdcblxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChvYmouaXNEb20pIHtcblx0XHRcdFx0XHRcdFx0Y29udGVudCA9IGVsZW1lbnQ7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdodG1sJykge1xuXHRcdFx0XHRcdFx0Y29udGVudCA9IGhyZWY7XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKCF0eXBlICYmICFocmVmICYmIG9iai5pc0RvbSkge1xuXHRcdFx0XHRcdFx0dHlwZSAgICA9ICdpbmxpbmUnO1xuXHRcdFx0XHRcdFx0Y29udGVudCA9IGVsZW1lbnQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0JC5leHRlbmQob2JqLCB7XG5cdFx0XHRcdFx0aHJlZiAgICAgOiBocmVmLFxuXHRcdFx0XHRcdHR5cGUgICAgIDogdHlwZSxcblx0XHRcdFx0XHRjb250ZW50ICA6IGNvbnRlbnQsXG5cdFx0XHRcdFx0dGl0bGUgICAgOiB0aXRsZSxcblx0XHRcdFx0XHRzZWxlY3RvciA6IHNlbGVjdG9yXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGdyb3VwWyBpIF0gPSBvYmo7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gRXh0ZW5kIHRoZSBkZWZhdWx0c1xuXHRcdFx0Ri5vcHRzID0gJC5leHRlbmQodHJ1ZSwge30sIEYuZGVmYXVsdHMsIG9wdHMpO1xuXG5cdFx0XHQvLyBBbGwgb3B0aW9ucyBhcmUgbWVyZ2VkIHJlY3Vyc2l2ZSBleGNlcHQga2V5c1xuXHRcdFx0aWYgKG9wdHMua2V5cyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdEYub3B0cy5rZXlzID0gb3B0cy5rZXlzID8gJC5leHRlbmQoe30sIEYuZGVmYXVsdHMua2V5cywgb3B0cy5rZXlzKSA6IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRGLmdyb3VwID0gZ3JvdXA7XG5cblx0XHRcdHJldHVybiBGLl9zdGFydChGLm9wdHMuaW5kZXgpO1xuXHRcdH0sXG5cblx0XHQvLyBDYW5jZWwgaW1hZ2UgbG9hZGluZyBvciBhYm9ydCBhamF4IHJlcXVlc3Rcblx0XHRjYW5jZWw6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjb21pbmcgPSBGLmNvbWluZztcblxuXHRcdFx0aWYgKGNvbWluZyAmJiBmYWxzZSA9PT0gRi50cmlnZ2VyKCdvbkNhbmNlbCcpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ri5oaWRlTG9hZGluZygpO1xuXG5cdFx0XHRpZiAoIWNvbWluZykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChGLmFqYXhMb2FkKSB7XG5cdFx0XHRcdEYuYWpheExvYWQuYWJvcnQoKTtcblx0XHRcdH1cblxuXHRcdFx0Ri5hamF4TG9hZCA9IG51bGw7XG5cblx0XHRcdGlmIChGLmltZ1ByZWxvYWQpIHtcblx0XHRcdFx0Ri5pbWdQcmVsb2FkLm9ubG9hZCA9IEYuaW1nUHJlbG9hZC5vbmVycm9yID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNvbWluZy53cmFwKSB7XG5cdFx0XHRcdGNvbWluZy53cmFwLnN0b3AodHJ1ZSwgdHJ1ZSkudHJpZ2dlcignb25SZXNldCcpLnJlbW92ZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRGLmNvbWluZyA9IG51bGw7XG5cblx0XHRcdC8vIElmIHRoZSBmaXJzdCBpdGVtIGhhcyBiZWVuIGNhbmNlbGVkLCB0aGVuIGNsZWFyIGV2ZXJ5dGhpbmdcblx0XHRcdGlmICghRi5jdXJyZW50KSB7XG5cdFx0XHRcdEYuX2FmdGVyWm9vbU91dCggY29taW5nICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIFN0YXJ0IGNsb3NpbmcgYW5pbWF0aW9uIGlmIGlzIG9wZW47IHJlbW92ZSBpbW1lZGlhdGVseSBpZiBvcGVuaW5nL2Nsb3Npbmdcblx0XHRjbG9zZTogZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRGLmNhbmNlbCgpO1xuXG5cdFx0XHRpZiAoZmFsc2UgPT09IEYudHJpZ2dlcignYmVmb3JlQ2xvc2UnKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdEYudW5iaW5kRXZlbnRzKCk7XG5cblx0XHRcdGlmICghRi5pc0FjdGl2ZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICghRi5pc09wZW4gfHwgZXZlbnQgPT09IHRydWUpIHtcblx0XHRcdFx0JCgnLmZhbmN5Ym94LXdyYXAnKS5zdG9wKHRydWUpLnRyaWdnZXIoJ29uUmVzZXQnKS5yZW1vdmUoKTtcblxuXHRcdFx0XHRGLl9hZnRlclpvb21PdXQoKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ri5pc09wZW4gPSBGLmlzT3BlbmVkID0gZmFsc2U7XG5cdFx0XHRcdEYuaXNDbG9zaW5nID0gdHJ1ZTtcblxuXHRcdFx0XHQkKCcuZmFuY3lib3gtaXRlbSwgLmZhbmN5Ym94LW5hdicpLnJlbW92ZSgpO1xuXG5cdFx0XHRcdEYud3JhcC5zdG9wKHRydWUsIHRydWUpLnJlbW92ZUNsYXNzKCdmYW5jeWJveC1vcGVuZWQnKTtcblxuXHRcdFx0XHRGLnRyYW5zaXRpb25zWyBGLmN1cnJlbnQuY2xvc2VNZXRob2QgXSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBNYW5hZ2Ugc2xpZGVzaG93OlxuXHRcdC8vICAgJC5mYW5jeWJveC5wbGF5KCk7IC0gdG9nZ2xlIHNsaWRlc2hvd1xuXHRcdC8vICAgJC5mYW5jeWJveC5wbGF5KCB0cnVlICk7IC0gc3RhcnRcblx0XHQvLyAgICQuZmFuY3lib3gucGxheSggZmFsc2UgKTsgLSBzdG9wXG5cdFx0cGxheTogZnVuY3Rpb24gKCBhY3Rpb24gKSB7XG5cdFx0XHR2YXIgY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KEYucGxheWVyLnRpbWVyKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGNsZWFyKCk7XG5cblx0XHRcdFx0XHRpZiAoRi5jdXJyZW50ICYmIEYucGxheWVyLmlzQWN0aXZlKSB7XG5cdFx0XHRcdFx0XHRGLnBsYXllci50aW1lciA9IHNldFRpbWVvdXQoRi5uZXh0LCBGLmN1cnJlbnQucGxheVNwZWVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHN0b3AgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Y2xlYXIoKTtcblxuXHRcdFx0XHRcdEQudW5iaW5kKCcucGxheWVyJyk7XG5cblx0XHRcdFx0XHRGLnBsYXllci5pc0FjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0Ri50cmlnZ2VyKCdvblBsYXlFbmQnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c3RhcnQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKEYuY3VycmVudCAmJiAoRi5jdXJyZW50Lmxvb3AgfHwgRi5jdXJyZW50LmluZGV4IDwgRi5ncm91cC5sZW5ndGggLSAxKSkge1xuXHRcdFx0XHRcdFx0Ri5wbGF5ZXIuaXNBY3RpdmUgPSB0cnVlO1xuXG5cdFx0XHRcdFx0XHRELmJpbmQoe1xuXHRcdFx0XHRcdFx0XHQnb25DYW5jZWwucGxheWVyIGJlZm9yZUNsb3NlLnBsYXllcicgOiBzdG9wLFxuXHRcdFx0XHRcdFx0XHQnb25VcGRhdGUucGxheWVyJyAgIDogc2V0LFxuXHRcdFx0XHRcdFx0XHQnYmVmb3JlTG9hZC5wbGF5ZXInIDogY2xlYXJcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRzZXQoKTtcblxuXHRcdFx0XHRcdFx0Ri50cmlnZ2VyKCdvblBsYXlTdGFydCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblxuXHRcdFx0aWYgKGFjdGlvbiA9PT0gdHJ1ZSB8fCAoIUYucGxheWVyLmlzQWN0aXZlICYmIGFjdGlvbiAhPT0gZmFsc2UpKSB7XG5cdFx0XHRcdHN0YXJ0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdG9wKCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE5hdmlnYXRlIHRvIG5leHQgZ2FsbGVyeSBpdGVtXG5cdFx0bmV4dDogZnVuY3Rpb24gKCBkaXJlY3Rpb24gKSB7XG5cdFx0XHR2YXIgY3VycmVudCA9IEYuY3VycmVudDtcblxuXHRcdFx0aWYgKGN1cnJlbnQpIHtcblx0XHRcdFx0aWYgKCFpc1N0cmluZyhkaXJlY3Rpb24pKSB7XG5cdFx0XHRcdFx0ZGlyZWN0aW9uID0gY3VycmVudC5kaXJlY3Rpb24ubmV4dDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdEYuanVtcHRvKGN1cnJlbnQuaW5kZXggKyAxLCBkaXJlY3Rpb24sICduZXh0Jyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE5hdmlnYXRlIHRvIHByZXZpb3VzIGdhbGxlcnkgaXRlbVxuXHRcdHByZXY6IGZ1bmN0aW9uICggZGlyZWN0aW9uICkge1xuXHRcdFx0dmFyIGN1cnJlbnQgPSBGLmN1cnJlbnQ7XG5cblx0XHRcdGlmIChjdXJyZW50KSB7XG5cdFx0XHRcdGlmICghaXNTdHJpbmcoZGlyZWN0aW9uKSkge1xuXHRcdFx0XHRcdGRpcmVjdGlvbiA9IGN1cnJlbnQuZGlyZWN0aW9uLnByZXY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRGLmp1bXB0byhjdXJyZW50LmluZGV4IC0gMSwgZGlyZWN0aW9uLCAncHJldicpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBOYXZpZ2F0ZSB0byBnYWxsZXJ5IGl0ZW0gYnkgaW5kZXhcblx0XHRqdW1wdG86IGZ1bmN0aW9uICggaW5kZXgsIGRpcmVjdGlvbiwgcm91dGVyICkge1xuXHRcdFx0dmFyIGN1cnJlbnQgPSBGLmN1cnJlbnQ7XG5cblx0XHRcdGlmICghY3VycmVudCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGluZGV4ID0gZ2V0U2NhbGFyKGluZGV4KTtcblxuXHRcdFx0Ri5kaXJlY3Rpb24gPSBkaXJlY3Rpb24gfHwgY3VycmVudC5kaXJlY3Rpb25bIChpbmRleCA+PSBjdXJyZW50LmluZGV4ID8gJ25leHQnIDogJ3ByZXYnKSBdO1xuXHRcdFx0Ri5yb3V0ZXIgICAgPSByb3V0ZXIgfHwgJ2p1bXB0byc7XG5cblx0XHRcdGlmIChjdXJyZW50Lmxvb3ApIHtcblx0XHRcdFx0aWYgKGluZGV4IDwgMCkge1xuXHRcdFx0XHRcdGluZGV4ID0gY3VycmVudC5ncm91cC5sZW5ndGggKyAoaW5kZXggJSBjdXJyZW50Lmdyb3VwLmxlbmd0aCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpbmRleCA9IGluZGV4ICUgY3VycmVudC5ncm91cC5sZW5ndGg7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjdXJyZW50Lmdyb3VwWyBpbmRleCBdICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Ri5jYW5jZWwoKTtcblxuXHRcdFx0XHRGLl9zdGFydChpbmRleCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIENlbnRlciBpbnNpZGUgdmlld3BvcnQgYW5kIHRvZ2dsZSBwb3NpdGlvbiB0eXBlIHRvIGZpeGVkIG9yIGFic29sdXRlIGlmIG5lZWRlZFxuXHRcdHJlcG9zaXRpb246IGZ1bmN0aW9uIChlLCBvbmx5QWJzb2x1dGUpIHtcblx0XHRcdHZhciBjdXJyZW50ID0gRi5jdXJyZW50LFxuXHRcdFx0XHR3cmFwICAgID0gY3VycmVudCA/IGN1cnJlbnQud3JhcCA6IG51bGwsXG5cdFx0XHRcdHBvcztcblxuXHRcdFx0aWYgKHdyYXApIHtcblx0XHRcdFx0cG9zID0gRi5fZ2V0UG9zaXRpb24ob25seUFic29sdXRlKTtcblxuXHRcdFx0XHRpZiAoZSAmJiBlLnR5cGUgPT09ICdzY3JvbGwnKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHBvcy5wb3NpdGlvbjtcblxuXHRcdFx0XHRcdHdyYXAuc3RvcCh0cnVlLCB0cnVlKS5hbmltYXRlKHBvcywgMjAwKTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHdyYXAuY3NzKHBvcyk7XG5cblx0XHRcdFx0XHRjdXJyZW50LnBvcyA9ICQuZXh0ZW5kKHt9LCBjdXJyZW50LmRpbSwgcG9zKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgdHlwZSA9IChlICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQudHlwZSksXG5cdFx0XHRcdGFueXdheSA9ICF0eXBlIHx8IHR5cGUgPT09ICdvcmllbnRhdGlvbmNoYW5nZSc7XG5cblx0XHRcdGlmIChhbnl3YXkpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KGRpZFVwZGF0ZSk7XG5cblx0XHRcdFx0ZGlkVXBkYXRlID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFGLmlzT3BlbiB8fCBkaWRVcGRhdGUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRkaWRVcGRhdGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgY3VycmVudCA9IEYuY3VycmVudDtcblxuXHRcdFx0XHRpZiAoIWN1cnJlbnQgfHwgRi5pc0Nsb3NpbmcpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRGLndyYXAucmVtb3ZlQ2xhc3MoJ2ZhbmN5Ym94LXRtcCcpO1xuXG5cdFx0XHRcdGlmIChhbnl3YXkgfHwgdHlwZSA9PT0gJ2xvYWQnIHx8ICh0eXBlID09PSAncmVzaXplJyAmJiBjdXJyZW50LmF1dG9SZXNpemUpKSB7XG5cdFx0XHRcdFx0Ri5fc2V0RGltZW5zaW9uKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoISh0eXBlID09PSAnc2Nyb2xsJyAmJiBjdXJyZW50LmNhblNocmluaykpIHtcblx0XHRcdFx0XHRGLnJlcG9zaXRpb24oZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRGLnRyaWdnZXIoJ29uVXBkYXRlJyk7XG5cblx0XHRcdFx0ZGlkVXBkYXRlID0gbnVsbDtcblxuXHRcdFx0fSwgKGFueXdheSAmJiAhaXNUb3VjaCA/IDAgOiAzMDApKTtcblx0XHR9LFxuXG5cdFx0Ly8gU2hyaW5rIGNvbnRlbnQgdG8gZml0IGluc2lkZSB2aWV3cG9ydCBvciByZXN0b3JlIGlmIHJlc2l6ZWRcblx0XHR0b2dnbGU6IGZ1bmN0aW9uICggYWN0aW9uICkge1xuXHRcdFx0aWYgKEYuaXNPcGVuKSB7XG5cdFx0XHRcdEYuY3VycmVudC5maXRUb1ZpZXcgPSAkLnR5cGUoYWN0aW9uKSA9PT0gXCJib29sZWFuXCIgPyBhY3Rpb24gOiAhRi5jdXJyZW50LmZpdFRvVmlldztcblxuXHRcdFx0XHQvLyBIZWxwIGJyb3dzZXIgdG8gcmVzdG9yZSBkb2N1bWVudCBkaW1lbnNpb25zXG5cdFx0XHRcdGlmIChpc1RvdWNoKSB7XG5cdFx0XHRcdFx0Ri53cmFwLnJlbW92ZUF0dHIoJ3N0eWxlJykuYWRkQ2xhc3MoJ2ZhbmN5Ym94LXRtcCcpO1xuXG5cdFx0XHRcdFx0Ri50cmlnZ2VyKCdvblVwZGF0ZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ri51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0aGlkZUxvYWRpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRcdEQudW5iaW5kKCcubG9hZGluZycpO1xuXG5cdFx0XHQkKCcjZmFuY3lib3gtbG9hZGluZycpLnJlbW92ZSgpO1xuXHRcdH0sXG5cblx0XHRzaG93TG9hZGluZzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGVsLCB2aWV3cG9ydDtcblxuXHRcdFx0Ri5oaWRlTG9hZGluZygpO1xuXG5cdFx0XHRlbCA9ICQoJzxkaXYgaWQ9XCJmYW5jeWJveC1sb2FkaW5nXCI+PGRpdj48L2Rpdj48L2Rpdj4nKS5jbGljayhGLmNhbmNlbCkuYXBwZW5kVG8oJ2JvZHknKTtcblxuXHRcdFx0Ly8gSWYgdXNlciB3aWxsIHByZXNzIHRoZSBlc2NhcGUtYnV0dG9uLCB0aGUgcmVxdWVzdCB3aWxsIGJlIGNhbmNlbGVkXG5cdFx0XHRELmJpbmQoJ2tleWRvd24ubG9hZGluZycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0aWYgKChlLndoaWNoIHx8IGUua2V5Q29kZSkgPT09IDI3KSB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0Ri5jYW5jZWwoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmICghRi5kZWZhdWx0cy5maXhlZCkge1xuXHRcdFx0XHR2aWV3cG9ydCA9IEYuZ2V0Vmlld3BvcnQoKTtcblxuXHRcdFx0XHRlbC5jc3Moe1xuXHRcdFx0XHRcdHBvc2l0aW9uIDogJ2Fic29sdXRlJyxcblx0XHRcdFx0XHR0b3AgIDogKHZpZXdwb3J0LmggKiAwLjUpICsgdmlld3BvcnQueSxcblx0XHRcdFx0XHRsZWZ0IDogKHZpZXdwb3J0LncgKiAwLjUpICsgdmlld3BvcnQueFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Ri50cmlnZ2VyKCdvbkxvYWRpbmcnKTtcblx0XHR9LFxuXG5cdFx0Z2V0Vmlld3BvcnQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBsb2NrZWQgPSAoRi5jdXJyZW50ICYmIEYuY3VycmVudC5sb2NrZWQpIHx8IGZhbHNlLFxuXHRcdFx0XHRyZXogICAgPSB7XG5cdFx0XHRcdFx0eDogVy5zY3JvbGxMZWZ0KCksXG5cdFx0XHRcdFx0eTogVy5zY3JvbGxUb3AoKVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRpZiAobG9ja2VkICYmIGxvY2tlZC5sZW5ndGgpIHtcblx0XHRcdFx0cmV6LncgPSBsb2NrZWRbMF0uY2xpZW50V2lkdGg7XG5cdFx0XHRcdHJlei5oID0gbG9ja2VkWzBdLmNsaWVudEhlaWdodDtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gU2VlIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzY3MjRcblx0XHRcdFx0cmV6LncgPSBpc1RvdWNoICYmIHdpbmRvdy5pbm5lcldpZHRoICA/IHdpbmRvdy5pbm5lcldpZHRoICA6IFcud2lkdGgoKTtcblx0XHRcdFx0cmV6LmggPSBpc1RvdWNoICYmIHdpbmRvdy5pbm5lckhlaWdodCA/IHdpbmRvdy5pbm5lckhlaWdodCA6IFcuaGVpZ2h0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXo7XG5cdFx0fSxcblxuXHRcdC8vIFVuYmluZCB0aGUga2V5Ym9hcmQgLyBjbGlja2luZyBhY3Rpb25zXG5cdFx0dW5iaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoRi53cmFwICYmIGlzUXVlcnkoRi53cmFwKSkge1xuXHRcdFx0XHRGLndyYXAudW5iaW5kKCcuZmInKTtcblx0XHRcdH1cblxuXHRcdFx0RC51bmJpbmQoJy5mYicpO1xuXHRcdFx0Vy51bmJpbmQoJy5mYicpO1xuXHRcdH0sXG5cblx0XHRiaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY3VycmVudCA9IEYuY3VycmVudCxcblx0XHRcdFx0a2V5cztcblxuXHRcdFx0aWYgKCFjdXJyZW50KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hhbmdpbmcgZG9jdW1lbnQgaGVpZ2h0IG9uIGlPUyBkZXZpY2VzIHRyaWdnZXJzIGEgJ3Jlc2l6ZScgZXZlbnQsXG5cdFx0XHQvLyB0aGF0IGNhbiBjaGFuZ2UgZG9jdW1lbnQgaGVpZ2h0Li4uIHJlcGVhdGluZyBpbmZpbml0ZWx5XG5cdFx0XHRXLmJpbmQoJ29yaWVudGF0aW9uY2hhbmdlLmZiJyArIChpc1RvdWNoID8gJycgOiAnIHJlc2l6ZS5mYicpICsgKGN1cnJlbnQuYXV0b0NlbnRlciAmJiAhY3VycmVudC5sb2NrZWQgPyAnIHNjcm9sbC5mYicgOiAnJyksIEYudXBkYXRlKTtcblxuXHRcdFx0a2V5cyA9IGN1cnJlbnQua2V5cztcblxuXHRcdFx0aWYgKGtleXMpIHtcblx0XHRcdFx0RC5iaW5kKCdrZXlkb3duLmZiJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHR2YXIgY29kZSAgID0gZS53aGljaCB8fCBlLmtleUNvZGUsXG5cdFx0XHRcdFx0XHR0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cblx0XHRcdFx0XHQvLyBTa2lwIGVzYyBrZXkgaWYgbG9hZGluZywgYmVjYXVzZSBzaG93TG9hZGluZyB3aWxsIGNhbmNlbCBwcmVsb2FkaW5nXG5cdFx0XHRcdFx0aWYgKGNvZGUgPT09IDI3ICYmIEYuY29taW5nKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gSWdub3JlIGtleSBjb21iaW5hdGlvbnMgYW5kIGtleSBldmVudHMgd2l0aGluIGZvcm0gZWxlbWVudHNcblx0XHRcdFx0XHRpZiAoIWUuY3RybEtleSAmJiAhZS5hbHRLZXkgJiYgIWUuc2hpZnRLZXkgJiYgIWUubWV0YUtleSAmJiAhKHRhcmdldCAmJiAodGFyZ2V0LnR5cGUgfHwgJCh0YXJnZXQpLmlzKCdbY29udGVudGVkaXRhYmxlXScpKSkpIHtcblx0XHRcdFx0XHRcdCQuZWFjaChrZXlzLCBmdW5jdGlvbihpLCB2YWwpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGN1cnJlbnQuZ3JvdXAubGVuZ3RoID4gMSAmJiB2YWxbIGNvZGUgXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0RlsgaSBdKCB2YWxbIGNvZGUgXSApO1xuXG5cdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICgkLmluQXJyYXkoY29kZSwgdmFsKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0RlsgaSBdICgpO1xuXG5cdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCQuZm4ubW91c2V3aGVlbCAmJiBjdXJyZW50Lm1vdXNlV2hlZWwpIHtcblx0XHRcdFx0Ri53cmFwLmJpbmQoJ21vdXNld2hlZWwuZmInLCBmdW5jdGlvbiAoZSwgZGVsdGEsIGRlbHRhWCwgZGVsdGFZKSB7XG5cdFx0XHRcdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IG51bGwsXG5cdFx0XHRcdFx0XHRwYXJlbnQgPSAkKHRhcmdldCksXG5cdFx0XHRcdFx0XHRjYW5TY3JvbGwgPSBmYWxzZTtcblxuXHRcdFx0XHRcdHdoaWxlIChwYXJlbnQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRpZiAoY2FuU2Nyb2xsIHx8IHBhcmVudC5pcygnLmZhbmN5Ym94LXNraW4nKSB8fCBwYXJlbnQuaXMoJy5mYW5jeWJveC13cmFwJykpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNhblNjcm9sbCA9IGlzU2Nyb2xsYWJsZSggcGFyZW50WzBdICk7XG5cdFx0XHRcdFx0XHRwYXJlbnQgICAgPSAkKHBhcmVudCkucGFyZW50KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGRlbHRhICE9PSAwICYmICFjYW5TY3JvbGwpIHtcblx0XHRcdFx0XHRcdGlmIChGLmdyb3VwLmxlbmd0aCA+IDEgJiYgIWN1cnJlbnQuY2FuU2hyaW5rKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChkZWx0YVkgPiAwIHx8IGRlbHRhWCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRGLnByZXYoIGRlbHRhWSA+IDAgPyAnZG93bicgOiAnbGVmdCcgKTtcblxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGRlbHRhWSA8IDAgfHwgZGVsdGFYIDwgMCkge1xuXHRcdFx0XHRcdFx0XHRcdEYubmV4dCggZGVsdGFZIDwgMCA/ICd1cCcgOiAncmlnaHQnICk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0dHJpZ2dlcjogZnVuY3Rpb24gKGV2ZW50LCBvKSB7XG5cdFx0XHR2YXIgcmV0LCBvYmogPSBvIHx8IEYuY29taW5nIHx8IEYuY3VycmVudDtcblxuXHRcdFx0aWYgKG9iaikge1xuXHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKCBvYmpbZXZlbnRdICkpIHtcblx0XHRcdFx0XHRyZXQgPSBvYmpbZXZlbnRdLmFwcGx5KG9iaiwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAocmV0ID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChvYmouaGVscGVycykge1xuXHRcdFx0XHRcdCQuZWFjaChvYmouaGVscGVycywgZnVuY3Rpb24gKGhlbHBlciwgb3B0cykge1xuXHRcdFx0XHRcdFx0aWYgKG9wdHMgJiYgRi5oZWxwZXJzW2hlbHBlcl0gJiYgJC5pc0Z1bmN0aW9uKEYuaGVscGVyc1toZWxwZXJdW2V2ZW50XSkpIHtcblx0XHRcdFx0XHRcdFx0Ri5oZWxwZXJzW2hlbHBlcl1bZXZlbnRdKCQuZXh0ZW5kKHRydWUsIHt9LCBGLmhlbHBlcnNbaGVscGVyXS5kZWZhdWx0cywgb3B0cyksIG9iaik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0RC50cmlnZ2VyKGV2ZW50KTtcblx0XHR9LFxuXG5cdFx0aXNJbWFnZTogZnVuY3Rpb24gKHN0cikge1xuXHRcdFx0cmV0dXJuIGlzU3RyaW5nKHN0cikgJiYgc3RyLm1hdGNoKC8oXmRhdGE6aW1hZ2VcXC8uKiwpfChcXC4oanAoZXxnfGVnKXxnaWZ8cG5nfGJtcHx3ZWJwfHN2ZykoKFxcP3wjKS4qKT8kKS9pKTtcblx0XHR9LFxuXG5cdFx0aXNTV0Y6IGZ1bmN0aW9uIChzdHIpIHtcblx0XHRcdHJldHVybiBpc1N0cmluZyhzdHIpICYmIHN0ci5tYXRjaCgvXFwuKHN3ZikoKFxcP3wjKS4qKT8kL2kpO1xuXHRcdH0sXG5cblx0XHRfc3RhcnQ6IGZ1bmN0aW9uIChpbmRleCkge1xuXHRcdFx0dmFyIGNvbWluZyA9IHt9LFxuXHRcdFx0XHRvYmosXG5cdFx0XHRcdGhyZWYsXG5cdFx0XHRcdHR5cGUsXG5cdFx0XHRcdG1hcmdpbixcblx0XHRcdFx0cGFkZGluZztcblxuXHRcdFx0aW5kZXggPSBnZXRTY2FsYXIoIGluZGV4ICk7XG5cdFx0XHRvYmogICA9IEYuZ3JvdXBbIGluZGV4IF0gfHwgbnVsbDtcblxuXHRcdFx0aWYgKCFvYmopIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb21pbmcgPSAkLmV4dGVuZCh0cnVlLCB7fSwgRi5vcHRzLCBvYmopO1xuXG5cdFx0XHQvLyBDb252ZXJ0IG1hcmdpbiBhbmQgcGFkZGluZyBwcm9wZXJ0aWVzIHRvIGFycmF5IC0gdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0XG5cdFx0XHRtYXJnaW4gID0gY29taW5nLm1hcmdpbjtcblx0XHRcdHBhZGRpbmcgPSBjb21pbmcucGFkZGluZztcblxuXHRcdFx0aWYgKCQudHlwZShtYXJnaW4pID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjb21pbmcubWFyZ2luID0gW21hcmdpbiwgbWFyZ2luLCBtYXJnaW4sIG1hcmdpbl07XG5cdFx0XHR9XG5cblx0XHRcdGlmICgkLnR5cGUocGFkZGluZykgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNvbWluZy5wYWRkaW5nID0gW3BhZGRpbmcsIHBhZGRpbmcsIHBhZGRpbmcsIHBhZGRpbmddO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyAnbW9kYWwnIHByb3BlcnkgaXMganVzdCBhIHNob3J0Y3V0XG5cdFx0XHRpZiAoY29taW5nLm1vZGFsKSB7XG5cdFx0XHRcdCQuZXh0ZW5kKHRydWUsIGNvbWluZywge1xuXHRcdFx0XHRcdGNsb3NlQnRuICAgOiBmYWxzZSxcblx0XHRcdFx0XHRjbG9zZUNsaWNrIDogZmFsc2UsXG5cdFx0XHRcdFx0bmV4dENsaWNrICA6IGZhbHNlLFxuXHRcdFx0XHRcdGFycm93cyAgICAgOiBmYWxzZSxcblx0XHRcdFx0XHRtb3VzZVdoZWVsIDogZmFsc2UsXG5cdFx0XHRcdFx0a2V5cyAgICAgICA6IG51bGwsXG5cdFx0XHRcdFx0aGVscGVyczoge1xuXHRcdFx0XHRcdFx0b3ZlcmxheSA6IHtcblx0XHRcdFx0XHRcdFx0Y2xvc2VDbGljayA6IGZhbHNlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gJ2F1dG9TaXplJyBwcm9wZXJ0eSBpcyBhIHNob3J0Y3V0LCB0b29cblx0XHRcdGlmIChjb21pbmcuYXV0b1NpemUpIHtcblx0XHRcdFx0Y29taW5nLmF1dG9XaWR0aCA9IGNvbWluZy5hdXRvSGVpZ2h0ID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNvbWluZy53aWR0aCA9PT0gJ2F1dG8nKSB7XG5cdFx0XHRcdGNvbWluZy5hdXRvV2lkdGggPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY29taW5nLmhlaWdodCA9PT0gJ2F1dG8nKSB7XG5cdFx0XHRcdGNvbWluZy5hdXRvSGVpZ2h0ID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Lypcblx0XHRcdCAqIEFkZCByZWZlcmVuY2UgdG8gdGhlIGdyb3VwLCBzbyBpdGBzIHBvc3NpYmxlIHRvIGFjY2VzcyBmcm9tIGNhbGxiYWNrcywgZXhhbXBsZTpcblx0XHRcdCAqIGFmdGVyTG9hZCA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0ICogICAgIHRoaXMudGl0bGUgPSAnSW1hZ2UgJyArICh0aGlzLmluZGV4ICsgMSkgKyAnIG9mICcgKyB0aGlzLmdyb3VwLmxlbmd0aCArICh0aGlzLnRpdGxlID8gJyAtICcgKyB0aGlzLnRpdGxlIDogJycpO1xuXHRcdFx0ICogfVxuXHRcdFx0ICovXG5cblx0XHRcdGNvbWluZy5ncm91cCAgPSBGLmdyb3VwO1xuXHRcdFx0Y29taW5nLmluZGV4ICA9IGluZGV4O1xuXG5cdFx0XHQvLyBHaXZlIGEgY2hhbmNlIGZvciBjYWxsYmFjayBvciBoZWxwZXJzIHRvIHVwZGF0ZSBjb21pbmcgaXRlbSAodHlwZSwgdGl0bGUsIGV0Yylcblx0XHRcdEYuY29taW5nID0gY29taW5nO1xuXG5cdFx0XHRpZiAoZmFsc2UgPT09IEYudHJpZ2dlcignYmVmb3JlTG9hZCcpKSB7XG5cdFx0XHRcdEYuY29taW5nID0gbnVsbDtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHR5cGUgPSBjb21pbmcudHlwZTtcblx0XHRcdGhyZWYgPSBjb21pbmcuaHJlZjtcblxuXHRcdFx0aWYgKCF0eXBlKSB7XG5cdFx0XHRcdEYuY29taW5nID0gbnVsbDtcblxuXHRcdFx0XHQvL0lmIHdlIGNhbiBub3QgZGV0ZXJtaW5lIGNvbnRlbnQgdHlwZSB0aGVuIGRyb3Agc2lsZW50bHkgb3IgZGlzcGxheSBuZXh0L3ByZXYgaXRlbSBpZiBsb29waW5nIHRocm91Z2ggZ2FsbGVyeVxuXHRcdFx0XHRpZiAoRi5jdXJyZW50ICYmIEYucm91dGVyICYmIEYucm91dGVyICE9PSAnanVtcHRvJykge1xuXHRcdFx0XHRcdEYuY3VycmVudC5pbmRleCA9IGluZGV4O1xuXG5cdFx0XHRcdFx0cmV0dXJuIEZbIEYucm91dGVyIF0oIEYuZGlyZWN0aW9uICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdEYuaXNBY3RpdmUgPSB0cnVlO1xuXG5cdFx0XHRpZiAodHlwZSA9PT0gJ2ltYWdlJyB8fCB0eXBlID09PSAnc3dmJykge1xuXHRcdFx0XHRjb21pbmcuYXV0b0hlaWdodCA9IGNvbWluZy5hdXRvV2lkdGggPSBmYWxzZTtcblx0XHRcdFx0Y29taW5nLnNjcm9sbGluZyAgPSAndmlzaWJsZSc7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlID09PSAnaW1hZ2UnKSB7XG5cdFx0XHRcdGNvbWluZy5hc3BlY3RSYXRpbyA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlID09PSAnaWZyYW1lJyAmJiBpc1RvdWNoKSB7XG5cdFx0XHRcdGNvbWluZy5zY3JvbGxpbmcgPSAnc2Nyb2xsJztcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnVpbGQgdGhlIG5lY2Nlc3NhcnkgbWFya3VwXG5cdFx0XHRjb21pbmcud3JhcCA9ICQoY29taW5nLnRwbC53cmFwKS5hZGRDbGFzcygnZmFuY3lib3gtJyArIChpc1RvdWNoID8gJ21vYmlsZScgOiAnZGVza3RvcCcpICsgJyBmYW5jeWJveC10eXBlLScgKyB0eXBlICsgJyBmYW5jeWJveC10bXAgJyArIGNvbWluZy53cmFwQ1NTKS5hcHBlbmRUbyggY29taW5nLnBhcmVudCB8fCAnYm9keScgKTtcblxuXHRcdFx0JC5leHRlbmQoY29taW5nLCB7XG5cdFx0XHRcdHNraW4gIDogJCgnLmZhbmN5Ym94LXNraW4nLCAgY29taW5nLndyYXApLFxuXHRcdFx0XHRvdXRlciA6ICQoJy5mYW5jeWJveC1vdXRlcicsIGNvbWluZy53cmFwKSxcblx0XHRcdFx0aW5uZXIgOiAkKCcuZmFuY3lib3gtaW5uZXInLCBjb21pbmcud3JhcClcblx0XHRcdH0pO1xuXG5cdFx0XHQkLmVhY2goW1wiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCJdLCBmdW5jdGlvbihpLCB2KSB7XG5cdFx0XHRcdGNvbWluZy5za2luLmNzcygncGFkZGluZycgKyB2LCBnZXRWYWx1ZShjb21pbmcucGFkZGluZ1sgaSBdKSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ri50cmlnZ2VyKCdvblJlYWR5Jyk7XG5cblx0XHRcdC8vIENoZWNrIGJlZm9yZSB0cnkgdG8gbG9hZDsgJ2lubGluZScgYW5kICdodG1sJyB0eXBlcyBuZWVkIGNvbnRlbnQsIG90aGVycyAtIGhyZWZcblx0XHRcdGlmICh0eXBlID09PSAnaW5saW5lJyB8fCB0eXBlID09PSAnaHRtbCcpIHtcblx0XHRcdFx0aWYgKCFjb21pbmcuY29udGVudCB8fCAhY29taW5nLmNvbnRlbnQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIEYuX2Vycm9yKCAnY29udGVudCcgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgaWYgKCFocmVmKSB7XG5cdFx0XHRcdHJldHVybiBGLl9lcnJvciggJ2hyZWYnICk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlID09PSAnaW1hZ2UnKSB7XG5cdFx0XHRcdEYuX2xvYWRJbWFnZSgpO1xuXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdhamF4Jykge1xuXHRcdFx0XHRGLl9sb2FkQWpheCgpO1xuXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdpZnJhbWUnKSB7XG5cdFx0XHRcdEYuX2xvYWRJZnJhbWUoKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ri5fYWZ0ZXJMb2FkKCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9lcnJvcjogZnVuY3Rpb24gKCB0eXBlICkge1xuXHRcdFx0JC5leHRlbmQoRi5jb21pbmcsIHtcblx0XHRcdFx0dHlwZSAgICAgICA6ICdodG1sJyxcblx0XHRcdFx0YXV0b1dpZHRoICA6IHRydWUsXG5cdFx0XHRcdGF1dG9IZWlnaHQgOiB0cnVlLFxuXHRcdFx0XHRtaW5XaWR0aCAgIDogMCxcblx0XHRcdFx0bWluSGVpZ2h0ICA6IDAsXG5cdFx0XHRcdHNjcm9sbGluZyAgOiAnbm8nLFxuXHRcdFx0XHRoYXNFcnJvciAgIDogdHlwZSxcblx0XHRcdFx0Y29udGVudCAgICA6IEYuY29taW5nLnRwbC5lcnJvclxuXHRcdFx0fSk7XG5cblx0XHRcdEYuX2FmdGVyTG9hZCgpO1xuXHRcdH0sXG5cblx0XHRfbG9hZEltYWdlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBSZXNldCBwcmVsb2FkIGltYWdlIHNvIGl0IGlzIGxhdGVyIHBvc3NpYmxlIHRvIGNoZWNrIFwiY29tcGxldGVcIiBwcm9wZXJ0eVxuXHRcdFx0dmFyIGltZyA9IEYuaW1nUHJlbG9hZCA9IG5ldyBJbWFnZSgpO1xuXG5cdFx0XHRpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aGlzLm9ubG9hZCA9IHRoaXMub25lcnJvciA9IG51bGw7XG5cblx0XHRcdFx0Ri5jb21pbmcud2lkdGggID0gdGhpcy53aWR0aCAvIEYub3B0cy5waXhlbFJhdGlvO1xuXHRcdFx0XHRGLmNvbWluZy5oZWlnaHQgPSB0aGlzLmhlaWdodCAvIEYub3B0cy5waXhlbFJhdGlvO1xuXG5cdFx0XHRcdEYuX2FmdGVyTG9hZCgpO1xuXHRcdFx0fTtcblxuXHRcdFx0aW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRoaXMub25sb2FkID0gdGhpcy5vbmVycm9yID0gbnVsbDtcblxuXHRcdFx0XHRGLl9lcnJvciggJ2ltYWdlJyApO1xuXHRcdFx0fTtcblxuXHRcdFx0aW1nLnNyYyA9IEYuY29taW5nLmhyZWY7XG5cblx0XHRcdGlmIChpbWcuY29tcGxldGUgIT09IHRydWUpIHtcblx0XHRcdFx0Ri5zaG93TG9hZGluZygpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfbG9hZEFqYXg6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjb21pbmcgPSBGLmNvbWluZztcblxuXHRcdFx0Ri5zaG93TG9hZGluZygpO1xuXG5cdFx0XHRGLmFqYXhMb2FkID0gJC5hamF4KCQuZXh0ZW5kKHt9LCBjb21pbmcuYWpheCwge1xuXHRcdFx0XHR1cmw6IGNvbWluZy5ocmVmLFxuXHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzKSB7XG5cdFx0XHRcdFx0aWYgKEYuY29taW5nICYmIHRleHRTdGF0dXMgIT09ICdhYm9ydCcpIHtcblx0XHRcdFx0XHRcdEYuX2Vycm9yKCAnYWpheCcsIGpxWEhSICk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ri5oaWRlTG9hZGluZygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEsIHRleHRTdGF0dXMpIHtcblx0XHRcdFx0XHRpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0XHRjb21pbmcuY29udGVudCA9IGRhdGE7XG5cblx0XHRcdFx0XHRcdEYuX2FmdGVyTG9hZCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkpO1xuXHRcdH0sXG5cblx0XHRfbG9hZElmcmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY29taW5nID0gRi5jb21pbmcsXG5cdFx0XHRcdGlmcmFtZSA9ICQoY29taW5nLnRwbC5pZnJhbWUucmVwbGFjZSgvXFx7cm5kXFx9L2csIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSlcblx0XHRcdFx0XHQuYXR0cignc2Nyb2xsaW5nJywgaXNUb3VjaCA/ICdhdXRvJyA6IGNvbWluZy5pZnJhbWUuc2Nyb2xsaW5nKVxuXHRcdFx0XHRcdC5hdHRyKCdzcmMnLCBjb21pbmcuaHJlZik7XG5cblx0XHRcdC8vIFRoaXMgaGVscHMgSUVcblx0XHRcdCQoY29taW5nLndyYXApLmJpbmQoJ29uUmVzZXQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdpZnJhbWUnKS5oaWRlKCkuYXR0cignc3JjJywgJy8vYWJvdXQ6YmxhbmsnKS5lbmQoKS5lbXB0eSgpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChjb21pbmcuaWZyYW1lLnByZWxvYWQpIHtcblx0XHRcdFx0Ri5zaG93TG9hZGluZygpO1xuXG5cdFx0XHRcdGlmcmFtZS5vbmUoJ2xvYWQnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkKHRoaXMpLmRhdGEoJ3JlYWR5JywgMSk7XG5cblx0XHRcdFx0XHQvLyBpT1Mgd2lsbCBsb3NlIHNjcm9sbGluZyBpZiB3ZSByZXNpemVcblx0XHRcdFx0XHRpZiAoIWlzVG91Y2gpIHtcblx0XHRcdFx0XHRcdCQodGhpcykuYmluZCgnbG9hZC5mYicsIEYudXBkYXRlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBXaXRob3V0IHRoaXMgdHJpY2s6XG5cdFx0XHRcdFx0Ly8gICAtIGlmcmFtZSB3b24ndCBzY3JvbGwgb24gaU9TIGRldmljZXNcblx0XHRcdFx0XHQvLyAgIC0gSUU3IHNvbWV0aW1lcyBkaXNwbGF5cyBlbXB0eSBpZnJhbWVcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoJy5mYW5jeWJveC13cmFwJykud2lkdGgoJzEwMCUnKS5yZW1vdmVDbGFzcygnZmFuY3lib3gtdG1wJykuc2hvdygpO1xuXG5cdFx0XHRcdFx0Ri5fYWZ0ZXJMb2FkKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRjb21pbmcuY29udGVudCA9IGlmcmFtZS5hcHBlbmRUbyggY29taW5nLmlubmVyICk7XG5cblx0XHRcdGlmICghY29taW5nLmlmcmFtZS5wcmVsb2FkKSB7XG5cdFx0XHRcdEYuX2FmdGVyTG9hZCgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRfcHJlbG9hZEltYWdlczogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZ3JvdXAgICA9IEYuZ3JvdXAsXG5cdFx0XHRcdGN1cnJlbnQgPSBGLmN1cnJlbnQsXG5cdFx0XHRcdGxlbiAgICAgPSBncm91cC5sZW5ndGgsXG5cdFx0XHRcdGNudCAgICAgPSBjdXJyZW50LnByZWxvYWQgPyBNYXRoLm1pbihjdXJyZW50LnByZWxvYWQsIGxlbiAtIDEpIDogMCxcblx0XHRcdFx0aXRlbSxcblx0XHRcdFx0aTtcblxuXHRcdFx0Zm9yIChpID0gMTsgaSA8PSBjbnQ7IGkgKz0gMSkge1xuXHRcdFx0XHRpdGVtID0gZ3JvdXBbIChjdXJyZW50LmluZGV4ICsgaSApICUgbGVuIF07XG5cblx0XHRcdFx0aWYgKGl0ZW0udHlwZSA9PT0gJ2ltYWdlJyAmJiBpdGVtLmhyZWYpIHtcblx0XHRcdFx0XHRuZXcgSW1hZ2UoKS5zcmMgPSBpdGVtLmhyZWY7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X2FmdGVyTG9hZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGNvbWluZyAgID0gRi5jb21pbmcsXG5cdFx0XHRcdHByZXZpb3VzID0gRi5jdXJyZW50LFxuXHRcdFx0XHRwbGFjZWhvbGRlciA9ICdmYW5jeWJveC1wbGFjZWhvbGRlcicsXG5cdFx0XHRcdGN1cnJlbnQsXG5cdFx0XHRcdGNvbnRlbnQsXG5cdFx0XHRcdHR5cGUsXG5cdFx0XHRcdHNjcm9sbGluZyxcblx0XHRcdFx0aHJlZixcblx0XHRcdFx0ZW1iZWQ7XG5cblx0XHRcdEYuaGlkZUxvYWRpbmcoKTtcblxuXHRcdFx0aWYgKCFjb21pbmcgfHwgRi5pc0FjdGl2ZSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmFsc2UgPT09IEYudHJpZ2dlcignYWZ0ZXJMb2FkJywgY29taW5nLCBwcmV2aW91cykpIHtcblx0XHRcdFx0Y29taW5nLndyYXAuc3RvcCh0cnVlKS50cmlnZ2VyKCdvblJlc2V0JykucmVtb3ZlKCk7XG5cblx0XHRcdFx0Ri5jb21pbmcgPSBudWxsO1xuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHByZXZpb3VzKSB7XG5cdFx0XHRcdEYudHJpZ2dlcignYmVmb3JlQ2hhbmdlJywgcHJldmlvdXMpO1xuXG5cdFx0XHRcdHByZXZpb3VzLndyYXAuc3RvcCh0cnVlKS5yZW1vdmVDbGFzcygnZmFuY3lib3gtb3BlbmVkJylcblx0XHRcdFx0XHQuZmluZCgnLmZhbmN5Ym94LWl0ZW0sIC5mYW5jeWJveC1uYXYnKVxuXHRcdFx0XHRcdC5yZW1vdmUoKTtcblx0XHRcdH1cblxuXHRcdFx0Ri51bmJpbmRFdmVudHMoKTtcblxuXHRcdFx0Y3VycmVudCAgID0gY29taW5nO1xuXHRcdFx0Y29udGVudCAgID0gY29taW5nLmNvbnRlbnQ7XG5cdFx0XHR0eXBlICAgICAgPSBjb21pbmcudHlwZTtcblx0XHRcdHNjcm9sbGluZyA9IGNvbWluZy5zY3JvbGxpbmc7XG5cblx0XHRcdCQuZXh0ZW5kKEYsIHtcblx0XHRcdFx0d3JhcCAgOiBjdXJyZW50LndyYXAsXG5cdFx0XHRcdHNraW4gIDogY3VycmVudC5za2luLFxuXHRcdFx0XHRvdXRlciA6IGN1cnJlbnQub3V0ZXIsXG5cdFx0XHRcdGlubmVyIDogY3VycmVudC5pbm5lcixcblx0XHRcdFx0Y3VycmVudCAgOiBjdXJyZW50LFxuXHRcdFx0XHRwcmV2aW91cyA6IHByZXZpb3VzXG5cdFx0XHR9KTtcblxuXHRcdFx0aHJlZiA9IGN1cnJlbnQuaHJlZjtcblxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdGNhc2UgJ2lubGluZSc6XG5cdFx0XHRcdGNhc2UgJ2FqYXgnOlxuXHRcdFx0XHRjYXNlICdodG1sJzpcblx0XHRcdFx0XHRpZiAoY3VycmVudC5zZWxlY3Rvcikge1xuXHRcdFx0XHRcdFx0Y29udGVudCA9ICQoJzxkaXY+JykuaHRtbChjb250ZW50KS5maW5kKGN1cnJlbnQuc2VsZWN0b3IpO1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpc1F1ZXJ5KGNvbnRlbnQpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIWNvbnRlbnQuZGF0YShwbGFjZWhvbGRlcikpIHtcblx0XHRcdFx0XHRcdFx0Y29udGVudC5kYXRhKHBsYWNlaG9sZGVyLCAkKCc8ZGl2IGNsYXNzPVwiJyArIHBsYWNlaG9sZGVyICsgJ1wiPjwvZGl2PicpLmluc2VydEFmdGVyKCBjb250ZW50ICkuaGlkZSgpICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnRlbnQgPSBjb250ZW50LnNob3coKS5kZXRhY2goKTtcblxuXHRcdFx0XHRcdFx0Y3VycmVudC53cmFwLmJpbmQoJ29uUmVzZXQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdGlmICgkKHRoaXMpLmZpbmQoY29udGVudCkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29udGVudC5oaWRlKCkucmVwbGFjZUFsbCggY29udGVudC5kYXRhKHBsYWNlaG9sZGVyKSApLmRhdGEocGxhY2Vob2xkZXIsIGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRcdFx0Y29udGVudCA9IGN1cnJlbnQudHBsLmltYWdlLnJlcGxhY2UoL1xce2hyZWZcXH0vZywgaHJlZik7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ3N3Zic6XG5cdFx0XHRcdFx0Y29udGVudCA9ICc8b2JqZWN0IGlkPVwiZmFuY3lib3gtc3dmXCIgY2xhc3NpZD1cImNsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj48cGFyYW0gbmFtZT1cIm1vdmllXCIgdmFsdWU9XCInICsgaHJlZiArICdcIj48L3BhcmFtPic7XG5cdFx0XHRcdFx0ZW1iZWQgICA9ICcnO1xuXG5cdFx0XHRcdFx0JC5lYWNoKGN1cnJlbnQuc3dmLCBmdW5jdGlvbihuYW1lLCB2YWwpIHtcblx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gJzxwYXJhbSBuYW1lPVwiJyArIG5hbWUgKyAnXCIgdmFsdWU9XCInICsgdmFsICsgJ1wiPjwvcGFyYW0+Jztcblx0XHRcdFx0XHRcdGVtYmVkICAgKz0gJyAnICsgbmFtZSArICc9XCInICsgdmFsICsgJ1wiJztcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGNvbnRlbnQgKz0gJzxlbWJlZCBzcmM9XCInICsgaHJlZiArICdcIiB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCInICsgZW1iZWQgKyAnPjwvZW1iZWQ+PC9vYmplY3Q+Jztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghKGlzUXVlcnkoY29udGVudCkgJiYgY29udGVudC5wYXJlbnQoKS5pcyhjdXJyZW50LmlubmVyKSkpIHtcblx0XHRcdFx0Y3VycmVudC5pbm5lci5hcHBlbmQoIGNvbnRlbnQgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gR2l2ZSBhIGNoYW5jZSBmb3IgaGVscGVycyBvciBjYWxsYmFja3MgdG8gdXBkYXRlIGVsZW1lbnRzXG5cdFx0XHRGLnRyaWdnZXIoJ2JlZm9yZVNob3cnKTtcblxuXHRcdFx0Ly8gU2V0IHNjcm9sbGluZyBiZWZvcmUgY2FsY3VsYXRpbmcgZGltZW5zaW9uc1xuXHRcdFx0Y3VycmVudC5pbm5lci5jc3MoJ292ZXJmbG93Jywgc2Nyb2xsaW5nID09PSAneWVzJyA/ICdzY3JvbGwnIDogKHNjcm9sbGluZyA9PT0gJ25vJyA/ICdoaWRkZW4nIDogc2Nyb2xsaW5nKSk7XG5cblx0XHRcdC8vIFNldCBpbml0aWFsIGRpbWVuc2lvbnMgYW5kIHN0YXJ0IHBvc2l0aW9uXG5cdFx0XHRGLl9zZXREaW1lbnNpb24oKTtcblxuXHRcdFx0Ri5yZXBvc2l0aW9uKCk7XG5cblx0XHRcdEYuaXNPcGVuID0gZmFsc2U7XG5cdFx0XHRGLmNvbWluZyA9IG51bGw7XG5cblx0XHRcdEYuYmluZEV2ZW50cygpO1xuXG5cdFx0XHRpZiAoIUYuaXNPcGVuZWQpIHtcblx0XHRcdFx0JCgnLmZhbmN5Ym94LXdyYXAnKS5ub3QoIGN1cnJlbnQud3JhcCApLnN0b3AodHJ1ZSkudHJpZ2dlcignb25SZXNldCcpLnJlbW92ZSgpO1xuXG5cdFx0XHR9IGVsc2UgaWYgKHByZXZpb3VzLnByZXZNZXRob2QpIHtcblx0XHRcdFx0Ri50cmFuc2l0aW9uc1sgcHJldmlvdXMucHJldk1ldGhvZCBdKCk7XG5cdFx0XHR9XG5cblx0XHRcdEYudHJhbnNpdGlvbnNbIEYuaXNPcGVuZWQgPyBjdXJyZW50Lm5leHRNZXRob2QgOiBjdXJyZW50Lm9wZW5NZXRob2QgXSgpO1xuXG5cdFx0XHRGLl9wcmVsb2FkSW1hZ2VzKCk7XG5cdFx0fSxcblxuXHRcdF9zZXREaW1lbnNpb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciB2aWV3cG9ydCAgID0gRi5nZXRWaWV3cG9ydCgpLFxuXHRcdFx0XHRzdGVwcyAgICAgID0gMCxcblx0XHRcdFx0Y2FuU2hyaW5rICA9IGZhbHNlLFxuXHRcdFx0XHRjYW5FeHBhbmQgID0gZmFsc2UsXG5cdFx0XHRcdHdyYXAgICAgICAgPSBGLndyYXAsXG5cdFx0XHRcdHNraW4gICAgICAgPSBGLnNraW4sXG5cdFx0XHRcdGlubmVyICAgICAgPSBGLmlubmVyLFxuXHRcdFx0XHRjdXJyZW50ICAgID0gRi5jdXJyZW50LFxuXHRcdFx0XHR3aWR0aCAgICAgID0gY3VycmVudC53aWR0aCxcblx0XHRcdFx0aGVpZ2h0ICAgICA9IGN1cnJlbnQuaGVpZ2h0LFxuXHRcdFx0XHRtaW5XaWR0aCAgID0gY3VycmVudC5taW5XaWR0aCxcblx0XHRcdFx0bWluSGVpZ2h0ICA9IGN1cnJlbnQubWluSGVpZ2h0LFxuXHRcdFx0XHRtYXhXaWR0aCAgID0gY3VycmVudC5tYXhXaWR0aCxcblx0XHRcdFx0bWF4SGVpZ2h0ICA9IGN1cnJlbnQubWF4SGVpZ2h0LFxuXHRcdFx0XHRzY3JvbGxpbmcgID0gY3VycmVudC5zY3JvbGxpbmcsXG5cdFx0XHRcdHNjcm9sbE91dCAgPSBjdXJyZW50LnNjcm9sbE91dHNpZGUgPyBjdXJyZW50LnNjcm9sbGJhcldpZHRoIDogMCxcblx0XHRcdFx0bWFyZ2luICAgICA9IGN1cnJlbnQubWFyZ2luLFxuXHRcdFx0XHR3TWFyZ2luICAgID0gZ2V0U2NhbGFyKG1hcmdpblsxXSArIG1hcmdpblszXSksXG5cdFx0XHRcdGhNYXJnaW4gICAgPSBnZXRTY2FsYXIobWFyZ2luWzBdICsgbWFyZ2luWzJdKSxcblx0XHRcdFx0d1BhZGRpbmcsXG5cdFx0XHRcdGhQYWRkaW5nLFxuXHRcdFx0XHR3U3BhY2UsXG5cdFx0XHRcdGhTcGFjZSxcblx0XHRcdFx0b3JpZ1dpZHRoLFxuXHRcdFx0XHRvcmlnSGVpZ2h0LFxuXHRcdFx0XHRvcmlnTWF4V2lkdGgsXG5cdFx0XHRcdG9yaWdNYXhIZWlnaHQsXG5cdFx0XHRcdHJhdGlvLFxuXHRcdFx0XHR3aWR0aF8sXG5cdFx0XHRcdGhlaWdodF8sXG5cdFx0XHRcdG1heFdpZHRoXyxcblx0XHRcdFx0bWF4SGVpZ2h0Xyxcblx0XHRcdFx0aWZyYW1lLFxuXHRcdFx0XHRib2R5O1xuXG5cdFx0XHQvLyBSZXNldCBkaW1lbnNpb25zIHNvIHdlIGNvdWxkIHJlLWNoZWNrIGFjdHVhbCBzaXplXG5cdFx0XHR3cmFwLmFkZChza2luKS5hZGQoaW5uZXIpLndpZHRoKCdhdXRvJykuaGVpZ2h0KCdhdXRvJykucmVtb3ZlQ2xhc3MoJ2ZhbmN5Ym94LXRtcCcpO1xuXG5cdFx0XHR3UGFkZGluZyA9IGdldFNjYWxhcihza2luLm91dGVyV2lkdGgodHJ1ZSkgIC0gc2tpbi53aWR0aCgpKTtcblx0XHRcdGhQYWRkaW5nID0gZ2V0U2NhbGFyKHNraW4ub3V0ZXJIZWlnaHQodHJ1ZSkgLSBza2luLmhlaWdodCgpKTtcblxuXHRcdFx0Ly8gQW55IHNwYWNlIGJldHdlZW4gY29udGVudCBhbmQgdmlld3BvcnQgKG1hcmdpbiwgcGFkZGluZywgYm9yZGVyLCB0aXRsZSlcblx0XHRcdHdTcGFjZSA9IHdNYXJnaW4gKyB3UGFkZGluZztcblx0XHRcdGhTcGFjZSA9IGhNYXJnaW4gKyBoUGFkZGluZztcblxuXHRcdFx0b3JpZ1dpZHRoICA9IGlzUGVyY2VudGFnZSh3aWR0aCkgID8gKHZpZXdwb3J0LncgLSB3U3BhY2UpICogZ2V0U2NhbGFyKHdpZHRoKSAgLyAxMDAgOiB3aWR0aDtcblx0XHRcdG9yaWdIZWlnaHQgPSBpc1BlcmNlbnRhZ2UoaGVpZ2h0KSA/ICh2aWV3cG9ydC5oIC0gaFNwYWNlKSAqIGdldFNjYWxhcihoZWlnaHQpIC8gMTAwIDogaGVpZ2h0O1xuXG5cdFx0XHRpZiAoY3VycmVudC50eXBlID09PSAnaWZyYW1lJykge1xuXHRcdFx0XHRpZnJhbWUgPSBjdXJyZW50LmNvbnRlbnQ7XG5cblx0XHRcdFx0aWYgKGN1cnJlbnQuYXV0b0hlaWdodCAmJiBpZnJhbWUuZGF0YSgncmVhZHknKSA9PT0gMSkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRpZiAoaWZyYW1lWzBdLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQubG9jYXRpb24pIHtcblx0XHRcdFx0XHRcdFx0aW5uZXIud2lkdGgoIG9yaWdXaWR0aCApLmhlaWdodCg5OTk5KTtcblxuXHRcdFx0XHRcdFx0XHRib2R5ID0gaWZyYW1lLmNvbnRlbnRzKCkuZmluZCgnYm9keScpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChzY3JvbGxPdXQpIHtcblx0XHRcdFx0XHRcdFx0XHRib2R5LmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdG9yaWdIZWlnaHQgPSBib2R5Lm91dGVySGVpZ2h0KHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgaWYgKGN1cnJlbnQuYXV0b1dpZHRoIHx8IGN1cnJlbnQuYXV0b0hlaWdodCkge1xuXHRcdFx0XHRpbm5lci5hZGRDbGFzcyggJ2ZhbmN5Ym94LXRtcCcgKTtcblxuXHRcdFx0XHQvLyBTZXQgd2lkdGggb3IgaGVpZ2h0IGluIGNhc2Ugd2UgbmVlZCB0byBjYWxjdWxhdGUgb25seSBvbmUgZGltZW5zaW9uXG5cdFx0XHRcdGlmICghY3VycmVudC5hdXRvV2lkdGgpIHtcblx0XHRcdFx0XHRpbm5lci53aWR0aCggb3JpZ1dpZHRoICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIWN1cnJlbnQuYXV0b0hlaWdodCkge1xuXHRcdFx0XHRcdGlubmVyLmhlaWdodCggb3JpZ0hlaWdodCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGN1cnJlbnQuYXV0b1dpZHRoKSB7XG5cdFx0XHRcdFx0b3JpZ1dpZHRoID0gaW5uZXIud2lkdGgoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50LmF1dG9IZWlnaHQpIHtcblx0XHRcdFx0XHRvcmlnSGVpZ2h0ID0gaW5uZXIuaGVpZ2h0KCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpbm5lci5yZW1vdmVDbGFzcyggJ2ZhbmN5Ym94LXRtcCcgKTtcblx0XHRcdH1cblxuXHRcdFx0d2lkdGggID0gZ2V0U2NhbGFyKCBvcmlnV2lkdGggKTtcblx0XHRcdGhlaWdodCA9IGdldFNjYWxhciggb3JpZ0hlaWdodCApO1xuXG5cdFx0XHRyYXRpbyAgPSBvcmlnV2lkdGggLyBvcmlnSGVpZ2h0O1xuXG5cdFx0XHQvLyBDYWxjdWxhdGlvbnMgZm9yIHRoZSBjb250ZW50XG5cdFx0XHRtaW5XaWR0aCAgPSBnZXRTY2FsYXIoaXNQZXJjZW50YWdlKG1pbldpZHRoKSA/IGdldFNjYWxhcihtaW5XaWR0aCwgJ3cnKSAtIHdTcGFjZSA6IG1pbldpZHRoKTtcblx0XHRcdG1heFdpZHRoICA9IGdldFNjYWxhcihpc1BlcmNlbnRhZ2UobWF4V2lkdGgpID8gZ2V0U2NhbGFyKG1heFdpZHRoLCAndycpIC0gd1NwYWNlIDogbWF4V2lkdGgpO1xuXG5cdFx0XHRtaW5IZWlnaHQgPSBnZXRTY2FsYXIoaXNQZXJjZW50YWdlKG1pbkhlaWdodCkgPyBnZXRTY2FsYXIobWluSGVpZ2h0LCAnaCcpIC0gaFNwYWNlIDogbWluSGVpZ2h0KTtcblx0XHRcdG1heEhlaWdodCA9IGdldFNjYWxhcihpc1BlcmNlbnRhZ2UobWF4SGVpZ2h0KSA/IGdldFNjYWxhcihtYXhIZWlnaHQsICdoJykgLSBoU3BhY2UgOiBtYXhIZWlnaHQpO1xuXG5cdFx0XHQvLyBUaGVzZSB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHdyYXAgY2FuIGZpdCBpbiB0aGUgdmlld3BvcnRcblx0XHRcdG9yaWdNYXhXaWR0aCAgPSBtYXhXaWR0aDtcblx0XHRcdG9yaWdNYXhIZWlnaHQgPSBtYXhIZWlnaHQ7XG5cblx0XHRcdGlmIChjdXJyZW50LmZpdFRvVmlldykge1xuXHRcdFx0XHRtYXhXaWR0aCAgPSBNYXRoLm1pbih2aWV3cG9ydC53IC0gd1NwYWNlLCBtYXhXaWR0aCk7XG5cdFx0XHRcdG1heEhlaWdodCA9IE1hdGgubWluKHZpZXdwb3J0LmggLSBoU3BhY2UsIG1heEhlaWdodCk7XG5cdFx0XHR9XG5cblx0XHRcdG1heFdpZHRoXyAgPSB2aWV3cG9ydC53IC0gd01hcmdpbjtcblx0XHRcdG1heEhlaWdodF8gPSB2aWV3cG9ydC5oIC0gaE1hcmdpbjtcblxuXHRcdFx0aWYgKGN1cnJlbnQuYXNwZWN0UmF0aW8pIHtcblx0XHRcdFx0aWYgKHdpZHRoID4gbWF4V2lkdGgpIHtcblx0XHRcdFx0XHR3aWR0aCAgPSBtYXhXaWR0aDtcblx0XHRcdFx0XHRoZWlnaHQgPSBnZXRTY2FsYXIod2lkdGggLyByYXRpbyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XG5cdFx0XHRcdFx0aGVpZ2h0ID0gbWF4SGVpZ2h0O1xuXHRcdFx0XHRcdHdpZHRoICA9IGdldFNjYWxhcihoZWlnaHQgKiByYXRpbyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAod2lkdGggPCBtaW5XaWR0aCkge1xuXHRcdFx0XHRcdHdpZHRoICA9IG1pbldpZHRoO1xuXHRcdFx0XHRcdGhlaWdodCA9IGdldFNjYWxhcih3aWR0aCAvIHJhdGlvKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChoZWlnaHQgPCBtaW5IZWlnaHQpIHtcblx0XHRcdFx0XHRoZWlnaHQgPSBtaW5IZWlnaHQ7XG5cdFx0XHRcdFx0d2lkdGggID0gZ2V0U2NhbGFyKGhlaWdodCAqIHJhdGlvKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aWR0aCA9IE1hdGgubWF4KG1pbldpZHRoLCBNYXRoLm1pbih3aWR0aCwgbWF4V2lkdGgpKTtcblxuXHRcdFx0XHRpZiAoY3VycmVudC5hdXRvSGVpZ2h0ICYmIGN1cnJlbnQudHlwZSAhPT0gJ2lmcmFtZScpIHtcblx0XHRcdFx0XHRpbm5lci53aWR0aCggd2lkdGggKTtcblxuXHRcdFx0XHRcdGhlaWdodCA9IGlubmVyLmhlaWdodCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aGVpZ2h0ID0gTWF0aC5tYXgobWluSGVpZ2h0LCBNYXRoLm1pbihoZWlnaHQsIG1heEhlaWdodCkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUcnkgdG8gZml0IGluc2lkZSB2aWV3cG9ydCAoaW5jbHVkaW5nIHRoZSB0aXRsZSlcblx0XHRcdGlmIChjdXJyZW50LmZpdFRvVmlldykge1xuXHRcdFx0XHRpbm5lci53aWR0aCggd2lkdGggKS5oZWlnaHQoIGhlaWdodCApO1xuXG5cdFx0XHRcdHdyYXAud2lkdGgoIHdpZHRoICsgd1BhZGRpbmcgKTtcblxuXHRcdFx0XHQvLyBSZWFsIHdyYXAgZGltZW5zaW9uc1xuXHRcdFx0XHR3aWR0aF8gID0gd3JhcC53aWR0aCgpO1xuXHRcdFx0XHRoZWlnaHRfID0gd3JhcC5oZWlnaHQoKTtcblxuXHRcdFx0XHRpZiAoY3VycmVudC5hc3BlY3RSYXRpbykge1xuXHRcdFx0XHRcdHdoaWxlICgod2lkdGhfID4gbWF4V2lkdGhfIHx8IGhlaWdodF8gPiBtYXhIZWlnaHRfKSAmJiB3aWR0aCA+IG1pbldpZHRoICYmIGhlaWdodCA+IG1pbkhlaWdodCkge1xuXHRcdFx0XHRcdFx0aWYgKHN0ZXBzKysgPiAxOSkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aGVpZ2h0ID0gTWF0aC5tYXgobWluSGVpZ2h0LCBNYXRoLm1pbihtYXhIZWlnaHQsIGhlaWdodCAtIDEwKSk7XG5cdFx0XHRcdFx0XHR3aWR0aCAgPSBnZXRTY2FsYXIoaGVpZ2h0ICogcmF0aW8pO1xuXG5cdFx0XHRcdFx0XHRpZiAod2lkdGggPCBtaW5XaWR0aCkge1xuXHRcdFx0XHRcdFx0XHR3aWR0aCAgPSBtaW5XaWR0aDtcblx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0gZ2V0U2NhbGFyKHdpZHRoIC8gcmF0aW8pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAod2lkdGggPiBtYXhXaWR0aCkge1xuXHRcdFx0XHRcdFx0XHR3aWR0aCAgPSBtYXhXaWR0aDtcblx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0gZ2V0U2NhbGFyKHdpZHRoIC8gcmF0aW8pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpbm5lci53aWR0aCggd2lkdGggKS5oZWlnaHQoIGhlaWdodCApO1xuXG5cdFx0XHRcdFx0XHR3cmFwLndpZHRoKCB3aWR0aCArIHdQYWRkaW5nICk7XG5cblx0XHRcdFx0XHRcdHdpZHRoXyAgPSB3cmFwLndpZHRoKCk7XG5cdFx0XHRcdFx0XHRoZWlnaHRfID0gd3JhcC5oZWlnaHQoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR3aWR0aCAgPSBNYXRoLm1heChtaW5XaWR0aCwgIE1hdGgubWluKHdpZHRoLCAgd2lkdGggIC0gKHdpZHRoXyAgLSBtYXhXaWR0aF8pKSk7XG5cdFx0XHRcdFx0aGVpZ2h0ID0gTWF0aC5tYXgobWluSGVpZ2h0LCBNYXRoLm1pbihoZWlnaHQsIGhlaWdodCAtIChoZWlnaHRfIC0gbWF4SGVpZ2h0XykpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc2Nyb2xsT3V0ICYmIHNjcm9sbGluZyA9PT0gJ2F1dG8nICYmIGhlaWdodCA8IG9yaWdIZWlnaHQgJiYgKHdpZHRoICsgd1BhZGRpbmcgKyBzY3JvbGxPdXQpIDwgbWF4V2lkdGhfKSB7XG5cdFx0XHRcdHdpZHRoICs9IHNjcm9sbE91dDtcblx0XHRcdH1cblxuXHRcdFx0aW5uZXIud2lkdGgoIHdpZHRoICkuaGVpZ2h0KCBoZWlnaHQgKTtcblxuXHRcdFx0d3JhcC53aWR0aCggd2lkdGggKyB3UGFkZGluZyApO1xuXG5cdFx0XHR3aWR0aF8gID0gd3JhcC53aWR0aCgpO1xuXHRcdFx0aGVpZ2h0XyA9IHdyYXAuaGVpZ2h0KCk7XG5cblx0XHRcdGNhblNocmluayA9ICh3aWR0aF8gPiBtYXhXaWR0aF8gfHwgaGVpZ2h0XyA+IG1heEhlaWdodF8pICYmIHdpZHRoID4gbWluV2lkdGggJiYgaGVpZ2h0ID4gbWluSGVpZ2h0O1xuXHRcdFx0Y2FuRXhwYW5kID0gY3VycmVudC5hc3BlY3RSYXRpbyA/ICh3aWR0aCA8IG9yaWdNYXhXaWR0aCAmJiBoZWlnaHQgPCBvcmlnTWF4SGVpZ2h0ICYmIHdpZHRoIDwgb3JpZ1dpZHRoICYmIGhlaWdodCA8IG9yaWdIZWlnaHQpIDogKCh3aWR0aCA8IG9yaWdNYXhXaWR0aCB8fCBoZWlnaHQgPCBvcmlnTWF4SGVpZ2h0KSAmJiAod2lkdGggPCBvcmlnV2lkdGggfHwgaGVpZ2h0IDwgb3JpZ0hlaWdodCkpO1xuXG5cdFx0XHQkLmV4dGVuZChjdXJyZW50LCB7XG5cdFx0XHRcdGRpbSA6IHtcblx0XHRcdFx0XHR3aWR0aFx0OiBnZXRWYWx1ZSggd2lkdGhfICksXG5cdFx0XHRcdFx0aGVpZ2h0XHQ6IGdldFZhbHVlKCBoZWlnaHRfIClcblx0XHRcdFx0fSxcblx0XHRcdFx0b3JpZ1dpZHRoICA6IG9yaWdXaWR0aCxcblx0XHRcdFx0b3JpZ0hlaWdodCA6IG9yaWdIZWlnaHQsXG5cdFx0XHRcdGNhblNocmluayAgOiBjYW5TaHJpbmssXG5cdFx0XHRcdGNhbkV4cGFuZCAgOiBjYW5FeHBhbmQsXG5cdFx0XHRcdHdQYWRkaW5nICAgOiB3UGFkZGluZyxcblx0XHRcdFx0aFBhZGRpbmcgICA6IGhQYWRkaW5nLFxuXHRcdFx0XHR3cmFwU3BhY2UgIDogaGVpZ2h0XyAtIHNraW4ub3V0ZXJIZWlnaHQodHJ1ZSksXG5cdFx0XHRcdHNraW5TcGFjZSAgOiBza2luLmhlaWdodCgpIC0gaGVpZ2h0XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKCFpZnJhbWUgJiYgY3VycmVudC5hdXRvSGVpZ2h0ICYmIGhlaWdodCA+IG1pbkhlaWdodCAmJiBoZWlnaHQgPCBtYXhIZWlnaHQgJiYgIWNhbkV4cGFuZCkge1xuXHRcdFx0XHRpbm5lci5oZWlnaHQoJ2F1dG8nKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0X2dldFBvc2l0aW9uOiBmdW5jdGlvbiAob25seUFic29sdXRlKSB7XG5cdFx0XHR2YXIgY3VycmVudCAgPSBGLmN1cnJlbnQsXG5cdFx0XHRcdHZpZXdwb3J0ID0gRi5nZXRWaWV3cG9ydCgpLFxuXHRcdFx0XHRtYXJnaW4gICA9IGN1cnJlbnQubWFyZ2luLFxuXHRcdFx0XHR3aWR0aCAgICA9IEYud3JhcC53aWR0aCgpICArIG1hcmdpblsxXSArIG1hcmdpblszXSxcblx0XHRcdFx0aGVpZ2h0ICAgPSBGLndyYXAuaGVpZ2h0KCkgKyBtYXJnaW5bMF0gKyBtYXJnaW5bMl0sXG5cdFx0XHRcdHJleiAgICAgID0ge1xuXHRcdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0XHRcdHRvcCAgOiBtYXJnaW5bMF0sXG5cdFx0XHRcdFx0bGVmdCA6IG1hcmdpblszXVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRpZiAoY3VycmVudC5hdXRvQ2VudGVyICYmIGN1cnJlbnQuZml4ZWQgJiYgIW9ubHlBYnNvbHV0ZSAmJiBoZWlnaHQgPD0gdmlld3BvcnQuaCAmJiB3aWR0aCA8PSB2aWV3cG9ydC53KSB7XG5cdFx0XHRcdHJlei5wb3NpdGlvbiA9ICdmaXhlZCc7XG5cblx0XHRcdH0gZWxzZSBpZiAoIWN1cnJlbnQubG9ja2VkKSB7XG5cdFx0XHRcdHJlei50b3AgICs9IHZpZXdwb3J0Lnk7XG5cdFx0XHRcdHJlei5sZWZ0ICs9IHZpZXdwb3J0Lng7XG5cdFx0XHR9XG5cblx0XHRcdHJlei50b3AgID0gZ2V0VmFsdWUoTWF0aC5tYXgocmV6LnRvcCwgIHJlei50b3AgICsgKCh2aWV3cG9ydC5oIC0gaGVpZ2h0KSAqIGN1cnJlbnQudG9wUmF0aW8pKSk7XG5cdFx0XHRyZXoubGVmdCA9IGdldFZhbHVlKE1hdGgubWF4KHJlei5sZWZ0LCByZXoubGVmdCArICgodmlld3BvcnQudyAtIHdpZHRoKSAgKiBjdXJyZW50LmxlZnRSYXRpbykpKTtcblxuXHRcdFx0cmV0dXJuIHJlejtcblx0XHR9LFxuXG5cdFx0X2FmdGVyWm9vbUluOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY3VycmVudCA9IEYuY3VycmVudDtcblxuXHRcdFx0aWYgKCFjdXJyZW50KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ri5pc09wZW4gPSBGLmlzT3BlbmVkID0gdHJ1ZTtcblxuXHRcdFx0Ri53cmFwLmNzcygnb3ZlcmZsb3cnLCAndmlzaWJsZScpLmFkZENsYXNzKCdmYW5jeWJveC1vcGVuZWQnKS5oaWRlKCkuc2hvdygwKTtcblxuXHRcdFx0Ri51cGRhdGUoKTtcblxuXHRcdFx0Ly8gQXNzaWduIGEgY2xpY2sgZXZlbnRcblx0XHRcdGlmICggY3VycmVudC5jbG9zZUNsaWNrIHx8IChjdXJyZW50Lm5leHRDbGljayAmJiBGLmdyb3VwLmxlbmd0aCA+IDEpICkge1xuXHRcdFx0XHRGLmlubmVyLmNzcygnY3Vyc29yJywgJ3BvaW50ZXInKS5iaW5kKCdjbGljay5mYicsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRpZiAoISQoZS50YXJnZXQpLmlzKCdhJykgJiYgISQoZS50YXJnZXQpLnBhcmVudCgpLmlzKCdhJykpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdFx0RlsgY3VycmVudC5jbG9zZUNsaWNrID8gJ2Nsb3NlJyA6ICduZXh0JyBdKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ3JlYXRlIGEgY2xvc2UgYnV0dG9uXG5cdFx0XHRpZiAoY3VycmVudC5jbG9zZUJ0bikge1xuXHRcdFx0XHQkKGN1cnJlbnQudHBsLmNsb3NlQnRuKS5hcHBlbmRUbyhGLnNraW4pLmJpbmQoJ2NsaWNrLmZiJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdEYuY2xvc2UoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENyZWF0ZSBuYXZpZ2F0aW9uIGFycm93c1xuXHRcdFx0aWYgKGN1cnJlbnQuYXJyb3dzICYmIEYuZ3JvdXAubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRpZiAoY3VycmVudC5sb29wIHx8IGN1cnJlbnQuaW5kZXggPiAwKSB7XG5cdFx0XHRcdFx0JChjdXJyZW50LnRwbC5wcmV2KS5hcHBlbmRUbyhGLm91dGVyKS5iaW5kKCdjbGljay5mYicsIEYucHJldik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY3VycmVudC5sb29wIHx8IGN1cnJlbnQuaW5kZXggPCBGLmdyb3VwLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0XHQkKGN1cnJlbnQudHBsLm5leHQpLmFwcGVuZFRvKEYub3V0ZXIpLmJpbmQoJ2NsaWNrLmZiJywgRi5uZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRGLnRyaWdnZXIoJ2FmdGVyU2hvdycpO1xuXG5cdFx0XHQvLyBTdG9wIHRoZSBzbGlkZXNob3cgaWYgdGhpcyBpcyB0aGUgbGFzdCBpdGVtXG5cdFx0XHRpZiAoIWN1cnJlbnQubG9vcCAmJiBjdXJyZW50LmluZGV4ID09PSBjdXJyZW50Lmdyb3VwLmxlbmd0aCAtIDEpIHtcblxuXHRcdFx0XHRGLnBsYXkoIGZhbHNlICk7XG5cblx0XHRcdH0gZWxzZSBpZiAoRi5vcHRzLmF1dG9QbGF5ICYmICFGLnBsYXllci5pc0FjdGl2ZSkge1xuXHRcdFx0XHRGLm9wdHMuYXV0b1BsYXkgPSBmYWxzZTtcblxuXHRcdFx0XHRGLnBsYXkodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdF9hZnRlclpvb21PdXQ6IGZ1bmN0aW9uICggb2JqICkge1xuXHRcdFx0b2JqID0gb2JqIHx8IEYuY3VycmVudDtcblxuXHRcdFx0JCgnLmZhbmN5Ym94LXdyYXAnKS50cmlnZ2VyKCdvblJlc2V0JykucmVtb3ZlKCk7XG5cblx0XHRcdCQuZXh0ZW5kKEYsIHtcblx0XHRcdFx0Z3JvdXAgIDoge30sXG5cdFx0XHRcdG9wdHMgICA6IHt9LFxuXHRcdFx0XHRyb3V0ZXIgOiBmYWxzZSxcblx0XHRcdFx0Y3VycmVudCAgIDogbnVsbCxcblx0XHRcdFx0aXNBY3RpdmUgIDogZmFsc2UsXG5cdFx0XHRcdGlzT3BlbmVkICA6IGZhbHNlLFxuXHRcdFx0XHRpc09wZW4gICAgOiBmYWxzZSxcblx0XHRcdFx0aXNDbG9zaW5nIDogZmFsc2UsXG5cdFx0XHRcdHdyYXAgICA6IG51bGwsXG5cdFx0XHRcdHNraW4gICA6IG51bGwsXG5cdFx0XHRcdG91dGVyICA6IG51bGwsXG5cdFx0XHRcdGlubmVyICA6IG51bGxcblx0XHRcdH0pO1xuXG5cdFx0XHRGLnRyaWdnZXIoJ2FmdGVyQ2xvc2UnLCBvYmopO1xuXHRcdH1cblx0fSk7XG5cblx0Lypcblx0ICpcdERlZmF1bHQgdHJhbnNpdGlvbnNcblx0ICovXG5cblx0Ri50cmFuc2l0aW9ucyA9IHtcblx0XHRnZXRPcmlnUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjdXJyZW50ICA9IEYuY3VycmVudCxcblx0XHRcdFx0ZWxlbWVudCAgPSBjdXJyZW50LmVsZW1lbnQsXG5cdFx0XHRcdG9yaWcgICAgID0gY3VycmVudC5vcmlnLFxuXHRcdFx0XHRwb3MgICAgICA9IHt9LFxuXHRcdFx0XHR3aWR0aCAgICA9IDUwLFxuXHRcdFx0XHRoZWlnaHQgICA9IDUwLFxuXHRcdFx0XHRoUGFkZGluZyA9IGN1cnJlbnQuaFBhZGRpbmcsXG5cdFx0XHRcdHdQYWRkaW5nID0gY3VycmVudC53UGFkZGluZyxcblx0XHRcdFx0dmlld3BvcnQgPSBGLmdldFZpZXdwb3J0KCk7XG5cblx0XHRcdGlmICghb3JpZyAmJiBjdXJyZW50LmlzRG9tICYmIGVsZW1lbnQuaXMoJzp2aXNpYmxlJykpIHtcblx0XHRcdFx0b3JpZyA9IGVsZW1lbnQuZmluZCgnaW1nOmZpcnN0Jyk7XG5cblx0XHRcdFx0aWYgKCFvcmlnLmxlbmd0aCkge1xuXHRcdFx0XHRcdG9yaWcgPSBlbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc1F1ZXJ5KG9yaWcpKSB7XG5cdFx0XHRcdHBvcyA9IG9yaWcub2Zmc2V0KCk7XG5cblx0XHRcdFx0aWYgKG9yaWcuaXMoJ2ltZycpKSB7XG5cdFx0XHRcdFx0d2lkdGggID0gb3JpZy5vdXRlcldpZHRoKCk7XG5cdFx0XHRcdFx0aGVpZ2h0ID0gb3JpZy5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBvcy50b3AgID0gdmlld3BvcnQueSArICh2aWV3cG9ydC5oIC0gaGVpZ2h0KSAqIGN1cnJlbnQudG9wUmF0aW87XG5cdFx0XHRcdHBvcy5sZWZ0ID0gdmlld3BvcnQueCArICh2aWV3cG9ydC53IC0gd2lkdGgpICAqIGN1cnJlbnQubGVmdFJhdGlvO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoRi53cmFwLmNzcygncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJyB8fCBjdXJyZW50LmxvY2tlZCkge1xuXHRcdFx0XHRwb3MudG9wICAtPSB2aWV3cG9ydC55O1xuXHRcdFx0XHRwb3MubGVmdCAtPSB2aWV3cG9ydC54O1xuXHRcdFx0fVxuXG5cdFx0XHRwb3MgPSB7XG5cdFx0XHRcdHRvcCAgICAgOiBnZXRWYWx1ZShwb3MudG9wICAtIGhQYWRkaW5nICogY3VycmVudC50b3BSYXRpbyksXG5cdFx0XHRcdGxlZnQgICAgOiBnZXRWYWx1ZShwb3MubGVmdCAtIHdQYWRkaW5nICogY3VycmVudC5sZWZ0UmF0aW8pLFxuXHRcdFx0XHR3aWR0aCAgIDogZ2V0VmFsdWUod2lkdGggICsgd1BhZGRpbmcpLFxuXHRcdFx0XHRoZWlnaHQgIDogZ2V0VmFsdWUoaGVpZ2h0ICsgaFBhZGRpbmcpXG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gcG9zO1xuXHRcdH0sXG5cblx0XHRzdGVwOiBmdW5jdGlvbiAobm93LCBmeCkge1xuXHRcdFx0dmFyIHJhdGlvLFxuXHRcdFx0XHRwYWRkaW5nLFxuXHRcdFx0XHR2YWx1ZSxcblx0XHRcdFx0cHJvcCAgICAgICA9IGZ4LnByb3AsXG5cdFx0XHRcdGN1cnJlbnQgICAgPSBGLmN1cnJlbnQsXG5cdFx0XHRcdHdyYXBTcGFjZSAgPSBjdXJyZW50LndyYXBTcGFjZSxcblx0XHRcdFx0c2tpblNwYWNlICA9IGN1cnJlbnQuc2tpblNwYWNlO1xuXG5cdFx0XHRpZiAocHJvcCA9PT0gJ3dpZHRoJyB8fCBwcm9wID09PSAnaGVpZ2h0Jykge1xuXHRcdFx0XHRyYXRpbyA9IGZ4LmVuZCA9PT0gZnguc3RhcnQgPyAxIDogKG5vdyAtIGZ4LnN0YXJ0KSAvIChmeC5lbmQgLSBmeC5zdGFydCk7XG5cblx0XHRcdFx0aWYgKEYuaXNDbG9zaW5nKSB7XG5cdFx0XHRcdFx0cmF0aW8gPSAxIC0gcmF0aW87XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwYWRkaW5nID0gcHJvcCA9PT0gJ3dpZHRoJyA/IGN1cnJlbnQud1BhZGRpbmcgOiBjdXJyZW50LmhQYWRkaW5nO1xuXHRcdFx0XHR2YWx1ZSAgID0gbm93IC0gcGFkZGluZztcblxuXHRcdFx0XHRGLnNraW5bIHByb3AgXSggIGdldFNjYWxhciggcHJvcCA9PT0gJ3dpZHRoJyA/ICB2YWx1ZSA6IHZhbHVlIC0gKHdyYXBTcGFjZSAqIHJhdGlvKSApICk7XG5cdFx0XHRcdEYuaW5uZXJbIHByb3AgXSggZ2V0U2NhbGFyKCBwcm9wID09PSAnd2lkdGgnID8gIHZhbHVlIDogdmFsdWUgLSAod3JhcFNwYWNlICogcmF0aW8pIC0gKHNraW5TcGFjZSAqIHJhdGlvKSApICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHpvb21JbjogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGN1cnJlbnQgID0gRi5jdXJyZW50LFxuXHRcdFx0XHRzdGFydFBvcyA9IGN1cnJlbnQucG9zLFxuXHRcdFx0XHRlZmZlY3QgICA9IGN1cnJlbnQub3BlbkVmZmVjdCxcblx0XHRcdFx0ZWxhc3RpYyAgPSBlZmZlY3QgPT09ICdlbGFzdGljJyxcblx0XHRcdFx0ZW5kUG9zICAgPSAkLmV4dGVuZCh7b3BhY2l0eSA6IDF9LCBzdGFydFBvcyk7XG5cblx0XHRcdC8vIFJlbW92ZSBcInBvc2l0aW9uXCIgcHJvcGVydHkgdGhhdCBicmVha3Mgb2xkZXIgSUVcblx0XHRcdGRlbGV0ZSBlbmRQb3MucG9zaXRpb247XG5cblx0XHRcdGlmIChlbGFzdGljKSB7XG5cdFx0XHRcdHN0YXJ0UG9zID0gdGhpcy5nZXRPcmlnUG9zaXRpb24oKTtcblxuXHRcdFx0XHRpZiAoY3VycmVudC5vcGVuT3BhY2l0eSkge1xuXHRcdFx0XHRcdHN0YXJ0UG9zLm9wYWNpdHkgPSAwLjE7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIGlmIChlZmZlY3QgPT09ICdmYWRlJykge1xuXHRcdFx0XHRzdGFydFBvcy5vcGFjaXR5ID0gMC4xO1xuXHRcdFx0fVxuXG5cdFx0XHRGLndyYXAuY3NzKHN0YXJ0UG9zKS5hbmltYXRlKGVuZFBvcywge1xuXHRcdFx0XHRkdXJhdGlvbiA6IGVmZmVjdCA9PT0gJ25vbmUnID8gMCA6IGN1cnJlbnQub3BlblNwZWVkLFxuXHRcdFx0XHRlYXNpbmcgICA6IGN1cnJlbnQub3BlbkVhc2luZyxcblx0XHRcdFx0c3RlcCAgICAgOiBlbGFzdGljID8gdGhpcy5zdGVwIDogbnVsbCxcblx0XHRcdFx0Y29tcGxldGUgOiBGLl9hZnRlclpvb21JblxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdHpvb21PdXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjdXJyZW50ICA9IEYuY3VycmVudCxcblx0XHRcdFx0ZWZmZWN0ICAgPSBjdXJyZW50LmNsb3NlRWZmZWN0LFxuXHRcdFx0XHRlbGFzdGljICA9IGVmZmVjdCA9PT0gJ2VsYXN0aWMnLFxuXHRcdFx0XHRlbmRQb3MgICA9IHtvcGFjaXR5IDogMC4xfTtcblxuXHRcdFx0aWYgKGVsYXN0aWMpIHtcblx0XHRcdFx0ZW5kUG9zID0gdGhpcy5nZXRPcmlnUG9zaXRpb24oKTtcblxuXHRcdFx0XHRpZiAoY3VycmVudC5jbG9zZU9wYWNpdHkpIHtcblx0XHRcdFx0XHRlbmRQb3Mub3BhY2l0eSA9IDAuMTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRGLndyYXAuYW5pbWF0ZShlbmRQb3MsIHtcblx0XHRcdFx0ZHVyYXRpb24gOiBlZmZlY3QgPT09ICdub25lJyA/IDAgOiBjdXJyZW50LmNsb3NlU3BlZWQsXG5cdFx0XHRcdGVhc2luZyAgIDogY3VycmVudC5jbG9zZUVhc2luZyxcblx0XHRcdFx0c3RlcCAgICAgOiBlbGFzdGljID8gdGhpcy5zdGVwIDogbnVsbCxcblx0XHRcdFx0Y29tcGxldGUgOiBGLl9hZnRlclpvb21PdXRcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRjaGFuZ2VJbjogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGN1cnJlbnQgICA9IEYuY3VycmVudCxcblx0XHRcdFx0ZWZmZWN0ICAgID0gY3VycmVudC5uZXh0RWZmZWN0LFxuXHRcdFx0XHRzdGFydFBvcyAgPSBjdXJyZW50LnBvcyxcblx0XHRcdFx0ZW5kUG9zICAgID0geyBvcGFjaXR5IDogMSB9LFxuXHRcdFx0XHRkaXJlY3Rpb24gPSBGLmRpcmVjdGlvbixcblx0XHRcdFx0ZGlzdGFuY2UgID0gMjAwLFxuXHRcdFx0XHRmaWVsZDtcblxuXHRcdFx0c3RhcnRQb3Mub3BhY2l0eSA9IDAuMTtcblxuXHRcdFx0aWYgKGVmZmVjdCA9PT0gJ2VsYXN0aWMnKSB7XG5cdFx0XHRcdGZpZWxkID0gZGlyZWN0aW9uID09PSAnZG93bicgfHwgZGlyZWN0aW9uID09PSAndXAnID8gJ3RvcCcgOiAnbGVmdCc7XG5cblx0XHRcdFx0aWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nIHx8IGRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuXHRcdFx0XHRcdHN0YXJ0UG9zWyBmaWVsZCBdID0gZ2V0VmFsdWUoZ2V0U2NhbGFyKHN0YXJ0UG9zWyBmaWVsZCBdKSAtIGRpc3RhbmNlKTtcblx0XHRcdFx0XHRlbmRQb3NbIGZpZWxkIF0gICA9ICcrPScgKyBkaXN0YW5jZSArICdweCc7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdGFydFBvc1sgZmllbGQgXSA9IGdldFZhbHVlKGdldFNjYWxhcihzdGFydFBvc1sgZmllbGQgXSkgKyBkaXN0YW5jZSk7XG5cdFx0XHRcdFx0ZW5kUG9zWyBmaWVsZCBdICAgPSAnLT0nICsgZGlzdGFuY2UgKyAncHgnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdvcmthcm91bmQgZm9yIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMjczXG5cdFx0XHRpZiAoZWZmZWN0ID09PSAnbm9uZScpIHtcblx0XHRcdFx0Ri5fYWZ0ZXJab29tSW4oKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ri53cmFwLmNzcyhzdGFydFBvcykuYW5pbWF0ZShlbmRQb3MsIHtcblx0XHRcdFx0XHRkdXJhdGlvbiA6IGN1cnJlbnQubmV4dFNwZWVkLFxuXHRcdFx0XHRcdGVhc2luZyAgIDogY3VycmVudC5uZXh0RWFzaW5nLFxuXHRcdFx0XHRcdGNvbXBsZXRlIDogRi5fYWZ0ZXJab29tSW5cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGNoYW5nZU91dDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHByZXZpb3VzICA9IEYucHJldmlvdXMsXG5cdFx0XHRcdGVmZmVjdCAgICA9IHByZXZpb3VzLnByZXZFZmZlY3QsXG5cdFx0XHRcdGVuZFBvcyAgICA9IHsgb3BhY2l0eSA6IDAuMSB9LFxuXHRcdFx0XHRkaXJlY3Rpb24gPSBGLmRpcmVjdGlvbixcblx0XHRcdFx0ZGlzdGFuY2UgID0gMjAwO1xuXG5cdFx0XHRpZiAoZWZmZWN0ID09PSAnZWxhc3RpYycpIHtcblx0XHRcdFx0ZW5kUG9zWyBkaXJlY3Rpb24gPT09ICdkb3duJyB8fCBkaXJlY3Rpb24gPT09ICd1cCcgPyAndG9wJyA6ICdsZWZ0JyBdID0gKCBkaXJlY3Rpb24gPT09ICd1cCcgfHwgZGlyZWN0aW9uID09PSAnbGVmdCcgPyAnLScgOiAnKycgKSArICc9JyArIGRpc3RhbmNlICsgJ3B4Jztcblx0XHRcdH1cblxuXHRcdFx0cHJldmlvdXMud3JhcC5hbmltYXRlKGVuZFBvcywge1xuXHRcdFx0XHRkdXJhdGlvbiA6IGVmZmVjdCA9PT0gJ25vbmUnID8gMCA6IHByZXZpb3VzLnByZXZTcGVlZCxcblx0XHRcdFx0ZWFzaW5nICAgOiBwcmV2aW91cy5wcmV2RWFzaW5nLFxuXHRcdFx0XHRjb21wbGV0ZSA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkKHRoaXMpLnRyaWdnZXIoJ29uUmVzZXQnKS5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qXG5cdCAqXHRPdmVybGF5IGhlbHBlclxuXHQgKi9cblxuXHRGLmhlbHBlcnMub3ZlcmxheSA9IHtcblx0XHRkZWZhdWx0cyA6IHtcblx0XHRcdGNsb3NlQ2xpY2sgOiB0cnVlLCAgICAgIC8vIGlmIHRydWUsIGZhbmN5Qm94IHdpbGwgYmUgY2xvc2VkIHdoZW4gdXNlciBjbGlja3Mgb24gdGhlIG92ZXJsYXlcblx0XHRcdHNwZWVkT3V0ICAgOiAyMDAsICAgICAgIC8vIGR1cmF0aW9uIG9mIGZhZGVPdXQgYW5pbWF0aW9uXG5cdFx0XHRzaG93RWFybHkgIDogdHJ1ZSwgICAgICAvLyBpbmRpY2F0ZXMgaWYgc2hvdWxkIGJlIG9wZW5lZCBpbW1lZGlhdGVseSBvciB3YWl0IHVudGlsIHRoZSBjb250ZW50IGlzIHJlYWR5XG5cdFx0XHRjc3MgICAgICAgIDoge30sICAgICAgICAvLyBjdXN0b20gQ1NTIHByb3BlcnRpZXNcblx0XHRcdGxvY2tlZCAgICAgOiAhaXNUb3VjaCwgIC8vIGlmIHRydWUsIHRoZSBjb250ZW50IHdpbGwgYmUgbG9ja2VkIGludG8gb3ZlcmxheVxuXHRcdFx0Zml4ZWQgICAgICA6IHRydWUgICAgICAgLy8gaWYgZmFsc2UsIHRoZSBvdmVybGF5IENTUyBwb3NpdGlvbiBwcm9wZXJ0eSB3aWxsIG5vdCBiZSBzZXQgdG8gXCJmaXhlZFwiXG5cdFx0fSxcblxuXHRcdG92ZXJsYXkgOiBudWxsLCAgICAgIC8vIGN1cnJlbnQgaGFuZGxlXG5cdFx0Zml4ZWQgICA6IGZhbHNlLCAgICAgLy8gaW5kaWNhdGVzIGlmIHRoZSBvdmVybGF5IGhhcyBwb3NpdGlvbiBcImZpeGVkXCJcblx0XHRlbCAgICAgIDogJCgnaHRtbCcpLCAvLyBlbGVtZW50IHRoYXQgY29udGFpbnMgXCJ0aGUgbG9ja1wiXG5cblx0XHQvLyBQdWJsaWMgbWV0aG9kc1xuXHRcdGNyZWF0ZSA6IGZ1bmN0aW9uKG9wdHMpIHtcblx0XHRcdHZhciBwYXJlbnQ7XG5cblx0XHRcdG9wdHMgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0cywgb3B0cyk7XG5cblx0XHRcdGlmICh0aGlzLm92ZXJsYXkpIHtcblx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRwYXJlbnQgPSBGLmNvbWluZyA/IEYuY29taW5nLnBhcmVudCA6IG9wdHMucGFyZW50O1xuXG5cdFx0XHR0aGlzLm92ZXJsYXkgPSAkKCc8ZGl2IGNsYXNzPVwiZmFuY3lib3gtb3ZlcmxheVwiPjwvZGl2PicpLmFwcGVuZFRvKCBwYXJlbnQgJiYgcGFyZW50LmxlbnRoID8gcGFyZW50IDogJ2JvZHknICk7XG5cdFx0XHR0aGlzLmZpeGVkICAgPSBmYWxzZTtcblxuXHRcdFx0aWYgKG9wdHMuZml4ZWQgJiYgRi5kZWZhdWx0cy5maXhlZCkge1xuXHRcdFx0XHR0aGlzLm92ZXJsYXkuYWRkQ2xhc3MoJ2ZhbmN5Ym94LW92ZXJsYXktZml4ZWQnKTtcblxuXHRcdFx0XHR0aGlzLmZpeGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0b3BlbiA6IGZ1bmN0aW9uKG9wdHMpIHtcblx0XHRcdHZhciB0aGF0ID0gdGhpcztcblxuXHRcdFx0b3B0cyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRzLCBvcHRzKTtcblxuXHRcdFx0aWYgKHRoaXMub3ZlcmxheSkge1xuXHRcdFx0XHR0aGlzLm92ZXJsYXkudW5iaW5kKCcub3ZlcmxheScpLndpZHRoKCdhdXRvJykuaGVpZ2h0KCdhdXRvJyk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY3JlYXRlKG9wdHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXRoaXMuZml4ZWQpIHtcblx0XHRcdFx0Vy5iaW5kKCdyZXNpemUub3ZlcmxheScsICQucHJveHkoIHRoaXMudXBkYXRlLCB0aGlzKSApO1xuXG5cdFx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRzLmNsb3NlQ2xpY2spIHtcblx0XHRcdFx0dGhpcy5vdmVybGF5LmJpbmQoJ2NsaWNrLm92ZXJsYXknLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0aWYgKCQoZS50YXJnZXQpLmhhc0NsYXNzKCdmYW5jeWJveC1vdmVybGF5JykpIHtcblx0XHRcdFx0XHRcdGlmIChGLmlzQWN0aXZlKSB7XG5cdFx0XHRcdFx0XHRcdEYuY2xvc2UoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoYXQuY2xvc2UoKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMub3ZlcmxheS5jc3MoIG9wdHMuY3NzICkuc2hvdygpO1xuXHRcdH0sXG5cblx0XHRjbG9zZSA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Vy51bmJpbmQoJ3Jlc2l6ZS5vdmVybGF5Jyk7XG5cblx0XHRcdGlmICh0aGlzLmVsLmhhc0NsYXNzKCdmYW5jeWJveC1sb2NrJykpIHtcblx0XHRcdFx0JCgnLmZhbmN5Ym94LW1hcmdpbicpLnJlbW92ZUNsYXNzKCdmYW5jeWJveC1tYXJnaW4nKTtcblxuXHRcdFx0XHR0aGlzLmVsLnJlbW92ZUNsYXNzKCdmYW5jeWJveC1sb2NrJyk7XG5cblx0XHRcdFx0Vy5zY3JvbGxUb3AoIHRoaXMuc2Nyb2xsViApLnNjcm9sbExlZnQoIHRoaXMuc2Nyb2xsSCApO1xuXHRcdFx0fVxuXG5cdFx0XHQkKCcuZmFuY3lib3gtb3ZlcmxheScpLnJlbW92ZSgpLmhpZGUoKTtcblxuXHRcdFx0JC5leHRlbmQodGhpcywge1xuXHRcdFx0XHRvdmVybGF5IDogbnVsbCxcblx0XHRcdFx0Zml4ZWQgICA6IGZhbHNlXG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Ly8gUHJpdmF0ZSwgY2FsbGJhY2tzXG5cblx0XHR1cGRhdGUgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgd2lkdGggPSAnMTAwJScsIG9mZnNldFdpZHRoO1xuXG5cdFx0XHQvLyBSZXNldCB3aWR0aC9oZWlnaHQgc28gaXQgd2lsbCBub3QgbWVzc1xuXHRcdFx0dGhpcy5vdmVybGF5LndpZHRoKHdpZHRoKS5oZWlnaHQoJzEwMCUnKTtcblxuXHRcdFx0Ly8galF1ZXJ5IGRvZXMgbm90IHJldHVybiByZWxpYWJsZSByZXN1bHQgZm9yIElFXG5cdFx0XHRpZiAoSUUpIHtcblx0XHRcdFx0b2Zmc2V0V2lkdGggPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0V2lkdGgsIGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGgpO1xuXG5cdFx0XHRcdGlmIChELndpZHRoKCkgPiBvZmZzZXRXaWR0aCkge1xuXHRcdFx0XHRcdHdpZHRoID0gRC53aWR0aCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSBpZiAoRC53aWR0aCgpID4gVy53aWR0aCgpKSB7XG5cdFx0XHRcdHdpZHRoID0gRC53aWR0aCgpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLm92ZXJsYXkud2lkdGgod2lkdGgpLmhlaWdodChELmhlaWdodCgpKTtcblx0XHR9LFxuXG5cdFx0Ly8gVGhpcyBpcyB3aGVyZSB3ZSBjYW4gbWFuaXB1bGF0ZSBET00sIGJlY2F1c2UgbGF0ZXIgaXQgd291bGQgY2F1c2UgaWZyYW1lcyB0byByZWxvYWRcblx0XHRvblJlYWR5IDogZnVuY3Rpb24gKG9wdHMsIG9iaikge1xuXHRcdFx0dmFyIG92ZXJsYXkgPSB0aGlzLm92ZXJsYXk7XG5cblx0XHRcdCQoJy5mYW5jeWJveC1vdmVybGF5Jykuc3RvcCh0cnVlLCB0cnVlKTtcblxuXHRcdFx0aWYgKCFvdmVybGF5KSB7XG5cdFx0XHRcdHRoaXMuY3JlYXRlKG9wdHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0cy5sb2NrZWQgJiYgdGhpcy5maXhlZCAmJiBvYmouZml4ZWQpIHtcblx0XHRcdFx0b2JqLmxvY2tlZCA9IHRoaXMub3ZlcmxheS5hcHBlbmQoIG9iai53cmFwICk7XG5cdFx0XHRcdG9iai5maXhlZCAgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdHMuc2hvd0Vhcmx5ID09PSB0cnVlKSB7XG5cdFx0XHRcdHRoaXMuYmVmb3JlU2hvdy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRiZWZvcmVTaG93IDogZnVuY3Rpb24ob3B0cywgb2JqKSB7XG5cdFx0XHRpZiAob2JqLmxvY2tlZCAmJiAhdGhpcy5lbC5oYXNDbGFzcygnZmFuY3lib3gtbG9jaycpKSB7XG5cdFx0XHRcdGlmICh0aGlzLmZpeFBvc2l0aW9uICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdCQoJyonKS5maWx0ZXIoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdHJldHVybiAoJCh0aGlzKS5jc3MoJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCcgJiYgISQodGhpcykuaGFzQ2xhc3MoXCJmYW5jeWJveC1vdmVybGF5XCIpICYmICEkKHRoaXMpLmhhc0NsYXNzKFwiZmFuY3lib3gtd3JhcFwiKSApO1xuXHRcdFx0XHRcdH0pLmFkZENsYXNzKCdmYW5jeWJveC1tYXJnaW4nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuZWwuYWRkQ2xhc3MoJ2ZhbmN5Ym94LW1hcmdpbicpO1xuXG5cdFx0XHRcdHRoaXMuc2Nyb2xsViA9IFcuc2Nyb2xsVG9wKCk7XG5cdFx0XHRcdHRoaXMuc2Nyb2xsSCA9IFcuc2Nyb2xsTGVmdCgpO1xuXG5cdFx0XHRcdHRoaXMuZWwuYWRkQ2xhc3MoJ2ZhbmN5Ym94LWxvY2snKTtcblxuXHRcdFx0XHRXLnNjcm9sbFRvcCggdGhpcy5zY3JvbGxWICkuc2Nyb2xsTGVmdCggdGhpcy5zY3JvbGxIICk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMub3BlbihvcHRzKTtcblx0XHR9LFxuXG5cdFx0b25VcGRhdGUgOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5maXhlZCkge1xuXHRcdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRhZnRlckNsb3NlOiBmdW5jdGlvbiAob3B0cykge1xuXHRcdFx0Ly8gUmVtb3ZlIG92ZXJsYXkgaWYgZXhpc3RzIGFuZCBmYW5jeUJveCBpcyBub3Qgb3BlbmluZ1xuXHRcdFx0Ly8gKGUuZy4sIGl0IGlzIG5vdCBiZWluZyBvcGVuIHVzaW5nIGFmdGVyQ2xvc2UgY2FsbGJhY2spXG5cdFx0XHRpZiAodGhpcy5vdmVybGF5ICYmICFGLmNvbWluZykge1xuXHRcdFx0XHR0aGlzLm92ZXJsYXkuZmFkZU91dChvcHRzLnNwZWVkT3V0LCAkLnByb3h5KCB0aGlzLmNsb3NlLCB0aGlzICkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvKlxuXHQgKlx0VGl0bGUgaGVscGVyXG5cdCAqL1xuXG5cdEYuaGVscGVycy50aXRsZSA9IHtcblx0XHRkZWZhdWx0cyA6IHtcblx0XHRcdHR5cGUgICAgIDogJ2Zsb2F0JywgLy8gJ2Zsb2F0JywgJ2luc2lkZScsICdvdXRzaWRlJyBvciAnb3ZlcicsXG5cdFx0XHRwb3NpdGlvbiA6ICdib3R0b20nIC8vICd0b3AnIG9yICdib3R0b20nXG5cdFx0fSxcblxuXHRcdGJlZm9yZVNob3c6IGZ1bmN0aW9uIChvcHRzKSB7XG5cdFx0XHR2YXIgY3VycmVudCA9IEYuY3VycmVudCxcblx0XHRcdFx0dGV4dCAgICA9IGN1cnJlbnQudGl0bGUsXG5cdFx0XHRcdHR5cGUgICAgPSBvcHRzLnR5cGUsXG5cdFx0XHRcdHRpdGxlLFxuXHRcdFx0XHR0YXJnZXQ7XG5cblx0XHRcdGlmICgkLmlzRnVuY3Rpb24odGV4dCkpIHtcblx0XHRcdFx0dGV4dCA9IHRleHQuY2FsbChjdXJyZW50LmVsZW1lbnQsIGN1cnJlbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWlzU3RyaW5nKHRleHQpIHx8ICQudHJpbSh0ZXh0KSA9PT0gJycpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0aXRsZSA9ICQoJzxkaXYgY2xhc3M9XCJmYW5jeWJveC10aXRsZSBmYW5jeWJveC10aXRsZS0nICsgdHlwZSArICctd3JhcFwiPicgKyB0ZXh0ICsgJzwvZGl2PicpO1xuXG5cdFx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdFx0Y2FzZSAnaW5zaWRlJzpcblx0XHRcdFx0XHR0YXJnZXQgPSBGLnNraW47XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJ291dHNpZGUnOlxuXHRcdFx0XHRcdHRhcmdldCA9IEYud3JhcDtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSAnb3Zlcic6XG5cdFx0XHRcdFx0dGFyZ2V0ID0gRi5pbm5lcjtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDogLy8gJ2Zsb2F0J1xuXHRcdFx0XHRcdHRhcmdldCA9IEYuc2tpbjtcblxuXHRcdFx0XHRcdHRpdGxlLmFwcGVuZFRvKCdib2R5Jyk7XG5cblx0XHRcdFx0XHRpZiAoSUUpIHtcblx0XHRcdFx0XHRcdHRpdGxlLndpZHRoKCB0aXRsZS53aWR0aCgpICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGl0bGUud3JhcElubmVyKCc8c3BhbiBjbGFzcz1cImNoaWxkXCI+PC9zcGFuPicpO1xuXG5cdFx0XHRcdFx0Ly9JbmNyZWFzZSBib3R0b20gbWFyZ2luIHNvIHRoaXMgdGl0bGUgd2lsbCBhbHNvIGZpdCBpbnRvIHZpZXdwb3J0XG5cdFx0XHRcdFx0Ri5jdXJyZW50Lm1hcmdpblsyXSArPSBNYXRoLmFicyggZ2V0U2NhbGFyKHRpdGxlLmNzcygnbWFyZ2luLWJvdHRvbScpKSApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0dGl0bGVbIChvcHRzLnBvc2l0aW9uID09PSAndG9wJyA/ICdwcmVwZW5kVG8nICA6ICdhcHBlbmRUbycpIF0odGFyZ2V0KTtcblx0XHR9XG5cdH07XG5cblx0Ly8galF1ZXJ5IHBsdWdpbiBpbml0aWFsaXphdGlvblxuXHQkLmZuLmZhbmN5Ym94ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHR2YXIgaW5kZXgsXG5cdFx0XHR0aGF0ICAgICA9ICQodGhpcyksXG5cdFx0XHRzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3IgfHwgJycsXG5cdFx0XHRydW4gICAgICA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0dmFyIHdoYXQgPSAkKHRoaXMpLmJsdXIoKSwgaWR4ID0gaW5kZXgsIHJlbFR5cGUsIHJlbFZhbDtcblxuXHRcdFx0XHRpZiAoIShlLmN0cmxLZXkgfHwgZS5hbHRLZXkgfHwgZS5zaGlmdEtleSB8fCBlLm1ldGFLZXkpICYmICF3aGF0LmlzKCcuZmFuY3lib3gtd3JhcCcpKSB7XG5cdFx0XHRcdFx0cmVsVHlwZSA9IG9wdGlvbnMuZ3JvdXBBdHRyIHx8ICdkYXRhLWZhbmN5Ym94LWdyb3VwJztcblx0XHRcdFx0XHRyZWxWYWwgID0gd2hhdC5hdHRyKHJlbFR5cGUpO1xuXG5cdFx0XHRcdFx0aWYgKCFyZWxWYWwpIHtcblx0XHRcdFx0XHRcdHJlbFR5cGUgPSAncmVsJztcblx0XHRcdFx0XHRcdHJlbFZhbCAgPSB3aGF0LmdldCgwKVsgcmVsVHlwZSBdO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChyZWxWYWwgJiYgcmVsVmFsICE9PSAnJyAmJiByZWxWYWwgIT09ICdub2ZvbGxvdycpIHtcblx0XHRcdFx0XHRcdHdoYXQgPSBzZWxlY3Rvci5sZW5ndGggPyAkKHNlbGVjdG9yKSA6IHRoYXQ7XG5cdFx0XHRcdFx0XHR3aGF0ID0gd2hhdC5maWx0ZXIoJ1snICsgcmVsVHlwZSArICc9XCInICsgcmVsVmFsICsgJ1wiXScpO1xuXHRcdFx0XHRcdFx0aWR4ICA9IHdoYXQuaW5kZXgodGhpcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3B0aW9ucy5pbmRleCA9IGlkeDtcblxuXHRcdFx0XHRcdC8vIFN0b3AgYW4gZXZlbnQgZnJvbSBidWJibGluZyBpZiBldmVyeXRoaW5nIGlzIGZpbmVcblx0XHRcdFx0XHRpZiAoRi5vcGVuKHdoYXQsIG9wdGlvbnMpICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRcdGluZGV4ICAgPSBvcHRpb25zLmluZGV4IHx8IDA7XG5cblx0XHRpZiAoIXNlbGVjdG9yIHx8IG9wdGlvbnMubGl2ZSA9PT0gZmFsc2UpIHtcblx0XHRcdHRoYXQudW5iaW5kKCdjbGljay5mYi1zdGFydCcpLmJpbmQoJ2NsaWNrLmZiLXN0YXJ0JywgcnVuKTtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRELnVuZGVsZWdhdGUoc2VsZWN0b3IsICdjbGljay5mYi1zdGFydCcpLmRlbGVnYXRlKHNlbGVjdG9yICsgXCI6bm90KCcuZmFuY3lib3gtaXRlbSwgLmZhbmN5Ym94LW5hdicpXCIsICdjbGljay5mYi1zdGFydCcsIHJ1bik7XG5cdFx0fVxuXG5cdFx0dGhpcy5maWx0ZXIoJ1tkYXRhLWZhbmN5Ym94LXN0YXJ0PTFdJykudHJpZ2dlcignY2xpY2snKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9O1xuXG5cdC8vIFRlc3RzIHRoYXQgbmVlZCBhIGJvZHkgYXQgZG9jIHJlYWR5XG5cdEQucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHcxLCB3MjtcblxuXHRcdGlmICggJC5zY3JvbGxiYXJXaWR0aCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0Ly8gaHR0cDovL2JlbmFsbWFuLmNvbS9wcm9qZWN0cy9qcXVlcnktbWlzYy1wbHVnaW5zLyNzY3JvbGxiYXJ3aWR0aFxuXHRcdFx0JC5zY3JvbGxiYXJXaWR0aCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgcGFyZW50ID0gJCgnPGRpdiBzdHlsZT1cIndpZHRoOjUwcHg7aGVpZ2h0OjUwcHg7b3ZlcmZsb3c6YXV0b1wiPjxkaXYvPjwvZGl2PicpLmFwcGVuZFRvKCdib2R5JyksXG5cdFx0XHRcdFx0Y2hpbGQgID0gcGFyZW50LmNoaWxkcmVuKCksXG5cdFx0XHRcdFx0d2lkdGggID0gY2hpbGQuaW5uZXJXaWR0aCgpIC0gY2hpbGQuaGVpZ2h0KCA5OSApLmlubmVyV2lkdGgoKTtcblxuXHRcdFx0XHRwYXJlbnQucmVtb3ZlKCk7XG5cblx0XHRcdFx0cmV0dXJuIHdpZHRoO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAoICQuc3VwcG9ydC5maXhlZFBvc2l0aW9uID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHQkLnN1cHBvcnQuZml4ZWRQb3NpdGlvbiA9IChmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGVsZW0gID0gJCgnPGRpdiBzdHlsZT1cInBvc2l0aW9uOmZpeGVkO3RvcDoyMHB4O1wiPjwvZGl2PicpLmFwcGVuZFRvKCdib2R5JyksXG5cdFx0XHRcdFx0Zml4ZWQgPSAoIGVsZW1bMF0ub2Zmc2V0VG9wID09PSAyMCB8fCBlbGVtWzBdLm9mZnNldFRvcCA9PT0gMTUgKTtcblxuXHRcdFx0XHRlbGVtLnJlbW92ZSgpO1xuXG5cdFx0XHRcdHJldHVybiBmaXhlZDtcblx0XHRcdH0oKSk7XG5cdFx0fVxuXG5cdFx0JC5leHRlbmQoRi5kZWZhdWx0cywge1xuXHRcdFx0c2Nyb2xsYmFyV2lkdGggOiAkLnNjcm9sbGJhcldpZHRoKCksXG5cdFx0XHRmaXhlZCAgOiAkLnN1cHBvcnQuZml4ZWRQb3NpdGlvbixcblx0XHRcdHBhcmVudCA6ICQoJ2JvZHknKVxuXHRcdH0pO1xuXG5cdFx0Ly9HZXQgcmVhbCB3aWR0aCBvZiBwYWdlIHNjcm9sbC1iYXJcblx0XHR3MSA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0SC5hZGRDbGFzcygnZmFuY3lib3gtbG9jay10ZXN0Jyk7XG5cblx0XHR3MiA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0SC5yZW1vdmVDbGFzcygnZmFuY3lib3gtbG9jay10ZXN0Jyk7XG5cblx0XHQkKFwiPHN0eWxlIHR5cGU9J3RleHQvY3NzJz4uZmFuY3lib3gtbWFyZ2lue21hcmdpbi1yaWdodDpcIiArICh3MiAtIHcxKSArIFwicHg7fTwvc3R5bGU+XCIpLmFwcGVuZFRvKFwiaGVhZFwiKTtcblx0fSk7XG5cbn0od2luZG93LCBkb2N1bWVudCwgalF1ZXJ5KSk7Il19
