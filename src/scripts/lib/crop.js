const ndarray = require('ndarray')

/**
 * Apply crop
 * 
 * @param {ndarray} imx 
 * @param {int} startX // x pixels from top
 * @param {int} startY // y pixles from left
 * @param {int} w // cropped width
 * @param {int} h // cropped height
 * @return {ndarray} cropped image matrix
 */
const crop = (imx, startX, startY, w, h) => {
    let iW, iH, shape, stride, croppedImx

    iW = imx.shape[0]
    iH = imx.shape[1]

    // handle overlapping crop
    if (startX + w > iW) w = iW - startX
    if (startY + h > iH) h = iH - startY

    shape = [w, h, 4]
    stride = [4, w * 4, 1]
    croppedImx = new ndarray(new Uint8Array(w * h * 4), shape, stride, 0)

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            croppedImx.set(x, y, 0, imx.get(startX+x, startY+y, 0))
            croppedImx.set(x, y, 1, imx.get(startX+x, startY+y, 1))
            croppedImx.set(x, y, 2, imx.get(startX+x, startY+y, 2))
            croppedImx.set(x, y, 3, imx.get(startX+x, startY+y, 3))
        }
    }
    console.log('Cropped.')
    return croppedImx

}

module.exports = crop