// Libs
const load = require('./load.js')
const draw = require('./draw.js')
const read = require('./read.js')
const grayscale = require('./grayscale.js')
const brighten = require('./brighten.js')
const inverse = require('./inverse.js')
const flip = require('./flip.js')
const crop = require('./crop.js')
const rotate = require('./rotate.js')
const scaleDown = require('./scale.js').scaleDown
const scaleUp = require('./scale.js').scaleUp
const histogram = require('./histogram.js')
const filterSharp = require('./filter.js').sharp //EXPERIMENT
const noiseReduction = require('./noise-reduction.js')
const dilation = require('./dilation.js').dilation
const dilationBinary = require('./dilation.js').dilationBinary
const erotion = require('./erotion.js').erotion
const erotionBinary = require('./erotion.js').erotionBinary
const coba = require('./coba.js')

// Imazing property
let props = {
    oimx: null, // {ndarray} original image matrix
    imx: null, // {ndarray} working image matrix
    c: null, // {<canvas>} canvas
    i: null, // {<input type="file">},
    hC: null // {<canvas>} histograms's canvas

}

/**
* Exposing modules to global namespace
* Available globally in "Imazing" 
*/
const expose = {
    create: function(canvas, input, histogramCanvas) {
        props.c = canvas
        props.oimx = {}
        props.imx = {}
        props.i = input
        props.hC = histogramCanvas
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
    crop: function(startX, startY, w, h) {
        crop(props, startX, startY, w, h)
    },
    rotate: function(deg) {
        rotate(props, 90)
    },
    scaleUp: function(scale) {
        scaleUp(props, scale)
    },
    scaleDown: function(scale) {
        scaleDown(props)
    },
    histogram: function() {
        histogram(props.imx, props.hC)
    },
    noiseReduction: function(type) {
        noiseReduction(props, type)
    },
    coba: function() {
        erotionBinary(props)
    }
}
module.exports = expose;

