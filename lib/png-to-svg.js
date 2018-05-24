"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _potrace = _interopRequireDefault(require("potrace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PngToSvg {
  static convert(imageJimp, options = {}) {
    const potraceOptions = _objectSpread({
      threshold: 254,
      // Anything but white
      flat: false
    }, options);

    return new Promise((resolve, reject) => {
      _potrace.default.trace(imageJimp, potraceOptions, function (err, svg) {
        if (err) return reject(err);
        resolve(svg);
      });
    });
  }

}

var _default = PngToSvg;
exports.default = _default;