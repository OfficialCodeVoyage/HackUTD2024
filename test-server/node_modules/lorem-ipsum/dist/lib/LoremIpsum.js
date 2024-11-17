"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formats = require("../constants/formats");

var _lineEndings = require("../constants/lineEndings");

var _generator = _interopRequireDefault(require("../lib/generator"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoremIpsum = /*#__PURE__*/function () {
  function LoremIpsum() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _formats.FORMAT_PLAIN;
    var suffix = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, LoremIpsum);

    this.format = format;
    this.suffix = suffix;

    _defineProperty(this, "generator", void 0);

    if (_formats.FORMATS.indexOf(format.toLowerCase()) === -1) {
      throw new Error("".concat(format, " is an invalid format. Please use ").concat(_formats.FORMATS.join(" or "), "."));
    }

    this.generator = new _generator["default"](options);
  }

  _createClass(LoremIpsum, [{
    key: "getLineEnding",
    value: function getLineEnding() {
      if (this.suffix) {
        return this.suffix;
      }

      if (!(0, _util.isReactNative)() && (0, _util.isNode)() && (0, _util.isWindows)()) {
        return _lineEndings.LINE_ENDINGS.WIN32;
      }

      return _lineEndings.LINE_ENDINGS.POSIX;
    }
  }, {
    key: "formatString",
    value: function formatString(str) {
      if (this.format === _formats.FORMAT_HTML) {
        return "<p>".concat(str, "</p>");
      }

      return str;
    }
  }, {
    key: "formatStrings",
    value: function formatStrings(strings) {
      var _this = this;

      return strings.map(function (str) {
        return _this.formatString(str);
      });
    }
  }, {
    key: "generateWords",
    value: function generateWords(num) {
      return this.formatString(this.generator.generateRandomWords(num));
    }
  }, {
    key: "generateSentences",
    value: function generateSentences(num) {
      return this.formatString(this.generator.generateRandomParagraph(num));
    }
  }, {
    key: "generateParagraphs",
    value: function generateParagraphs(num) {
      var makeString = this.generator.generateRandomParagraph.bind(this.generator);
      return this.formatStrings((0, _util.makeArrayOfStrings)(num, makeString)).join(this.getLineEnding());
    }
  }]);

  return LoremIpsum;
}();

