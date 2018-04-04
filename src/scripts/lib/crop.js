const draw = require('./draw.js')

/**
 * Apply crop then draw on canvas 
 * 
 * @param {*} props 
 * @param {int} startX // x pixels from top
 * @param {int} startY // y pixles from left
 * @param {int} w // width cropped
 * @param {int} h // height cropped
 */
const crop = (props, startX, startY, w, h) => {
    let imx = props.imx.lo(startX, startY).hi(w, h)
    draw(props.c, imx, props.ctx)
    console.log(props.imx)
    console.log("cropped")
}

module.exports = crop