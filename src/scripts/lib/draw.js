const savePixels = require('save-pixels')

/**
 * Draw image on canvas
 * 
 * @param {HTMLCanvasElement} c 
 * @param {ndarray} imx 
 */
const draw = (c, imx) => {
    if (!!imx && imx.data.length > 0) {
        c.width = imx.shape[0]
        c.height = imx.shape[1]

        let newImageCanvas = savePixels(imx, "canvas")

        c.width = newImageCanvas.width
        c.height = newImageCanvas.height
        c.getContext('2d').drawImage(newImageCanvas, 0, 0)
        console.log('Drawed.')
    } else {
        console.error('Error[draw]: image matrix is not specified or has zero length.')
    }
}

module.exports = draw