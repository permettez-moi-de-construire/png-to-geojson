"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  xml2js,
  js2xml
} = require('xml-js');

const {
  geoFromSVGXML
} = require('svg2geojson');

const {
  polygonize
} = require('@turf/turf');

class SvgToGeojson {
  static convert(svgString, bbox) {
    const svgObject = xml2js(svgString, {
      compact: true
    }); // <GeoItem X="0" Y="256" Latitude="49.023461463214126" Longitude="7.73437499999999"/>
    // <GeoItem X="256" Y="0" Latitude="49.03786794532644" Longitude="7.756347656250005"/>

    const svgObjectWithCoordsMeta = _objectSpread({}, svgObject, {
      svg: _objectSpread({}, svgObject.svg, {
        MetaInfo: {
          _attributes: {
            xmlns: 'http://www.prognoz.ru'
          },
          Geo: {
            GeoItem: [{
              _attributes: {
                X: 0,
                Y: 256,
                Longitude: bbox[0],
                Latitude: bbox[1]
              }
            }, {
              _attributes: {
                X: 256,
                Y: 0,
                Longitude: bbox[2],
                Latitude: bbox[3]
              }
            }]
          }
        }
      })
    });

    const svgStringWithCoordsMeta = js2xml(svgObjectWithCoordsMeta, {
      compact: true
    });
    return new Promise(resolve => geoFromSVGXML(svgStringWithCoordsMeta, resolve)).then(feature => feature && ['MultiPolygon', 'Polygon'].includes(feature.type) ? feature : polygonize(feature)); // .then(feature => {
    //   return feature && (feature.type === 'Polygon' || feature.type === 'MultiPolygon') ? (
    //     feature
    //   ) : (
    //     polygonize(feature)
    //   )
    // })
  }

}

var _default = SvgToGeojson;
exports.default = _default;