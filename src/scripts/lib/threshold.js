const ndarray = require('ndarray')
const grayscale = require('./grayscale.js')

/**
 * Convert to binary image
 * Using fixed threshold
 * 
 * @param {ndarray} imx 
 * @param {integer} t threshold value
 * @return {ndarray} thesholded image matrix
 */
const threshold = (imx, t) => {
    // Convert to grayscale
    let grayscalledImx = grayscale(imx)
    let thresholdedImx = new ndarray(new Uint8Array(grayscalledImx.data.length), grayscalledImx.shape, grayscalledImx.stride, 0)
    let result = 0
    
    for (let x = 0; x < thresholdedImx.shape[0]; x++) {
        for (let y = 0; y < thresholdedImx.shape[1]; y++) {
            result = (grayscalledImx.get(x, y) || 0) > t ? 255 : 0
            thresholdedImx.set(x, y, result)
        }
    }
    
    return thresholdedImx
}

module.exports = threshold