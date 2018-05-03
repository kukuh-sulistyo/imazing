const ndarray = require('ndarray')
const grayscale = require('./grayscale.js')
const threshold = require('./threshold.js')

/**
 * Convert to grayscale and apply erotion
 * Foreground: white
 * Background: black
 * Using 3x3 structuring elements
 * 
 * | 255, 255, 255 |
 * | 255, 255, 255 |
 * | 255, 255, 255 |
 * 
 * @param {ndarray} imx 
 * @return {ndarray} grayscale eroted image matrix
 */
const erotionGrayscale = imx => {
    // Convert to grayscale
    let grayscalledImx = grayscale(imx)

    let erotedImx = new ndarray(new Uint8Array(grayscalledImx.data.length), grayscalledImx.shape, grayscalledImx.stride, 0)
    let fSize = 3 // dimension of structuring element 
    let halfFSize = Math.floor(fSize/2)
    let neighbors, result
    
    for (let x = 0; x < erotedImx.shape[0]; x++) {
        for (let y = 0; y < erotedImx.shape[1]; y++) {
            // get neighbors pixel
            neighbors = []
            for (let xF = 0; xF < fSize; xF++) {
                for (let yF = 0; yF < fSize; yF++) {
                    neighbors.push(grayscalledImx.get(x+xF-halfFSize, y+yF-halfFSize) || 0)
                }
            }
            // get min value
            result = Math.min(...neighbors)
            // put min pixel into erotedImx
            erotedImx.set(x, y, result)
        }
    }

    console.log('Grayscale Eroted.')
    return erotedImx
}

/**
 * Convert to binary image and apply erotion
 * Foreground: white
 * Background: black
 * Using 3x3 structuring elements
 * 
 * | 255, 255, 255 |
 * | 255, 255, 255 |
 * | 255, 255, 255 |
 * 
 * @param {ndarray} imx 
 * @return {ndarray} binary eroted image matrix
 */
const erotionBinary = imx => {
    // Convert to binary image
    let thresholdedImx = threshold(imx, 127)

    let erotedImx = new ndarray(new Uint8Array(thresholdedImx.data.length), thresholdedImx.shape, thresholdedImx.stride, 0)
    let fSize = 3 // dimension of structuring element 
    let halfFSize = Math.floor(fSize/2)
    let neighbor, result
    
    for (let x = 0; x < erotedImx.shape[0]; x++) {
        for (let y = 0; y < erotedImx.shape[1]; y++) {
            // get eroted pixel
            result = 255
            for (let xF = 0; xF < fSize; xF++) {
                for (let yF = 0; yF < fSize; yF++) {
                    neighbor = (thresholdedImx.get(x+xF-halfFSize, y+yF-halfFSize) || 0)
                    result = result && (neighbor || 0)
                }
            }
            // put eroted pixel into erotedImx
            erotedImx.set(x, y, result)
        }
    }

    console.log('Binary Eroted.')
    return erotedImx
}

module.exports = module.exports = {
    erotionGrayscale: erotionGrayscale,
    erotionBinary: erotionBinary
}