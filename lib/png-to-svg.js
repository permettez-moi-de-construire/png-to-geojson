"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _potrace = _interopRequireDefault(require("potrace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PngToSvg {
  static convert(imageJimp) {
    return new Promise((resolve, reject) => {
      _potrace.default.trace(imageJimp, function (err, svg) {
        if (err) return reject(err);
        resolve(svg);
      });
    });
  }

}

var _default = PngToSvg;
exports.default = _default;