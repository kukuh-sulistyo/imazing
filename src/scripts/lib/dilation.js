const draw = require('./draw.js')
const read = require('./read.js')
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
 * @param {*} props 
 */
const dilationGrayscale = (props) => {
    // Convert to grayscale
    grayscale(props)

    let dilatedImx = new ndarray(new Uint8Array(props.imx.data.length), props.imx.shape, props.imx.stride, 0)
    let fSize = 3 // dimension structuring element 
    let halfFSize = Math.floor(fSize/2)
    let neighbors, result
    
    for (let x = 0; x < dilatedImx.shape[0]; x++) {
        for (let y = 0; y < dilatedImx.shape[1]; y++) {
            for (let z = 0; z < 3; z++) {
                // get neighbors pixel
                neighbors = []
                for (let xF = 0; xF < fSize; xF++) {
                    for (let yF = 0; yF < fSize; yF++) {
                        neighbors.push(props.imx.get(x+xF-halfFSize, y+yF-halfFSize, z) || 0)
                    }
                }
                // get max value
                result = Math.max(...neighbors)
                dilatedImx.set(x, y, z, result)
            }
            dilatedImx.set(x, y, 3, 255)
        }
    }
    draw(props.c, dilatedImx)
    props.imx = read(props)
    console.log('image has been dilated')
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
 * @param {*} props 
 */
const dilationBinary = (props) => {
    threshold(props, 127)
    let dilatedImx = new ndarray(new Uint8Array(props.imx.data.length), props.imx.shape, props.imx.stride, 0)
    let fSize = 3 // dimension structuring element 
    let halfFSize = Math.floor(fSize/2)
    let neighbor, result
    
    for (let x = 0; x < dilatedImx.shape[0]; x++) {
        for (let y = 0; y < dilatedImx.shape[1]; y++) {
            for (let z = 0; z < 3; z++) {
                // get dilated
                result = 0
                for (let xF = 0; xF < fSize; xF++) {
                    for (let yF = 0; yF < fSize; yF++) {
                        neighbor = (props.imx.get(x+xF-halfFSize, y+yF-halfFSize, z) || 0)
                        result = result || (neighbor || 0)
                    }
                }
                // set dilated pixel
                dilatedImx.set(x, y, z, result)
            }
            dilatedImx.set(x, y, 3, 255)
        }
    }
    draw(props.c, dilatedImx)
    props.imx = read(props)
    console.log('image has been dilated')
}

module.exports = {
    dilationGrayscale: dilationGrayscale,
    dilationBinary: dilationBinary
}