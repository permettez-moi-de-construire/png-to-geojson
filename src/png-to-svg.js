import potrace from 'potrace'

class PngToSvg {
  static convert (imageJimp, options = {}) {
    const potraceOptions = {
      threshold: 254, // Anything but white
      flat: false,
      ...options
    }

    return new Promise((resolve, reject) => {
      potrace.trace(imageJimp, potraceOptions, function (err, svg) {
        if (err) return reject(err)
        resolve(svg)
      })
    })
  }
}

export default PngToSvg
