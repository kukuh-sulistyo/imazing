// vendor
const cwise = require('cwise')
const ndarray = require('ndarray')
const draw = require('./draw.js')

// TODO: fix cwise function, it still return all zeros ---------------------------
const cwiseGrayscale = cwise({
    args: ["array", "array", "array", "array"],
    body: function grayin(imx, r, g, b) {
        imx =  r * 0.3 + g * 0.59 + b * 0.11
    }
})

const grayscale = props => {
    let w = props.imx.shape[0]
    let h = props.imx.shape[1]
    let imx = new ndarray(new Uint8Array(w * h), [w, h])
    let r = props.imx.pick(null, null, 0),
        g = props.imx.pick(null, null, 1),
        b = props.imx.pick(null, null, 2),
        x = props.imx.pick(null, null, null)

    cwiseGrayscale(imx, r, g, b)
    //TODO: draw on canvas
    draw(props.c, imx)
}
module.exports =  grayscale