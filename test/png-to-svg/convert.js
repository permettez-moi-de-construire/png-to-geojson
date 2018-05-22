import {
  describe,
  it
} from 'mocha'
import chai from 'chai'
import sinon from 'sinon'
import { PngToSvg } from '../../lib'

import path from 'path'

const assert = chai.assert
sinon.assert.expose(assert, { prefix: '' })

describe('PngToSvg class', () => {
  describe('convert method', () => {
    it('should resolve', () => {
      const pngToSvg = new PngToSvg()
      const inputFilePath = path.resolve(__dirname, '../../tile.png')

      return pngToSvg.convert(inputFilePath)
        .then(console.log)
    })
  })
})
