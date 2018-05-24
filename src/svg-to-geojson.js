const { xml2js, js2xml } = require('xml-js')
const { geoFromSVGXML } = require('svg2geojson')
const { polygonize } = require('@turf/turf')
const { get: deepGet } = require('lodash')

class SvgToGeojson {
  static convert (svgString, bbox) {
    const svgObject = xml2js(svgString, {compact: true})

    // <GeoItem X="0" Y="256" Latitude="49.023461463214126" Longitude="7.73437499999999"/>
    // <GeoItem X="256" Y="0" Latitude="49.03786794532644" Longitude="7.756347656250005"/>
    let svgObjectWithCoordsMeta = {
      ...svgObject,
      svg: {
        ...svgObject.svg,
        MetaInfo: {
          _attributes: { xmlns: 'http://www.prognoz.ru' },
          Geo: {
            GeoItem: [
              { _attributes: {X: 0, Y: 256, Longitude: bbox[0], Latitude: bbox[1]} },
              { _attributes: {X: 256, Y: 0, Longitude: bbox[2], Latitude: bbox[3]} }
            ]
          }
        }
      }
    }

    const emptyFeatureCol = {
      type: 'FeatureCollection',
      features: []
    }

    // No path
    if (!deepGet(svgObjectWithCoordsMeta, 'svg.path')) {
      return Promise.resolve(emptyFeatureCol)
    }

    // Single, empty path
    if (
      typeof svgObjectWithCoordsMeta.svg.path === 'object' &&
      !Array.isArray(svgObjectWithCoordsMeta.svg.path) &&
      !deepGet(svgObjectWithCoordsMeta.svg.path, '_attributes.d')
    ) {
      return Promise.resolve(emptyFeatureCol)
    }

    if (
      typeof svgObjectWithCoordsMeta.svg.path === 'object' &&
      Array.isArray(svgObjectWithCoordsMeta.svg.path)
    ) {
      svgObjectWithCoordsMeta = {
        ...svgObjectWithCoordsMeta,
        svg: {
          ...svgObjectWithCoordsMeta.svg,
          path: svgObjectWithCoordsMeta.svg.path.filter(
            internalPath => !!internalPath._attributes.d
          )
        }
      }
    }

    // Multiple paths
    if (
      typeof svgObjectWithCoordsMeta.svg.path === 'object' &&
      Array.isArray(svgObjectWithCoordsMeta.svg.path)
    ) {
      // Remove empty paths
      svgObjectWithCoordsMeta = {
        ...svgObjectWithCoordsMeta,
        svg: {
          ...svgObjectWithCoordsMeta.svg,
          path: svgObjectWithCoordsMeta.svg.path.filter(
            internalPath => !!internalPath._attributes.d
          )
        }
      }

      // Empty paths array
      if (!svgObjectWithCoordsMeta.svg.path.length) {
        return Promise.resolve(emptyFeatureCol)
      }
    }

    const svgStringWithCoordsMeta = js2xml(svgObjectWithCoordsMeta, {compact: true})

    return new Promise(resolve => geoFromSVGXML(svgStringWithCoordsMeta, resolve))
      .then(featureCollection => ({
        ...featureCollection,
        features: featureCollection.features.map(feature => feature && ['MultiPolygon', 'Polygon'].includes(feature.geometry.type) ? (
          feature
        ) : (
          polygonize(feature)
        ))
      }))
      // .then(feature => {
      //   console.log(feature)
      //   return feature
      // })
      // .then(feature => feature && ['MultiPolygon', 'Polygon'].includes(feature.type) ? (
      //   feature
      // ) : (
      //   polygonize(feature)
      // ))
  }
}

export default SvgToGeojson
