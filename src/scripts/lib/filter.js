const ndarray = require('ndarray')
const draw = require('./draw.js')
const read = require('./read.js')

/**
 * Apply filter (image convolution)
 * 
 * @param {ndarray} imx 
 * @param {ndarray} filter 
 */
const doFilter = (imx, filter) => {
    let filteredImx = new ndarray(new Uint8Array(imx.data.length), imx.shape, imx.stride, 0)
    let fSize = filter.shape[0]
    let halfFSize = Math.floor(fSize/2)
    let sum
    for (let x = 0; x < filteredImx.shape[0]; x++) {
        for (let y = 0; y < filteredImx.shape[1]; y++) {
            for (let z = 0; z < 3; z++) {
                // get neighbors
                sum = 0
                for (let xF = 0; xF < fSize; xF++) {
                    for (let yF = 0; yF < fSize; yF++) {
                        sum += filter.get(xF, yF) * (imx.get(x+xF-halfFSize, y+yF-halfFSize, z) || 0)
                    }
                }
                // make sure the sum is between 0..255
                sum = Math.min(Math.max(Math.floor(sum), 0),  255)
                filteredImx.set(x, y, z, sum)
            }
            filteredImx.set(x, y, 3, 255)
        }
    }
    return filteredImx
}

/**
 * Apply blur filter using 3x3 filter matrix
 * 
 * | 1/9 1/9 1/9 |
 * | 1/9 1/9 1/9 |
 * | 1/9 1/9 1/9 |
 * 
 * @param {*} props 
 */
const filterBlur = props => {
    const filter = new ndarray(new Array(1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9), [3, 3])
    const i = doFilter(props.imx, filter)
    draw(props.c, i)
    props.imx = read(props)
}

/**
 * Apply sharpen filter using 3x3 filter matrix (edge detection)
 * 
 * | -1 -2 -1 |
 * |  0  0  0 |
 * |  1  2  1 |
 * 
 * @param {*} props 
 */
const filterSharp = props => {
    const filter = new ndarray(new Array(0, -1, 0, -1, 5, -1, 0, -1, 0), [3, 3])
    const i = doFilter(props.imx, filter)
    draw(props.c, i)
    props.imx = read(props)
}

/**
 * Apply sobel filter using 3x3 filter matrix (edge detection)
 * 
 * | -1 -2 -1 |
 * |  0  0  0 |
 * |  1  2  1 |
 * 
 * @param {*} props 
 */
const filterSobel = props => {
    const filter = new ndarray(new Array(-1, -2, -1, 0, 0, 0, 1, 2, 1), [3, 3])
    const i = doFilter(props.imx, filter)
    draw(props.c, i)
    props.imx = read(props)
}


module.exports = {
    sharp: filterSharp,
    blur: filterBlur,
    sobel: filterSobel
}