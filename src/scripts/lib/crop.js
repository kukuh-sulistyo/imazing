const draw = require('./draw.js')

const crop = (props, startX, startY, w, h) => {
    let imx = props.imx.lo(startX, startY).hi(w, h)
    draw(props.c, imx, props.ctx)
    console.log(props.imx)
    console.log("cropped")
}

module.exports = crop