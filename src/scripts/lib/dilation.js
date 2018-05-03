const ndarray = require('ndarray')
const grayscale = require('./grayscale.js')
const threshold = require('./threshold.js')

/**
 * Convert to grayscale and apply dilation
 * Foreground: white
 * Background: black
 * Using 3x3 structuring elements
 * 
 * | 255, 255, 255 |
 * | 255, 255, 255 |
 * | 255, 255, 255 |
 * 
 * @param {ndarray} imx 
 * @return {ndarray} grayscale dilated image matrix
 */
const dilationGrayscale = imx => {
    // Convert to grayscale
    let grayscalledImx = grayscale(imx)

    let dilatedImx = new ndarray(new Uint8Array(grayscalledImx.data.length), grayscalledImx.shape, grayscalledImx.stride, 0)
    let fSize = 3 // dimension of structuring element 
    let halfFSize = Math.floor(fSize/2)
    let neighbors, result
    
    for (let x = 0; x < dilatedImx.shape[0]; x++) {
        for (let y = 0; y < dilatedImx.shape[1]; y++) {
            // get neighbors pixel
            neighbors = []
            for (let xF = 0; xF < fSize; xF++) {
                for (let yF = 0; yF < fSize; yF++) {
                    neighbors.push(grayscalledImx.get(x+xF-halfFSize, y+yF-halfFSize) || 0)
                }
            }
            // get max value
            result = Math.max(...neighbors)
            // put max pixel into dilatedImx
            dilatedImx.set(x, y, result)
        }
    }
    
    console.log('Grayscale Dilated.')
    return dilatedImx
}

/**
 * Convert to binary and apply dilation
 * Foreground: white
 * Background: black
 * Using 3x3 structuring elements
 * 
 * | 255, 255, 255 |
 * | 255, 255, 255 |
 * | 255, 255, 255 |
 *   
 * @param {ndarray} imx 
 * @return {ndarray} binary dilated image matrix
 */
const dilationBinary = imx => {
    // Convert to binary image
    let thresholdedImx = threshold(imx, 127)

    let dilatedImx = new ndarray(new Uint8Array(thresholdedImx.data.length), thresholdedImx.shape, thresholdedImx.stride, 0)
    let fSize = 3 // dimension of structuring element 
    let halfFSize = Math.floor(fSize/2)
    let neighbor, result
    
    for (let x = 0; x < dilatedImx.shape[0]; x++) {
        for (let y = 0; y < dilatedImx.shape[1]; y++) {
            // get dilated pixel
            result = 0
            for (let xF = 0; xF < fSize; xF++) {
                for (let yF = 0; yF < fSize; yF++) {
                    neighbor = (thresholdedImx.get(x+xF-halfFSize, y+yF-halfFSize) || 0)
                    result = result || (neighbor || 0)
                }
            }
            // put dilated pixel into dilatedImx
            dilatedImx.set(x, y, result)
        }
    }

    console.log('Binary Dilated.')
    return dilatedImx
}

module.exports = {
    dilationGrayscale: dilationGrayscale,
    dilationBinary: dilationBinary
}