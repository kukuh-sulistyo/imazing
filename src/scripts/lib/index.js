// Libs
const load = require('./load.js')
const draw = require('./draw.js')
const read = require('./read.js')
const grayscale = require('./grayscale.js')
const brighten = require('./brighten.js')
const inverse = require('./inverse.js')
const coba = require('./coba.js')

let props = {
    oimx: null, // {ndarray} original image matrix
    imx: null, // {ndarray} working image matrix
    c: null, // {<canvas>} canvas
    i: null // {<input type="file">}
}

/**
* Initializing Imazing
*
* @param {<canvas>} canvas
* @param {<input type="file">} input
*/
function create(canvas, input) {
    props.c = canvas
    props.oimx = {}
    props.imx = {}
    props.i = input
}

/**
* Exposing modules to global
* Available globally in "Imazing" 
*/
const expose = {
    create: create,
    load: function() {
        load(props)
    },
    reset: function() {
        draw(props.c, props.oimx)
        props.imx = read(props)
    },
    grayscale: function() {
        grayscale(props)
    },
    brighten: function(f = "sum", s) {
        brighten(props, f, s)
    },
    inverse: function() {
        inverse(props)
        console.log('asdf')
    },
    coba: function() {
        // brighten(props, 100)

        draw(props.c, props.imx)
    },
    coba2: function() {
        console.warn(props.oimx)
        console.warn(props.imx)
    }
}
module.exports = expose;

