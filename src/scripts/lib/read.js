const ndarray = require('ndarray')

/**
 * Read image pixels from canvas
 * 
 * @param {HTMLCanvasElement} c
 * @return {ndarray} image matrix
 */

const read = c => {
    let imageData = c.getContext("2d").getImageData(0, 0, c.width, c.height)
    let shape = [imageData.width, imageData.height, 4]
    let stride = [4, imageData.width * 4, 1]

    let imx = new ndarray(new Uint8Array(imageData.data), shape, stride, 0)

    return imx
}

module.exports = read