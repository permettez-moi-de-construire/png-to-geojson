import { PngToSvg, SvgToGeojson } from '.'

class PngToGeojson {
  static convert (imageJimp, bbox) {
    return PngToSvg.convert(imageJimp)
      .then(svgString => SvgToGeojson.convert(svgString, bbox))
  }
}

export default PngToGeojson
