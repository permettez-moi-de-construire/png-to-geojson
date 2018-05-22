"use strict";

var _ = require(".");

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _jimp = _interopRequireDefault(require("jimp"));

var _tilebelt = require("@mapbox/tilebelt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async function () {
  const tileRow = 5624;
  const tileCol = 8544;
  const tileMatrix = 14;
  const bbox = (0, _tilebelt.tileToBBOX)([tileCol, tileRow, tileMatrix]);

  const imagePath = _path.default.resolve(__dirname, '../tile.png');

  const imageBuffer = await _fsExtra.default.readFile(imagePath);
  const imageJimp = await _jimp.default.read(imageBuffer);
  const geojson = await _.PngToGeojson.convert(imageJimp, bbox);
  console.log(geojson);

  const geoJSONPath = _path.default.resolve(__dirname, '../tile.json');

  await _fsExtra.default.writeFile(geoJSONPath, JSON.stringify(geojson, null, 2));
})();