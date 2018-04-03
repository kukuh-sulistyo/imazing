// vendor
const cwise = require('cwise')
const ndarray = require('ndarray')
const draw = require('./draw.js')
const read = require('./read.js')

const cwiseGrayscale = cwise({
    args: ["array", "array", "array", "array"],
    body: function(imx, r, g, b) {
        // if (this.index % 4 !== 0) {
            imx = r * 0.3 + g * 0.59 + b * 0.11
        // }
        // this.index += 1
    }
})

/**
 * Apply grayscale with cwiseGrayscale
 * 
 * @param {*} props 
 */
const grayscale = props => {
    let w = props.imx.shape[0]
    let h = props.imx.shape[1]
    let imx = new ndarray(new Uint8Array(w*h), [w, h])
    let r = props.imx.pick(null, null, 0),
        g = props.imx.pick(null, null, 1),
        b = props.imx.pick(null, null, 2)
    cwiseGrayscale(imx, r, g, b)
    draw(props.c, imx, props.ctx)
    props.imx = read(props)
}
module.exports =  grayscale