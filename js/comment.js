(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/* global define */

/* eslint-disable strict */

;(function ($) {
  'use strict'

  /**
   * Add integers, wrapping at 2^32.
   * This uses 16-bit operations internally to work around bugs in interpreters.
   *
   * @param {number} x First integer
   * @param {number} y Second integer
   * @returns {number} Sum
   */
  function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  /**
   * Bitwise rotate a 32-bit number to the left.
   *
   * @param {number} num 32-bit number
   * @param {number} cnt Rotation count
   * @returns {number} Rotated number
   */
  function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} q q
   * @param {number} a a
   * @param {number} b b
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  /**
   * Calculate the MD5 of an array of little-endian words, and a bit length.
   *
   * @param {Array} x Array of little-endian words
   * @param {number} len Bit length
   * @returns {Array<number>} MD5 Array
   */
  function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5ff(a, b, c, d, x[i], 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5gg(b, c, d, a, x[i], 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5hh(d, a, b, c, x[i], 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5ii(a, b, c, d, x[i], 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  /**
   * Convert an array of little-endian words to a string
   *
   * @param {Array<number>} input MD5 Array
   * @returns {string} MD5 string
   */
  function binl2rstr(input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff)
    }
    return output
  }

  /**
   * Convert a raw string to an array of little-endian words
   * Characters >255 have their high-byte silently ignored.
   *
   * @param {string} input Raw input string
   * @returns {Array<number>} Array of little-endian words
   */
  function rstr2binl(input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32
    }
    return output
  }

  /**
   * Calculate the MD5 of a raw string
   *
   * @param {string} s Input string
   * @returns {string} Raw MD5 string
   */
  function rstrMD5(s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
  }

  /**
   * Calculates the HMAC-MD5 of a key and some data (raw strings)
   *
   * @param {string} key HMAC key
   * @param {string} data Raw input string
   * @returns {string} Raw MD5 string
   */
  function rstrHMACMD5(key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5c5c5c5c
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  }

  /**
   * Convert a raw string to a hex string
   *
   * @param {string} input Raw input string
   * @returns {string} Hex encoded string
   */
  function rstr2hex(input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
    }
    return output
  }

  /**
   * Encode a string as UTF-8
   *
   * @param {string} input Input string
   * @returns {string} UTF8 string
   */
  function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input))
  }

  /**
   * Encodes input string as raw MD5 string
   *
   * @param {string} s Input string
   * @returns {string} Raw MD5 string
   */
  function rawMD5(s) {
    return rstrMD5(str2rstrUTF8(s))
  }
  /**
   * Encodes input string as Hex encoded string
   *
   * @param {string} s Input string
   * @returns {string} Hex encoded string
   */
  function hexMD5(s) {
    return rstr2hex(rawMD5(s))
  }
  /**
   * Calculates the raw HMAC-MD5 for the given key and data
   *
   * @param {string} k HMAC key
   * @param {string} d Input string
   * @returns {string} Raw MD5 string
   */
  function rawHMACMD5(k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
  }
  /**
   * Calculates the Hex encoded HMAC-MD5 for the given key and data
   *
   * @param {string} k HMAC key
   * @param {string} d Input string
   * @returns {string} Raw MD5 string
   */
  function hexHMACMD5(k, d) {
    return rstr2hex(rawHMACMD5(k, d))
  }

  /**
   * Calculates MD5 value for a given string.
   * If a key is provided, calculates the HMAC-MD5 value.
   * Returns a Hex encoded string unless the raw argument is given.
   *
   * @param {string} string Input string
   * @param {string} [key] HMAC key
   * @param {boolean} [raw] Raw output switch
   * @returns {string} MD5 output
   */
  function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string)
      }
      return rawMD5(string)
    }
    if (!raw) {
      return hexHMACMD5(key, string)
    }
    return rawHMACMD5(key, string)
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return md5
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
})(this)

},{}],2:[function(require,module,exports){
"use strict";

var _blueimpMd = _interopRequireDefault(require("blueimp-md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function () {
  var dom = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]; // 装评论模块的盒子

  var node = document.getElementById('gitalk_container'); // script节点

  var jsNode = document.getElementById('comment_js_file');

  if (!node) {
    return;
  }

  if (!jsNode) {
    return;
  } // 获取配置信息


  var js = jsNode.getAttribute('data-js');
  var css = jsNode.getAttribute('data-css');
  var clientID = jsNode.getAttribute('data-clientID');
  var clientSecret = jsNode.getAttribute('data-clientSecret');
  var repo = jsNode.getAttribute('data-repo');
  var owner = jsNode.getAttribute('data-owner');
  var admin = jsNode.getAttribute('data-admin');
  var path = jsNode.getAttribute('data-path') || '';

  if (!js || !css || !clientID || !clientSecret || !repo || !owner || !admin || !path) {
    return;
  } // 用于 id 前缀，防止 md5 之后的值相同


  var date = jsNode.getAttribute('data-date') || '';
  var id = date + '-' + (0, _blueimpMd["default"])(path); // 用于处理配置的 admin 字段不是字符串，是数组情况

  try {
    admin = JSON.parse(admin);
  } catch (e) {}

  var talkJs = document.createElement('script');
  talkJs.addEventListener('load', function () {
    // 文件加载成功初始评论
    var gitalk = new Gitalk({
      clientID: clientID,
      clientSecret: clientSecret,
      repo: repo,
      owner: owner,
      admin: admin,
      id: id // distractionFreeMode: true,

    });
    gitalk.render('gitalk_container');
  });
  talkJs.async = true;
  talkJs.src = js;
  var talkCss = document.createElement('link');
  talkCss.setAttribute('rel', 'stylesheet');
  talkCss.setAttribute('href', css);
  dom.appendChild(talkJs);
  dom.appendChild(talkCss);
})();

},{"blueimp-md5":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmx1ZWltcC1tZDUvanMvbWQ1LmpzIiwidGhlbWVzL2xhbmRzY2FwZS9zb3VyY2UvanMvY29tbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUp3QjtBQUt4QixNQUFBLEtBQUssRUFBTCxLQUx3QjtBQU14QixNQUFBLEVBQUUsRUFBRixFQU53QixDQU94Qjs7QUFQd0IsS0FBWCxDQUFmO0FBU0EsSUFBQSxNQUFNLENBQUMsTUFBUCxDQUFjLGtCQUFkO0FBQ0QsR0FaRDtBQWFBLEVBQUEsTUFBTSxDQUFDLEtBQVAsR0FBZSxJQUFmO0FBQ0EsRUFBQSxNQUFNLENBQUMsR0FBUCxHQUFhLEVBQWI7QUFFQSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixDQUFoQjtBQUNBLEVBQUEsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsS0FBckIsRUFBNEIsWUFBNUI7QUFDQSxFQUFBLE9BQU8sQ0FBQyxZQUFSLENBQXFCLE1BQXJCLEVBQTZCLEdBQTdCO0FBRUEsRUFBQSxHQUFHLENBQUMsV0FBSixDQUFnQixNQUFoQjtBQUNBLEVBQUEsR0FBRyxDQUFDLFdBQUosQ0FBZ0IsT0FBaEI7QUFDRCxDQTdERCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXG4gKiBKYXZhU2NyaXB0IE1ENVxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1NRDVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbi8qIGVzbGludC1kaXNhYmxlIHN0cmljdCAqL1xuXG47KGZ1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIC8qKlxuICAgKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuXG4gICAqIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5IHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gaW50ZXJwcmV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0geCBGaXJzdCBpbnRlZ2VyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFNlY29uZCBpbnRlZ2VyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFN1bVxuICAgKi9cbiAgZnVuY3Rpb24gc2FmZUFkZCh4LCB5KSB7XG4gICAgdmFyIGxzdyA9ICh4ICYgMHhmZmZmKSArICh5ICYgMHhmZmZmKVxuICAgIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KVxuICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweGZmZmYpXG4gIH1cblxuICAvKipcbiAgICogQml0d2lzZSByb3RhdGUgYSAzMi1iaXQgbnVtYmVyIHRvIHRoZSBsZWZ0LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbnVtIDMyLWJpdCBudW1iZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNudCBSb3RhdGlvbiBjb3VudFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSb3RhdGVkIG51bWJlclxuICAgKi9cbiAgZnVuY3Rpb24gYml0Um90YXRlTGVmdChudW0sIGNudCkge1xuICAgIHJldHVybiAobnVtIDw8IGNudCkgfCAobnVtID4+PiAoMzIgLSBjbnQpKVxuICB9XG5cbiAgLyoqXG4gICAqIEJhc2ljIG9wZXJhdGlvbiB0aGUgYWxnb3JpdGhtIHVzZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBxIHFcbiAgICogQHBhcmFtIHtudW1iZXJ9IGEgYVxuICAgKiBAcGFyYW0ge251bWJlcn0gYiBiXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IHhcbiAgICogQHBhcmFtIHtudW1iZXJ9IHMgc1xuICAgKiBAcGFyYW0ge251bWJlcn0gdCB0XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJlc3VsdFxuICAgKi9cbiAgZnVuY3Rpb24gbWQ1Y21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgICByZXR1cm4gc2FmZUFkZChiaXRSb3RhdGVMZWZ0KHNhZmVBZGQoc2FmZUFkZChhLCBxKSwgc2FmZUFkZCh4LCB0KSksIHMpLCBiKVxuICB9XG4gIC8qKlxuICAgKiBCYXNpYyBvcGVyYXRpb24gdGhlIGFsZ29yaXRobSB1c2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gYSBhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBiIGJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGMgY1xuICAgKiBAcGFyYW0ge251bWJlcn0gZCBkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IHhcbiAgICogQHBhcmFtIHtudW1iZXJ9IHMgc1xuICAgKiBAcGFyYW0ge251bWJlcn0gdCB0XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJlc3VsdFxuICAgKi9cbiAgZnVuY3Rpb24gbWQ1ZmYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgIHJldHVybiBtZDVjbW4oKGIgJiBjKSB8ICh+YiAmIGQpLCBhLCBiLCB4LCBzLCB0KVxuICB9XG4gIC8qKlxuICAgKiBCYXNpYyBvcGVyYXRpb24gdGhlIGFsZ29yaXRobSB1c2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gYSBhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBiIGJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGMgY1xuICAgKiBAcGFyYW0ge251bWJlcn0gZCBkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IHhcbiAgICogQHBhcmFtIHtudW1iZXJ9IHMgc1xuICAgKiBAcGFyYW0ge251bWJlcn0gdCB0XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJlc3VsdFxuICAgKi9cbiAgZnVuY3Rpb24gbWQ1Z2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgIHJldHVybiBtZDVjbW4oKGIgJiBkKSB8IChjICYgfmQpLCBhLCBiLCB4LCBzLCB0KVxuICB9XG4gIC8qKlxuICAgKiBCYXNpYyBvcGVyYXRpb24gdGhlIGFsZ29yaXRobSB1c2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gYSBhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBiIGJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGMgY1xuICAgKiBAcGFyYW0ge251bWJlcn0gZCBkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IHhcbiAgICogQHBhcmFtIHtudW1iZXJ9IHMgc1xuICAgKiBAcGFyYW0ge251bWJlcn0gdCB0XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJlc3VsdFxuICAgKi9cbiAgZnVuY3Rpb24gbWQ1aGgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgIHJldHVybiBtZDVjbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KVxuICB9XG4gIC8qKlxuICAgKiBCYXNpYyBvcGVyYXRpb24gdGhlIGFsZ29yaXRobSB1c2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gYSBhXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBiIGJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGMgY1xuICAgKiBAcGFyYW0ge251bWJlcn0gZCBkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IHhcbiAgICogQHBhcmFtIHtudW1iZXJ9IHMgc1xuICAgKiBAcGFyYW0ge251bWJlcn0gdCB0XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJlc3VsdFxuICAgKi9cbiAgZnVuY3Rpb24gbWQ1aWkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuICAgIHJldHVybiBtZDVjbW4oYyBeIChiIHwgfmQpLCBhLCBiLCB4LCBzLCB0KVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGguXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHggQXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuIEJpdCBsZW5ndGhcbiAgICogQHJldHVybnMge0FycmF5PG51bWJlcj59IE1ENSBBcnJheVxuICAgKi9cbiAgZnVuY3Rpb24gYmlubE1ENSh4LCBsZW4pIHtcbiAgICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICAgIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgbGVuICUgMzJcbiAgICB4WygoKGxlbiArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsZW5cblxuICAgIHZhciBpXG4gICAgdmFyIG9sZGFcbiAgICB2YXIgb2xkYlxuICAgIHZhciBvbGRjXG4gICAgdmFyIG9sZGRcbiAgICB2YXIgYSA9IDE3MzI1ODQxOTNcbiAgICB2YXIgYiA9IC0yNzE3MzM4NzlcbiAgICB2YXIgYyA9IC0xNzMyNTg0MTk0XG4gICAgdmFyIGQgPSAyNzE3MzM4NzhcblxuICAgIGZvciAoaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgb2xkYSA9IGFcbiAgICAgIG9sZGIgPSBiXG4gICAgICBvbGRjID0gY1xuICAgICAgb2xkZCA9IGRcblxuICAgICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaV0sIDcsIC02ODA4NzY5MzYpXG4gICAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMV0sIDEyLCAtMzg5NTY0NTg2KVxuICAgICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KVxuICAgICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDNdLCAyMiwgLTEwNDQ1MjUzMzApXG4gICAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgNF0sIDcsIC0xNzY0MTg4OTcpXG4gICAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KVxuICAgICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNywgLTE0NzMyMzEzNDEpXG4gICAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgN10sIDIyLCAtNDU3MDU5ODMpXG4gICAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpXG4gICAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgOV0sIDEyLCAtMTk1ODQxNDQxNylcbiAgICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpXG4gICAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpXG4gICAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgMTJdLCA3LCAxODA0NjAzNjgyKVxuICAgICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSlcbiAgICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MClcbiAgICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxNV0sIDIyLCAxMjM2NTM1MzI5KVxuXG4gICAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApXG4gICAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgNl0sIDksIC0xMDY5NTAxNjMyKVxuICAgICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMylcbiAgICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMilcbiAgICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSlcbiAgICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKVxuICAgICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpXG4gICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KVxuICAgICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpXG4gICAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MClcbiAgICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTQsIC0xODczNjM5NjEpXG4gICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKVxuICAgICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpXG4gICAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMl0sIDksIC01MTQwMzc4NClcbiAgICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpXG4gICAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpXG5cbiAgICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNCwgLTM3ODU1OClcbiAgICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA4XSwgMTEsIC0yMDIyNTc0NDYzKVxuICAgICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpXG4gICAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMTRdLCAyMywgLTM1MzA5NTU2KVxuICAgICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA0LCAtMTUzMDk5MjA2MClcbiAgICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpXG4gICAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgN10sIDE2LCAtMTU1NDk3NjMyKVxuICAgICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKVxuICAgICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KVxuICAgICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaV0sIDExLCAtMzU4NTM3MjIyKVxuICAgICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNiwgLTcyMjUyMTk3OSlcbiAgICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KVxuICAgICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDldLCA0LCAtNjQwMzY0NDg3KVxuICAgICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpXG4gICAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKVxuICAgICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDJdLCAyMywgLTk5NTMzODY1MSlcblxuICAgICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaV0sIDYsIC0xOTg2MzA4NDQpXG4gICAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgN10sIDEwLCAxMTI2ODkxNDE1KVxuICAgICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KVxuICAgICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDVdLCAyMSwgLTU3NDM0MDU1KVxuICAgICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNiwgMTcwMDQ4NTU3MSlcbiAgICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KVxuICAgICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDEwXSwgMTUsIC0xMDUxNTIzKVxuICAgICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDFdLCAyMSwgLTIwNTQ5MjI3OTkpXG4gICAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpXG4gICAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTVdLCAxMCwgLTMwNjExNzQ0KVxuICAgICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNSwgLTE1NjAxOTgzODApXG4gICAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSlcbiAgICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA0XSwgNiwgLTE0NTUyMzA3MClcbiAgICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSlcbiAgICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSlcbiAgICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA5XSwgMjEsIC0zNDM0ODU1NTEpXG5cbiAgICAgIGEgPSBzYWZlQWRkKGEsIG9sZGEpXG4gICAgICBiID0gc2FmZUFkZChiLCBvbGRiKVxuICAgICAgYyA9IHNhZmVBZGQoYywgb2xkYylcbiAgICAgIGQgPSBzYWZlQWRkKGQsIG9sZGQpXG4gICAgfVxuICAgIHJldHVybiBbYSwgYiwgYywgZF1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYSBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBpbnB1dCBNRDUgQXJyYXlcbiAgICogQHJldHVybnMge3N0cmluZ30gTUQ1IHN0cmluZ1xuICAgKi9cbiAgZnVuY3Rpb24gYmlubDJyc3RyKGlucHV0KSB7XG4gICAgdmFyIGlcbiAgICB2YXIgb3V0cHV0ID0gJydcbiAgICB2YXIgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMlxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgzMjsgaSArPSA4KSB7XG4gICAgICBvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoaW5wdXRbaSA+PiA1XSA+Pj4gaSAlIDMyKSAmIDB4ZmYpXG4gICAgfVxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgcmF3IHN0cmluZyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXG4gICAqIENoYXJhY3RlcnMgPjI1NSBoYXZlIHRoZWlyIGhpZ2gtYnl0ZSBzaWxlbnRseSBpZ25vcmVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgUmF3IGlucHV0IHN0cmluZ1xuICAgKiBAcmV0dXJucyB7QXJyYXk8bnVtYmVyPn0gQXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICAgKi9cbiAgZnVuY3Rpb24gcnN0cjJiaW5sKGlucHV0KSB7XG4gICAgdmFyIGlcbiAgICB2YXIgb3V0cHV0ID0gW11cbiAgICBvdXRwdXRbKGlucHV0Lmxlbmd0aCA+PiAyKSAtIDFdID0gdW5kZWZpbmVkXG4gICAgZm9yIChpID0gMDsgaSA8IG91dHB1dC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgb3V0cHV0W2ldID0gMFxuICAgIH1cbiAgICB2YXIgbGVuZ3RoOCA9IGlucHV0Lmxlbmd0aCAqIDhcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoODsgaSArPSA4KSB7XG4gICAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXQuY2hhckNvZGVBdChpIC8gOCkgJiAweGZmKSA8PCBpICUgMzJcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGEgcmF3IHN0cmluZ1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcyBJbnB1dCBzdHJpbmdcbiAgICogQHJldHVybnMge3N0cmluZ30gUmF3IE1ENSBzdHJpbmdcbiAgICovXG4gIGZ1bmN0aW9uIHJzdHJNRDUocykge1xuICAgIHJldHVybiBiaW5sMnJzdHIoYmlubE1ENShyc3RyMmJpbmwocyksIHMubGVuZ3RoICogOCkpXG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgSE1BQy1NRDUgb2YgYSBrZXkgYW5kIHNvbWUgZGF0YSAocmF3IHN0cmluZ3MpXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgSE1BQyBrZXlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgUmF3IGlucHV0IHN0cmluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSYXcgTUQ1IHN0cmluZ1xuICAgKi9cbiAgZnVuY3Rpb24gcnN0ckhNQUNNRDUoa2V5LCBkYXRhKSB7XG4gICAgdmFyIGlcbiAgICB2YXIgYmtleSA9IHJzdHIyYmlubChrZXkpXG4gICAgdmFyIGlwYWQgPSBbXVxuICAgIHZhciBvcGFkID0gW11cbiAgICB2YXIgaGFzaFxuICAgIGlwYWRbMTVdID0gb3BhZFsxNV0gPSB1bmRlZmluZWRcbiAgICBpZiAoYmtleS5sZW5ndGggPiAxNikge1xuICAgICAgYmtleSA9IGJpbmxNRDUoYmtleSwga2V5Lmxlbmd0aCAqIDgpXG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAxNjsgaSArPSAxKSB7XG4gICAgICBpcGFkW2ldID0gYmtleVtpXSBeIDB4MzYzNjM2MzZcbiAgICAgIG9wYWRbaV0gPSBia2V5W2ldIF4gMHg1YzVjNWM1Y1xuICAgIH1cbiAgICBoYXNoID0gYmlubE1ENShpcGFkLmNvbmNhdChyc3RyMmJpbmwoZGF0YSkpLCA1MTIgKyBkYXRhLmxlbmd0aCAqIDgpXG4gICAgcmV0dXJuIGJpbmwycnN0cihiaW5sTUQ1KG9wYWQuY29uY2F0KGhhc2gpLCA1MTIgKyAxMjgpKVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSByYXcgc3RyaW5nIHRvIGEgaGV4IHN0cmluZ1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgUmF3IGlucHV0IHN0cmluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBIZXggZW5jb2RlZCBzdHJpbmdcbiAgICovXG4gIGZ1bmN0aW9uIHJzdHIyaGV4KGlucHV0KSB7XG4gICAgdmFyIGhleFRhYiA9ICcwMTIzNDU2Nzg5YWJjZGVmJ1xuICAgIHZhciBvdXRwdXQgPSAnJ1xuICAgIHZhciB4XG4gICAgdmFyIGlcbiAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHggPSBpbnB1dC5jaGFyQ29kZUF0KGkpXG4gICAgICBvdXRwdXQgKz0gaGV4VGFiLmNoYXJBdCgoeCA+Pj4gNCkgJiAweDBmKSArIGhleFRhYi5jaGFyQXQoeCAmIDB4MGYpXG4gICAgfVxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmNvZGUgYSBzdHJpbmcgYXMgVVRGLThcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IElucHV0IHN0cmluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBVVEY4IHN0cmluZ1xuICAgKi9cbiAgZnVuY3Rpb24gc3RyMnJzdHJVVEY4KGlucHV0KSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChpbnB1dCkpXG4gIH1cblxuICAvKipcbiAgICogRW5jb2RlcyBpbnB1dCBzdHJpbmcgYXMgcmF3IE1ENSBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHMgSW5wdXQgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJhdyBNRDUgc3RyaW5nXG4gICAqL1xuICBmdW5jdGlvbiByYXdNRDUocykge1xuICAgIHJldHVybiByc3RyTUQ1KHN0cjJyc3RyVVRGOChzKSlcbiAgfVxuICAvKipcbiAgICogRW5jb2RlcyBpbnB1dCBzdHJpbmcgYXMgSGV4IGVuY29kZWQgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzIElucHV0IHN0cmluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBIZXggZW5jb2RlZCBzdHJpbmdcbiAgICovXG4gIGZ1bmN0aW9uIGhleE1ENShzKSB7XG4gICAgcmV0dXJuIHJzdHIyaGV4KHJhd01ENShzKSlcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgcmF3IEhNQUMtTUQ1IGZvciB0aGUgZ2l2ZW4ga2V5IGFuZCBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrIEhNQUMga2V5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkIElucHV0IHN0cmluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSYXcgTUQ1IHN0cmluZ1xuICAgKi9cbiAgZnVuY3Rpb24gcmF3SE1BQ01ENShrLCBkKSB7XG4gICAgcmV0dXJuIHJzdHJITUFDTUQ1KHN0cjJyc3RyVVRGOChrKSwgc3RyMnJzdHJVVEY4KGQpKVxuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBIZXggZW5jb2RlZCBITUFDLU1ENSBmb3IgdGhlIGdpdmVuIGtleSBhbmQgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gayBITUFDIGtleVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZCBJbnB1dCBzdHJpbmdcbiAgICogQHJldHVybnMge3N0cmluZ30gUmF3IE1ENSBzdHJpbmdcbiAgICovXG4gIGZ1bmN0aW9uIGhleEhNQUNNRDUoaywgZCkge1xuICAgIHJldHVybiByc3RyMmhleChyYXdITUFDTUQ1KGssIGQpKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgTUQ1IHZhbHVlIGZvciBhIGdpdmVuIHN0cmluZy5cbiAgICogSWYgYSBrZXkgaXMgcHJvdmlkZWQsIGNhbGN1bGF0ZXMgdGhlIEhNQUMtTUQ1IHZhbHVlLlxuICAgKiBSZXR1cm5zIGEgSGV4IGVuY29kZWQgc3RyaW5nIHVubGVzcyB0aGUgcmF3IGFyZ3VtZW50IGlzIGdpdmVuLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIElucHV0IHN0cmluZ1xuICAgKiBAcGFyYW0ge3N0cmluZ30gW2tleV0gSE1BQyBrZXlcbiAgICogQHBhcmFtIHtib29sZWFufSBbcmF3XSBSYXcgb3V0cHV0IHN3aXRjaFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBNRDUgb3V0cHV0XG4gICAqL1xuICBmdW5jdGlvbiBtZDUoc3RyaW5nLCBrZXksIHJhdykge1xuICAgIGlmICgha2V5KSB7XG4gICAgICBpZiAoIXJhdykge1xuICAgICAgICByZXR1cm4gaGV4TUQ1KHN0cmluZylcbiAgICAgIH1cbiAgICAgIHJldHVybiByYXdNRDUoc3RyaW5nKVxuICAgIH1cbiAgICBpZiAoIXJhdykge1xuICAgICAgcmV0dXJuIGhleEhNQUNNRDUoa2V5LCBzdHJpbmcpXG4gICAgfVxuICAgIHJldHVybiByYXdITUFDTUQ1KGtleSwgc3RyaW5nKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbWQ1XG4gICAgfSlcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gbWQ1XG4gIH0gZWxzZSB7XG4gICAgJC5tZDUgPSBtZDVcbiAgfVxufSkodGhpcylcbiIsImltcG9ydCBtZDUgZnJvbSAnYmx1ZWltcC1tZDUnO1xuXG4oZnVuY3Rpb24gKCl7XG5cbiAgY29uc3QgZG9tID0gKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0gfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSk7XG4gIC8vIOijheivhOiuuuaooeWdl+eahOebkuWtkFxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpdGFsa19jb250YWluZXInKTtcbiAgLy8gc2NyaXB06IqC54K5XG4gIGNvbnN0IGpzTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50X2pzX2ZpbGUnKTtcblxuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIWpzTm9kZSkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyDojrflj5bphY3nva7kv6Hmga9cbiAgY29uc3QganMgPSBqc05vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWpzJyk7XG4gIGNvbnN0IGNzcyA9IGpzTm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY3NzJyk7XG4gIGNvbnN0IGNsaWVudElEID0ganNOb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1jbGllbnRJRCcpO1xuICBjb25zdCBjbGllbnRTZWNyZXQgPSBqc05vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWNsaWVudFNlY3JldCcpO1xuICBjb25zdCByZXBvID0ganNOb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1yZXBvJyk7XG4gIGNvbnN0IG93bmVyID0ganNOb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1vd25lcicpO1xuICBsZXQgYWRtaW4gPSBqc05vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWFkbWluJyk7XG4gIGNvbnN0IHBhdGggPSBqc05vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXBhdGgnKSB8fCAnJztcblxuICBpZiAoIWpzIHx8ICFjc3MgfHwgIWNsaWVudElEIHx8ICFjbGllbnRTZWNyZXQgfHwgIXJlcG8gfHwgIW93bmVyIHx8ICFhZG1pbiB8fCAhcGF0aCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIOeUqOS6jiBpZCDliY3nvIDvvIzpmLLmraIgbWQ1IOS5i+WQjueahOWAvOebuOWQjFxuICBjb25zdCBkYXRlID0ganNOb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1kYXRlJykgfHwgJyc7XG4gIGNvbnN0IGlkID0gZGF0ZSArICctJyArIG1kNShwYXRoKTtcblxuICAvLyDnlKjkuo7lpITnkIbphY3nva7nmoQgYWRtaW4g5a2X5q615LiN5piv5a2X56ym5Liy77yM5piv5pWw57uE5oOF5Ya1XG4gIHRyeSB7XG4gICAgYWRtaW4gPSBKU09OLnBhcnNlKGFkbWluKVxuICB9IGNhdGNoIChlKSB7fVxuXG4gIGNvbnN0IHRhbGtKcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICB0YWxrSnMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyDmlofku7bliqDovb3miJDlip/liJ3lp4vor4TorrpcbiAgICBjb25zdCBnaXRhbGsgPSBuZXcgR2l0YWxrKHtcbiAgICAgIGNsaWVudElELFxuICAgICAgY2xpZW50U2VjcmV0LFxuICAgICAgcmVwbyxcbiAgICAgIG93bmVyLFxuICAgICAgYWRtaW4sXG4gICAgICBpZCxcbiAgICAgIC8vIGRpc3RyYWN0aW9uRnJlZU1vZGU6IHRydWUsXG4gICAgfSk7XG4gICAgZ2l0YWxrLnJlbmRlcignZ2l0YWxrX2NvbnRhaW5lcicpO1xuICB9KTtcbiAgdGFsa0pzLmFzeW5jID0gdHJ1ZTtcbiAgdGFsa0pzLnNyYyA9IGpzO1xuXG4gIGNvbnN0IHRhbGtDc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gIHRhbGtDc3Muc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xuICB0YWxrQ3NzLnNldEF0dHJpYnV0ZSgnaHJlZicsIGNzcyk7XG5cbiAgZG9tLmFwcGVuZENoaWxkKHRhbGtKcyk7XG4gIGRvbS5hcHBlbmRDaGlsZCh0YWxrQ3NzKTtcbn0pKCk7Il19
