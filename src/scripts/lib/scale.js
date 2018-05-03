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
 * Using replication method
 * 
 * @param {ndarray} imx 
 * @param {number} scale
 * @return {ndarray} scalled image matrix
 */
const scaleUp = (imx, scale) => {
    // make sure scale >= 1
    if (scale < 1) {
        scale = 1
    }
    let iW = imx.shape[0],
        iH = imx.shape[1],
        newW = Math.floor(iW * scale),
        newH = Math.floor(iH * scale),
        shape = [newW, newH, 4],
        stride = [4, newW * 4, 1],
        scalledImx = new ndarray(new Uint8Array(newW * newH * 4), shape, stride, 0)

    for (let x = 0; x < newW; x++) {
        for (let y = 0; y < newH; y++) {
            scalledImx.set(x, y, 0, imx.get(Math.floor(x/scale), Math.floor(y/scale), 0)) // R
            scalledImx.set(x, y, 1, imx.get(Math.floor(x/scale), Math.floor(y/scale), 1)) // G
            scalledImx.set(x, y, 2, imx.get(Math.floor(x/scale), Math.floor(y/scale), 2)) // B
            scalledImx.set(x, y, 3, imx.get(Math.floor(x/scale), Math.floor(y/scale), 3)) // a
        }
    }

    // Mannualy crop zoomed image
    let startX = Math.floor(newW / 2) - Math.floor(iW / 2),
        startY = Math.floor(newH / 2) - Math.floor(iH / 2),
        croppedImx = crop(scalledImx, startX, startY, iW, iH)
    
    console.log('Scalled Up.')
    return croppedImx;
}

/**
 * Apply zoom out 
 * Using interpolation(mean) method
 * Only support .5 scaling
 * Create new image matrix (scalledImx) for every scaling, default black
 * Then add the subsample to the scalledImx
 * 
 * @param {ndrray} imx 
 * @return {ndarray} scalled image matrix
 */
const scaleDown = imx => {
    let iW = imx.shape[0],
        iH = imx.shape[1],
        newW = Math.floor(iW / 2),
        newH = Math.floor(iH / 2),
        shape = imx.shape,
        stride = imx.stride,
        scalledImx = new ndarray(new Uint8Array(iW * iH * 4), shape, stride, 0)

    // Set opacity (a)
    for (let x = 0; x < iW; x++) {
        for (let y = 0; y < iH; y++) {
            scalledImx.set(x, y, 3, 255) // a
        }
    }

    // Looping through zoomed image (sub-sample)
    let startX = Math.floor(iW / 2) - Math.floor(newW / 2),
        startY = Math.floor(iH / 2) - Math.floor(newH / 2)
    let sum
    for (let x = startX; x < startX+newW; x++) {
        for (let y = startY; y < startY+newH; y++) {
            for (let z = 0; z < 3; z++) {
                sum = [imx.get((x-startX)*2, (y-startY)*2, z),
                            imx.get((x-startX)*2, (y-startY)*2, z),
                            imx.get((x-startX)*2, (y-startY)*2, z),
                            imx.get((x-startX)*2, (y-startY)*2, z)]

                scalledImx.set(x, y, z, Math.floor((sum[0]+sum[1]+sum[2]+sum[3])/4))
            }
        }
    }

    console.log('Scalled Down')
    return scalledImx
}

module.exports = {
    scaleDown: scaleDown,
    scaleUp: scaleUp
}