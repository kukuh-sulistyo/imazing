const draw = require('./draw.js')
const read = require('./read.js')
const ndarray = require('ndarray')
const grayscale = require('./grayscale.js')

/**
 * Convert to binary image
 * Using with fixed thresholding
 * @param {*} props 
 * @param {integer} threshold 
 */
const threshold = (props, threshold) => {
    // Convert to grayscale
    grayscale(props)

    let thresholdImx = new ndarray(new Uint8Array(props.imx.data.length), props.imx.shape, props.imx.stride, 0)
    let fSize = 3 // dimension of neighbor (3x3)
    let halfFSize = Math.floor(fSize/2)
    let result = 0
    
    for (let x = 0; x < thresholdImx.shape[0]; x++) {
        for (let y = 0; y < thresholdImx.shape[1]; y++) {
            for (let z = 0; z < 3; z++) {
                result = (props.imx.get(x, y, z) || 0) > threshold ? 255 : 0
                thresholdImx.set(x, y, z, result)
            }
            thresholdImx.set(x, y, 3, 255)
        }
    }
    draw(props.c, thresholdImx)
    props.imx = read(props)
    console.log('image has been threshold')
}

module.exports = threshold