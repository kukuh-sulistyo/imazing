const draw = require('./draw.js')
const read = require('./read.js')
const ndarray = require('ndarray')

/**
 * Apply crop then draw on canvas 
 * 
 * @param {*} props 
 * @param {int} startX // x pixels from top
 * @param {int} startY // y pixles from left
 * @param {int} w // cropped width
 * @param {int} h // cropped height
 */
const crop = (props, startX, startY, w, h) => {
    // let imx = props.imx.lo(startX, startY).hi(w, h)
    let iW, iH, shape, stride, croppedImx

    iW = props.imx.shape[0]
    iH = props.imx.shape[1]

    // handle overlapping crop
    if (startX + w > iW) w = iW - startX
    if (startY + h > iH) h = iH - startY

    shape = [w, h, 4]
    stride = [4, w * 4, 1]
    croppedImx = new ndarray(new Uint8Array(w * h * 4), shape, stride, 0)

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            croppedImx.set(x, y, 0, props.imx.get(startX+x, startY+y, 0))
            croppedImx.set(x, y, 1, props.imx.get(startX+x, startY+y, 1))
            croppedImx.set(x, y, 2, props.imx.get(startX+x, startY+y, 2))
            croppedImx.set(x, y, 3, props.imx.get(startX+x, startY+y, 3))
        }
    }
    
    console.log("cropped")
    draw(props.c, croppedImx, props.ctx)
    props.imx = read(props)

}

module.exports = crop