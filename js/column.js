(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  function $() {
    return Array.prototype.slice.call(document.querySelectorAll.apply(document, arguments));
  } // copy widgets in the right column, when exist, to the bottom of the left column


  if ($('.columns .column-right').length && $('.columns .column-right-shadow').length && !$('.columns .column-right-shadow')[0].children.length) {
    var _iterator = _createForOfIteratorHelper($('.columns .column-right')[0].children),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;
        $('.columns .column-right-shadow')[0].append(child.cloneNode(true));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
})();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaGV4by10aGVtZS1pY2FydXMvc291cmNlL2pzL2NvbHVtbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUMsYUFBVztBQUNSLFdBQVMsQ0FBVCxHQUFhO0FBQ1QsV0FBTyxLQUFLLENBQUMsU0FBTixDQUFnQixLQUFoQixDQUFzQixJQUF0QixDQUEyQixRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsS0FBMUIsQ0FBZ0MsUUFBaEMsRUFBMEMsU0FBMUMsQ0FBM0IsQ0FBUDtBQUNILEdBSE8sQ0FLUjs7O0FBQ0EsTUFBSSxDQUFDLENBQUMsd0JBQUQsQ0FBRCxDQUE0QixNQUE1QixJQUFzQyxDQUFDLENBQUMsK0JBQUQsQ0FBRCxDQUFtQyxNQUF6RSxJQUFtRixDQUFDLENBQUMsQ0FBQywrQkFBRCxDQUFELENBQW1DLENBQW5DLEVBQXNDLFFBQXRDLENBQStDLE1BQXZJLEVBQStJO0FBQUEsK0NBQ3ZILENBQUMsQ0FBQyx3QkFBRCxDQUFELENBQTRCLENBQTVCLEVBQStCLFFBRHdGO0FBQUE7O0FBQUE7QUFDM0ksMERBQTZEO0FBQUEsWUFBbEQsS0FBa0Q7QUFDekQsUUFBQSxDQUFDLENBQUMsK0JBQUQsQ0FBRCxDQUFtQyxDQUFuQyxFQUFzQyxNQUF0QyxDQUE2QyxLQUFLLENBQUMsU0FBTixDQUFnQixJQUFoQixDQUE3QztBQUNIO0FBSDBJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJOUk7QUFDSixDQVhBLEdBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gJCgpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwuYXBwbHkoZG9jdW1lbnQsIGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIC8vIGNvcHkgd2lkZ2V0cyBpbiB0aGUgcmlnaHQgY29sdW1uLCB3aGVuIGV4aXN0LCB0byB0aGUgYm90dG9tIG9mIHRoZSBsZWZ0IGNvbHVtblxuICAgIGlmICgkKCcuY29sdW1ucyAuY29sdW1uLXJpZ2h0JykubGVuZ3RoICYmICQoJy5jb2x1bW5zIC5jb2x1bW4tcmlnaHQtc2hhZG93JykubGVuZ3RoICYmICEkKCcuY29sdW1ucyAuY29sdW1uLXJpZ2h0LXNoYWRvdycpWzBdLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mICQoJy5jb2x1bW5zIC5jb2x1bW4tcmlnaHQnKVswXS5jaGlsZHJlbikge1xuICAgICAgICAgICAgJCgnLmNvbHVtbnMgLmNvbHVtbi1yaWdodC1zaGFkb3cnKVswXS5hcHBlbmQoY2hpbGQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iXX0=
