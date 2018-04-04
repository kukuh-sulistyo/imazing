const draw = require('./draw.js')
const ndarray = require('ndarray')

/**
 * Apply rotate in 90-multiplier-deg angle
 * 
 * @param {*} props 
 * @param {int} deg // angle 90, 180, 270, 360, 450, ... 
 */
const rotate = (props, deg) => {
    let n = Math.floor(deg / 90)
    for (let i = 1; i <= n; i++) {
        props.imx = props.imx.transpose(1, 0).step(-1)
    }
    draw(props.c, props.imx, props.ctx)
    console.log('Rotated')
}

// [EXPERIMENT]
// Rotation in non 90-multiplier-deg angle
// const rotate = (props, deg) => {
    // TODO:
    // 1. Handle different width and height
    // 2. Bad result :(

    // let rad = 405 * Math.PI / 180
    // let shape = props.imx.shape
    // let stride = [4, shape[0] * 4, 1]
    // let imx = new ndarray(new Uint8Array(shape[0] * shape[1] * shape[2]), shape, stride, 0)
    // // imx = imx.transpose(1, 0)
    // let x0 = Math.floor(props.imx.shape[0] / 2)
    // let y0 = Math.floor(props.imx.shape[1] / 2)
    // let x1 = 0
    // let y1 = 0
    // console.log(imx)
    // for (var x = 0; x < shape[0]; x++){
    //     for (var y = 0; y < shape[1]; y++){
    //         x1 = x - x0
    //         y1 = y - y0
    //         let newX = (x1 * Math.floor((Math.cos(rad))) - (y1 * Math.sin(rad)) + x0)
    //         let newY = (x1 * Math.floor(Math.sin(rad))) + (y1 * Math.cos(rad)) + y0)
    //         for (var z = 0; z < 4; z++){
    //             imx.set(newX, newY, z, props.imx.get(x, y, z))
    //         }
    //     }
    // }
    // console.warn(imx)
    // draw(props.c, imx, props.ctx)
// }

module.exports = rotate