var _default = LoremIpsum;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJMb3JlbUlwc3VtIiwib3B0aW9ucyIsImZvcm1hdCIsIkZPUk1BVF9QTEFJTiIsInN1ZmZpeCIsIkZPUk1BVFMiLCJpbmRleE9mIiwidG9Mb3dlckNhc2UiLCJFcnJvciIsImpvaW4iLCJnZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJpc1JlYWN0TmF0aXZlIiwiaXNOb2RlIiwiaXNXaW5kb3dzIiwiTElORV9FTkRJTkdTIiwiV0lOMzIiLCJQT1NJWCIsInN0ciIsIkZPUk1BVF9IVE1MIiwic3RyaW5ncyIsIm1hcCIsImZvcm1hdFN0cmluZyIsIm51bSIsImdlbmVyYXRlUmFuZG9tV29yZHMiLCJnZW5lcmF0ZVJhbmRvbVBhcmFncmFwaCIsIm1ha2VTdHJpbmciLCJiaW5kIiwiZm9ybWF0U3RyaW5ncyIsIm1ha2VBcnJheU9mU3RyaW5ncyIsImdldExpbmVFbmRpbmciXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL0xvcmVtSXBzdW0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRk9STUFUX0hUTUwsIEZPUk1BVF9QTEFJTiwgRk9STUFUUywgTG9yZW1Gb3JtYXQgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2Zvcm1hdHNcIjtcclxuaW1wb3J0IHsgTElORV9FTkRJTkdTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9saW5lRW5kaW5nc1wiO1xyXG5pbXBvcnQgR2VuZXJhdG9yLCB7IElHZW5lcmF0b3JPcHRpb25zIH0gZnJvbSBcIi4uL2xpYi9nZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgaXNOb2RlLCBpc1JlYWN0TmF0aXZlLCBpc1dpbmRvd3MsIG1ha2VBcnJheU9mU3RyaW5ncyB9IGZyb20gXCIuLi91dGlsXCI7XHJcblxyXG5jbGFzcyBMb3JlbUlwc3VtIHtcclxuICBwdWJsaWMgZ2VuZXJhdG9yOiBHZW5lcmF0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgb3B0aW9uczogSUdlbmVyYXRvck9wdGlvbnMgPSB7fSxcclxuICAgIHB1YmxpYyBmb3JtYXQ6IExvcmVtRm9ybWF0ID0gRk9STUFUX1BMQUlOLFxyXG4gICAgcHVibGljIHN1ZmZpeD86IHN0cmluZyxcclxuICApIHtcclxuICAgIGlmIChGT1JNQVRTLmluZGV4T2YoZm9ybWF0LnRvTG93ZXJDYXNlKCkpID09PSAtMSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYCR7Zm9ybWF0fSBpcyBhbiBpbnZhbGlkIGZvcm1hdC4gUGxlYXNlIHVzZSAke0ZPUk1BVFMuam9pbihcIiBvciBcIil9LmAsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdlbmVyYXRvciA9IG5ldyBHZW5lcmF0b3Iob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TGluZUVuZGluZygpIHtcclxuICAgIGlmICh0aGlzLnN1ZmZpeCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zdWZmaXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc1JlYWN0TmF0aXZlKCkgJiYgaXNOb2RlKCkgJiYgaXNXaW5kb3dzKCkpIHtcclxuICAgICAgcmV0dXJuIExJTkVfRU5ESU5HUy5XSU4zMjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTElORV9FTkRJTkdTLlBPU0lYO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZvcm1hdFN0cmluZyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5mb3JtYXQgPT09IEZPUk1BVF9IVE1MKSB7XHJcbiAgICAgIHJldHVybiBgPHA+JHtzdHJ9PC9wPmA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZvcm1hdFN0cmluZ3Moc3RyaW5nczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gc3RyaW5ncy5tYXAoKHN0cikgPT4gdGhpcy5mb3JtYXRTdHJpbmcoc3RyKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2VuZXJhdGVXb3JkcyhudW0/OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0U3RyaW5nKHRoaXMuZ2VuZXJhdG9yLmdlbmVyYXRlUmFuZG9tV29yZHMobnVtKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2VuZXJhdGVTZW50ZW5jZXMobnVtPzogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmZvcm1hdFN0cmluZyh0aGlzLmdlbmVyYXRvci5nZW5lcmF0ZVJhbmRvbVBhcmFncmFwaChudW0pKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZW5lcmF0ZVBhcmFncmFwaHMobnVtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbWFrZVN0cmluZyA9IHRoaXMuZ2VuZXJhdG9yLmdlbmVyYXRlUmFuZG9tUGFyYWdyYXBoLmJpbmQoXHJcbiAgICAgIHRoaXMuZ2VuZXJhdG9yLFxyXG4gICAgKTtcclxuICAgIHJldHVybiB0aGlzLmZvcm1hdFN0cmluZ3MobWFrZUFycmF5T2ZTdHJpbmdzKG51bSwgbWFrZVN0cmluZykpLmpvaW4oXHJcbiAgICAgIHRoaXMuZ2V0TGluZUVuZGluZygpLFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvcmVtSXBzdW07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsVTtFQUdKLHNCQUlFO0lBQUEsSUFIQUMsT0FHQSx1RUFINkIsRUFHN0I7SUFBQSxJQUZPQyxNQUVQLHVFQUY2QkMscUJBRTdCO0lBQUEsSUFET0MsTUFDUDs7SUFBQTs7SUFBQSxLQUZPRixNQUVQLEdBRk9BLE1BRVA7SUFBQSxLQURPRSxNQUNQLEdBRE9BLE1BQ1A7O0lBQUE7O0lBQ0EsSUFBSUMsZ0JBQUEsQ0FBUUMsT0FBUixDQUFnQkosTUFBTSxDQUFDSyxXQUFQLEVBQWhCLE1BQTBDLENBQUMsQ0FBL0MsRUFBa0Q7TUFDaEQsTUFBTSxJQUFJQyxLQUFKLFdBQ0ROLE1BREMsK0NBQzBDRyxnQkFBQSxDQUFRSSxJQUFSLENBQWEsTUFBYixDQUQxQyxPQUFOO0lBR0Q7O0lBQ0QsS0FBS0MsU0FBTCxHQUFpQixJQUFJQyxxQkFBSixDQUFjVixPQUFkLENBQWpCO0VBQ0Q7Ozs7V0FFRCx5QkFBdUI7TUFDckIsSUFBSSxLQUFLRyxNQUFULEVBQWlCO1FBQ2YsT0FBTyxLQUFLQSxNQUFaO01BQ0Q7O01BRUQsSUFBSSxDQUFDLElBQUFRLG1CQUFBLEdBQUQsSUFBb0IsSUFBQUMsWUFBQSxHQUFwQixJQUFnQyxJQUFBQyxlQUFBLEdBQXBDLEVBQWlEO1FBQy9DLE9BQU9DLHlCQUFBLENBQWFDLEtBQXBCO01BQ0Q7O01BRUQsT0FBT0QseUJBQUEsQ0FBYUUsS0FBcEI7SUFDRDs7O1dBRUQsc0JBQW9CQyxHQUFwQixFQUF5QztNQUN2QyxJQUFJLEtBQUtoQixNQUFMLEtBQWdCaUIsb0JBQXBCLEVBQWlDO1FBQy9CLG9CQUFhRCxHQUFiO01BQ0Q7O01BQ0QsT0FBT0EsR0FBUDtJQUNEOzs7V0FFRCx1QkFBcUJFLE9BQXJCLEVBQWtEO01BQUE7O01BQ2hELE9BQU9BLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQUNILEdBQUQ7UUFBQSxPQUFTLEtBQUksQ0FBQ0ksWUFBTCxDQUFrQkosR0FBbEIsQ0FBVDtNQUFBLENBQVosQ0FBUDtJQUNEOzs7V0FFRCx1QkFBcUJLLEdBQXJCLEVBQTJDO01BQ3pDLE9BQU8sS0FBS0QsWUFBTCxDQUFrQixLQUFLWixTQUFMLENBQWVjLG1CQUFmLENBQW1DRCxHQUFuQyxDQUFsQixDQUFQO0lBQ0Q7OztXQUVELDJCQUF5QkEsR0FBekIsRUFBK0M7TUFDN0MsT0FBTyxLQUFLRCxZQUFMLENBQWtCLEtBQUtaLFNBQUwsQ0FBZWUsdUJBQWYsQ0FBdUNGLEdBQXZDLENBQWxCLENBQVA7SUFDRDs7O1dBRUQsNEJBQTBCQSxHQUExQixFQUErQztNQUM3QyxJQUFNRyxVQUFVLEdBQUcsS0FBS2hCLFNBQUwsQ0FBZWUsdUJBQWYsQ0FBdUNFLElBQXZDLENBQ2pCLEtBQUtqQixTQURZLENBQW5CO01BR0EsT0FBTyxLQUFLa0IsYUFBTCxDQUFtQixJQUFBQyx3QkFBQSxFQUFtQk4sR0FBbkIsRUFBd0JHLFVBQXhCLENBQW5CLEVBQXdEakIsSUFBeEQsQ0FDTCxLQUFLcUIsYUFBTCxFQURLLENBQVA7SUFHRDs7Ozs7O2VBR1k5QixVIn0=