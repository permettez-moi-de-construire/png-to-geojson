"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = require(".");

class PngToGeojson {
  static convert(imageJimp, bbox) {
    return _.PngToSvg.convert(imageJimp).then(svgString => _.SvgToGeojson.convert(svgString, bbox));
  }

}

var _default = PngToGeojson;
exports.default = _default;