/**
 * Draw image on canvas
 * 
 * @param {<canvas>} canvas 
 * @param {CanvasRenderingContext2D} context 
 * @param {ndarray} imx 
 */

const draw = (canvas, context, imx) => {
    canvas.width = ndArray.shape[0]
    canvas.height = ndArray.shape[1]

    context.putImageData(imx.data, 0, 0)
    console.log('Image has been drawed on canvas.')
}

module.exports = draw