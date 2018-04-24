const draw = require('./draw.js')
const read = require('./read.js')
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
 * @param {*} props 
 */
const erotionGrayscale = (props) => {
    // Convert to grayscale
    grayscale(props)

    let erotedImx = new ndarray(new Uint8Array(props.imx.data.length), props.imx.shape, props.imx.stride, 0)
    let fSize = 3 // dimension structuring element 
    let halfFSize = Math.floor(fSize/2)
    let neighbors, result
    
    for (let x = 0; x < erotedImx.shape[0]; x++) {
        for (let y = 0; y < erotedImx.shape[1]; y++) {
            for (let z = 0; z < 3; z++) {
                // get neighbors pixel
                neighbors = []
                for (let xF = 0; xF < fSize; xF++) {
                    for (let yF = 0; yF < fSize; yF++) {
                        neighbors.push(props.imx.get(x+xF-halfFSize, y+yF-halfFSize, z) || 0)
                    }
                }
                // get max value
                result = Math.min(...neighbors)
                erotedImx.set(x, y, z, result)
            }
            erotedImx.set(x, y, 3, 255)
        }
    }
    draw(props.c, erotedImx)
    props.imx = read(props)
    console.log('image has been eroted')
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
 * @param {*} props 
 */
const erotionBinary = (props) => {
    threshold(props, 127)
    let erotedImx = new ndarray(new Uint8Array(props.imx.data.length), props.imx.shape, props.imx.stride, 0)
    let fSize = 3 // dimension structuring element 
    let halfFSize = Math.floor(fSize/2)
    let neighbor, result
    
    for (let x = 0; x < erotedImx.shape[0]; x++) {
        for (let y = 0; y < erotedImx.shape[1]; y++) {
            for (let z = 0; z < 3; z++) {
                // get eroted
                result = 255
                for (let xF = 0; xF < fSize; xF++) {
                    for (let yF = 0; yF < fSize; yF++) {
                        neighbor = (props.imx.get(x+xF-halfFSize, y+yF-halfFSize, z) || 0)
                        result = result && (neighbor || 0)
                    }
                }
                // set eroted pixel
                erotedImx.set(x, y, z, result)
            }
            erotedImx.set(x, y, 3, 255)
        }
    }
    draw(props.c, erotedImx)
    props.imx = read(props)
    console.log('image has been eroted')
}

module.exports = module.exports = {
    erotionGrayscale: erotionGrayscale,
    erotionBinary: erotionBinary
}