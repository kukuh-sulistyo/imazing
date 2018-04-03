// Libs
const load = require('./load.js')
const draw = require('./draw.js')
const read = require('./read.js')
const grayscale = require('./grayscale.js')
const brighten = require('./brighten.js')
const inverse = require('./inverse.js')
const flip = require('./flip.js')
const coba = require('./coba.js')

// Imazing property
let props = {
    oimx: null, // {ndarray} original image matrix
    imx: null, // {ndarray} working image matrix
    c: null, // {<canvas>} canvas
    ctx: null,
    i: null // {<input type="file">}
}

/**
* Exposing modules to global namespace
* Available globally in "Imazing" 
*/
const expose = {
    create: function(canvas, input) {
        props.c = canvas
        props.ctx = canvas.getContext('2d')
        props.oimx = {}
        props.imx = {}
        props.i = input
    },
    load: function() {
        load(props)
    },
    reset: function() {
        draw(props.c, props.oimx, props.ctx)
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
    },
    flip: function(d = "h") {
        flip(props, d)
    },
    coba2: function() {
        flip(props)
    }
}
module.exports = expose;

