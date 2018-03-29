const savePixels = require('save-pixels')

/**
 * Draw image on canvas
 * 
 * @param {<canvas>} canvas 
 * @param {CanvasRenderingContext2D} context 
 * @param {ndarray} imx 
 */

const draw = (canvas, imx) => {
    canvas.width = imx.shape[0]
    canvas.height = imx.shape[1]

    let newImageCanvas = savePixels(imx, "canvas")

    canvas.width = newImageCanvas.width
    canvas.height = newImageCanvas.height

    canvas.getContext("2d").drawImage(newImageCanvas, 0, 0)
    console.log('Image has been drawed on canvas.')
}

module.exports = draw