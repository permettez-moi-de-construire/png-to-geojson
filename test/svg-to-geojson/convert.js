import {
  // before,
  describe,
  it
} from 'mocha'
import chai from 'chai'
import sinon from 'sinon'
import { SvgToGeojson } from '../../lib'
import fs from 'fs-extra'
// import { xml2js } from 'xml-js'
// import Jimp from 'jimp'
// import { mkdir } from 'shelljs'
import { tileToBBOX } from '@mapbox/tilebelt'
import { geojsonType } from '@turf/invariant'

import path from 'path'

const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

const dataPath = path.resolve(__dirname, '..', 'data', 'svg')

describe('SvgToGeojson class', () => {
  describe('convert method', () => {
    const testTilesFiles = fs.readdirSync(dataPath)

    const tileRow = 5624
    const tileCol = 8544
    const tileMatrix = 14
    const bbox = tileToBBOX([tileCol, tileRow, tileMatrix])

    // before(() => {
    //   const outputPath = path.resolve(__dirname, '..', 'output')

    //   mkdir('-p', outputPath)

    //   return Promise.all(
    //     testTilesFiles
    //       .map(testTileFile => {
    //         const inputFilePath = path.resolve(dataPath, testTileFile)
    //         const outputFilePath = path.resolve(
    //           outputPath,
    //           path.dirname(testTileFile),
    //           `${path.basename(testTileFile, path.extname(testTileFile))}.json`
    //         )

    //         return fs.readFile(inputFilePath)
    //           .then(svgString => SvgToGeojson.convert(svgString, bbox))
    //           .then(geoJson => fs.writeJSON(outputFilePath, geoJson, { spaces: 2 }))
    //       })
    //   )
    // })

    testTilesFiles
      .forEach(testTileFile => {
        it(`${testTileFile} should resolve`, () => {
          const inputFilePath = path.resolve(dataPath, testTileFile)

          return fs.readFile(inputFilePath)
            .then(inputFileContent => SvgToGeojson.convert(inputFileContent, bbox))
        })
      })

    testTilesFiles
      .forEach(testTileFile => {
        it(`${testTileFile} should return a FeatureCollection`, () => {
          const inputFilePath = path.resolve(dataPath, testTileFile)

          return fs.readFile(inputFilePath)
            .then(inputFileContent => SvgToGeojson.convert(inputFileContent, bbox))
            .then(geoJson => {
              assert.isDefined(geoJson)
              assert.isObject(geoJson)
              assert.doesNotThrow(geojsonType.bind(null, geoJson, 'FeatureCollection', 'test'))
              geoJson.features.forEach(feature => {
                assert.doesNotThrow(geojsonType.bind(null, feature, 'Feature', 'test'))
              })
            })
        })
      })

    testTilesFiles
      .forEach(testTileFile => {
        it(`${testTileFile} should return a geoJson`, () => {
          const inputFilePath = path.resolve(dataPath, testTileFile)

          return fs.readFile(inputFilePath)
            .then(inputFileContent => SvgToGeojson.convert(inputFileContent, bbox))
            .then(geoJson => {

            })
        })
      })
  })
})
