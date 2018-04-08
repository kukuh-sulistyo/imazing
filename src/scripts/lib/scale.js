const cwise = require('cwise')
const ndarray = require('ndarray')
const crop = require('./crop.js')

const cwiseGrayscale = cwise({
    args: ["array", "array", "array", "array"],
    body: function(imx, r, g, b) {
        imx = r * 0.3 + g * 0.59 + b * 0.11
    }
})

/**
 * Apply zoom in 
 * Use replication method
 * 
 * @param {*} props 
 * @param {number} scale
 */
const scaleUp = (props, scale) => {
    let iW = props.imx.shape[0],
        iH = props.imx.shape[1],
        newW = iW * scale,
        newH = iH * scale,
        shape = [newW, newH, 4],
        stride = [4, newW * 4, 1],
        zoomedImx = new ndarray(new Uint8Array(newW * newH * 4), shape, stride, 0)
    // let zoomedImx = new ndarray(new Uint8Array(newW*newH), [newW, newH])

    for (let x = 0; x < newW; x++) {
        for (let y = 0; y < newH; y++) {
            // for (let z = 0; z < 4; z++) 
            zoomedImx.set(x, y, 0, props.imx.get(Math.floor(x/scale), Math.floor(y/scale), 0))
            zoomedImx.set(x, y, 1, props.imx.get(Math.floor(x/scale), Math.floor(y/scale), 1))
            zoomedImx.set(x, y, 2, props.imx.get(Math.floor(x/scale), Math.floor(y/scale), 2))
            zoomedImx.set(x, y, 3, props.imx.get(Math.floor(x/scale), Math.floor(y/scale), 3))
        }
    }

    props.imx = zoomedImx
    // Mannualy crop zoomed image
    let startX = Math.floor(newW / 2) - Math.floor(iW / 2),
        startY = Math.floor(newH / 2) - Math.floor(iH / 2)
    crop(props, startX, startY, iW, iH)
}
module.exports = scaleUp