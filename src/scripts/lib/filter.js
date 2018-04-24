const ndarray = require('ndarray')
const draw = require('./draw.js')
const read = require('./read.js')

const doFilter = (imx , filter) => {
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
                // make sure sum is between 0..255
                sum = Math.min(Math.max(Math.floor(sum), 0),  255)
                filteredImx.set(x, y, z, sum)
            }
            filteredImx.set(x, y, 3, 255)
        }
    }
    return filteredImx
}

const filterBlur = props => {
    let filter = new ndarray(new Array(1, 1, 1, 1, 1, 1, 1, 1, 1), [3, 3])
    doFilter(props, filter)
}

const filterSharp = props => {
    let sobel = new ndarray(new Array(-1, 0, 1, -2, 0, 2, -1, 0, 1), [3, 3]) // edgeDetection
    let sobel2 = new ndarray(new Array(-1, -2, -1, 0, 0, 0, 1, 2, 1), [3, 3]) // edgeDetection
    let blur = new ndarray(new Array(1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9), [3, 3]) // edgeDetection
    let laplacian = new ndarray(new Array(0, -1, 0, -1, 4, -1, 0, -1, 0), [3, 3]) // edgeDetection
    let sharpen = new ndarray(new Array(0, -1, 0, -1, 5, -1, 0, -1, 0), [3, 3]) 
    let sharpen2 = new ndarray(new Array(-1, -1, -1, -1, 8, -1, -1, -1, -1), [3, 3]) 
    console.log("filter matrix")
    let i = doFilter(props.imx, sobel)
    // let i2 = doFilter(i, sobel2)
    draw(props.c, i)
    props.imx = read(props)
}

module.exports = {
    sharp: filterSharp
}