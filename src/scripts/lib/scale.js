const cwise = require('cwise')
const ndarray = require('ndarray')
const draw = require('./draw.js')
const read = require('./read.js')
const crop = require('./crop.js')

const cwiseGrayscale = cwise({
    args: ["array", "array", "array", "array"],
    body: function(imx, r, g, b) {
        imx = r * 0.3 + g * 0.59 + b * 0.11
    }
})

/**
 * Apply zoom in 
 * Using replication method
 * 
 * @param {*} props 
 * @param {number} scale
 */
const scaleUp = (props, scale) => {
    // make sure scale >= 1
    if (scale < 1) {
        scale = 1
    }
    let iW = props.imx.shape[0],
        iH = props.imx.shape[1],
        newW = Math.floor(iW * scale),
        newH = Math.floor(iH * scale),
        shape = [newW, newH, 4],
        stride = [4, newW * 4, 1],
        zoomedImx = new ndarray(new Uint8Array(newW * newH * 4), shape, stride, 0)

    for (let x = 0; x < newW; x++) {
        for (let y = 0; y < newH; y++) {
            zoomedImx.set(x, y, 0, props.imx.get(Math.floor(x/scale), Math.floor(y/scale), 0)) // R
            zoomedImx.set(x, y, 1, props.imx.get(Math.floor(x/scale), Math.floor(y/scale), 1)) // G
            zoomedImx.set(x, y, 2, props.imx.get(Math.floor(x/scale), Math.floor(y/scale), 2)) // B
            zoomedImx.set(x, y, 3, props.imx.get(Math.floor(x/scale), Math.floor(y/scale), 3)) // a
        }
    }

    props.imx = zoomedImx
    // Mannualy crop zoomed image
    let startX = Math.floor(newW / 2) - Math.floor(iW / 2),
        startY = Math.floor(newH / 2) - Math.floor(iH / 2)
    crop(props, startX, startY, iW, iH)
}

/**
 * Apply zoom out 
 * Using interpolation(mean) method
 * Just support .5 scale
 * Create new imx every scaling, make it default black
 * Then add the subsample to the imx
 * 
 * @param {*} props 
 */
const scaleDown = props => {
    let iW = props.imx.shape[0],
        iH = props.imx.shape[1],
        newW = Math.floor(iW / 2),
        newH = Math.floor(iH / 2),
        shape = props.imx.shape,
        stride = props.imx.stride,
        zoomedImx = new ndarray(new Uint8Array(iW * iH * 4), shape, stride, 0)

    // Set opacity (a)
    for (let x = 0; x < iW; x++) {
        for (let y = 0; y < iH; y++) {
            zoomedImx.set(x, y, 3, 255) // a
        }
    }

    // Looping through zoomed image (sub-sample)
    let startX = Math.floor(iW / 2) - Math.floor(newW / 2),
        startY = Math.floor(iH / 2) - Math.floor(newH / 2)
    let sum
    for (let x = startX; x < startX+newW; x++) {
        for (let y = startY; y < startY+newH; y++) {
            for (let z = 0; z < 3; z++) {
                sum = [props.imx.get((x-startX)*2, (y-startY)*2, z),
                            props.imx.get((x-startX)*2, (y-startY)*2, z),
                            props.imx.get((x-startX)*2, (y-startY)*2, z),
                            props.imx.get((x-startX)*2, (y-startY)*2, z)]

                zoomedImx.set(x, y, z, Math.floor((sum[0]+sum[1]+sum[2]+sum[3])/4))
            }
        }
    }

    draw(props.c, zoomedImx)
    props.imx = read(props)
}

module.exports = {
    scaleDown: scaleDown,
    scaleUp: scaleUp
}