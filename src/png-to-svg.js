import potrace from 'potrace'

class PngToSvg {
  static convert (imageJimp) {
    return new Promise((resolve, reject) => {
      potrace.trace(imageJimp, function (err, svg) {
        if (err) return reject(err)
        resolve(svg)
      })
    })
  }
}

export default PngToSvg
