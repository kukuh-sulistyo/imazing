const ndarray = require('ndarray')

/**
 * Get mean of array of 9 number
 * 
 * @param {array} arr 
 * @return {int}
 */
const getMean = arr => Math.floor(arr.reduce((acc, val) => acc + val) / 9)

/**
 * Get median of array of 9 number
 * 
 * @param {array} arr 
 * @return {int}
 */
const getMedian = arr => arr.sort()[4]

/**
 * Get modus of array of 9 number
 * 
 * @param {array} arr 
 * @return {int} 
 */
const getModus = arr => {
    // count pixel
    let countedPixels = arr.reduce((allPixels, pixel) => {
        if (pixel in allPixels) {
            allPixels[pixel]++
        } else {
            allPixels[pixel] = 1
        }
        return allPixels
    }, {}); // ex: {255: 1, 103: 4, 0: 2, 168: 2}
    
    // get modus
    let modus = Object.keys(countedPixels)[0] // set initial modus 
    for (let pixel in countedPixels) {
        if (countedPixels[pixel] > countedPixels[modus]) modus = pixel
    }

    return modus
}

/**
 * Apply filter
 * Using 3x3 neighbors matrix
 * 
 * @param {ndarray} imx 
 * @param {String} type 
 * @return {ndarray} filtered image matrix
 */
const doNoiseReduction = (imx, type) => {
    let filteredImx = new ndarray(new Uint8Array(imx.data.length), imx.shape, imx.stride, 0)
    let fSize = 3
    let halfFSize = Math.floor(fSize/2)
    let neighbors, result, filterFunction
    
    if (type == "mean") {
        filterFunction = getMean
    } else if (type == "median") {
        filterFunction = getMedian
    } else if (type == "modus") {
        filterFunction = getModus
    } else {
        console.error("NoiseReduction Error: type should be either mean, median, or modus")
    }
    for (let x = 0; x < filteredImx.shape[0]; x++) {
        for (let y = 0; y < filteredImx.shape[1]; y++) {
            for (let z = 0; z < 3; z++) {
                // get neighbors
                neighbors = []
                result = 0
                for (let xF = 0; xF < fSize; xF++) {
                    for (let yF = 0; yF < fSize; yF++) {
                        neighbors.push(imx.get(x+xF-halfFSize, y+yF-halfFSize, z) || 0)
                    }
                }
                // result = Math.floor(neighbors.reduce((acc, val) => acc + val) / 9)
                result = filterFunction.call(this, neighbors)
                filteredImx.set(x, y, z, result)
            }
            filteredImx.set(x, y, 3, 255)
        }
    }

    console.log('Noise Reducted')
    return filteredImx
}

module.exports = doNoiseReduction