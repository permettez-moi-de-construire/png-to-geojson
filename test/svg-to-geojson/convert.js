import {
  before,
  describe,
  it
} from 'mocha'
import chai from 'chai'
import sinon from 'sinon'
import { SvgToGeojson } from '../../lib'
import fs from 'fs-extra'
import { xml2js } from 'xml-js'
import Jimp from 'jimp'
import { mkdir } from 'shelljs'
import { tileToBBOX } from '@mapbox/tilebelt'

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

    // testTilesFiles
    //   .forEach(testTileFile => {
    //     it(`${testTileFile} should resolve`, () => {
    //       const inputFilePath = path.resolve(dataPath, testTileFile)

    //       return SvgToGeojson.convert(inputFilePath)
    //     })
    //   })

    // testTilesFiles
    //   .forEach(testTileFile => {
    //     it(`${testTileFile} should have a single svg.path node`, () => {
    //       const inputFilePath = path.resolve(dataPath, testTileFile)

    //       return PngToSvg.convert(inputFilePath)
    //         .then(svgString => xml2js(svgString, {compact: true}))
    //         .then(svgObject => {
    //           assert.property(svgObject, 'svg')
    //           assert.nestedProperty(svgObject, 'svg.path')
    //           assert.typeOf(svgObject.svg.path, 'object')
    //         })
    //     })
    //   })

    // testTilesFiles
    //   .forEach(testTileFile => {
    //     it(`${testTileFile} should have same size and viewbox than origin`, () => {
    //       const inputFilePath = path.resolve(dataPath, testTileFile)

    //       return Promise.all([
    //         Jimp.read(inputFilePath),
    //         PngToSvg.convert(inputFilePath)
    //           .then(svgString => xml2js(svgString, {compact: true}))
    //       ])
    //         .then(([imageJimp, svgObject]) => {
    //           assert.nestedProperty(svgObject, 'svg._attributes.width')
    //           assert.nestedPropertyVal(
    //             svgObject,
    //             'svg._attributes.width',
    //             `${imageJimp.bitmap.width}`
    //           )

    //           assert.nestedProperty(svgObject, 'svg._attributes.height')
    //           assert.nestedPropertyVal(
    //             svgObject,
    //             'svg._attributes.height',
    //             `${imageJimp.bitmap.height}`
    //           )

    //           assert.nestedProperty(svgObject, 'svg._attributes.viewBox')
    //           assert.nestedPropertyVal(
    //             svgObject,
    //             'svg._attributes.viewBox',
    //             `0 0 ${imageJimp.bitmap.width} ${imageJimp.bitmap.height}`
    //           )
    //         })
    //     })
    //   })

    // testTilesFiles
    //   .filter(testTileFile => !['none.png'].includes(testTileFile))
    //   .forEach(testTileFile => {
    //     it(`${testTileFile} should have a defined d inside the path node`, () => {
    //       const inputFilePath = path.resolve(dataPath, testTileFile)

    //       return PngToSvg.convert(inputFilePath)
    //         .then(svgString => xml2js(svgString, {compact: true}))
    //         .then(svgObject => {
    //           assert.nestedProperty(svgObject, 'svg.path._attributes.d')
    //           assert.isNotEmpty(svgObject.svg.path._attributes.d)
    //         })
    //     })
    //   })

    // testTilesFiles
    //   .filter(testTileFile => ['none.png'].includes(testTileFile))
    //   .forEach(testTileFile => {
    //     it(`${testTileFile} should have an empty d inside the path node`, () => {
    //       const inputFilePath = path.resolve(dataPath, testTileFile)

    //       return PngToSvg.convert(inputFilePath)
    //         .then(svgString => xml2js(svgString, {compact: true}))
    //         .then(svgObject => {
    //           assert.nestedProperty(svgObject, 'svg.path._attributes.d')
    //           assert.isEmpty(svgObject.svg.path._attributes.d)
    //         })
    //     })
    //   })
  })
})
