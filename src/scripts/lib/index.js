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
const noiseReduction = require('./noise-reduction.js')
const dilationGrayscale = require('./dilation.js').dilationGrayscale
const dilationBinary = require('./dilation.js').dilationBinary
const erotionGrayscale = require('./erotion.js').erotionGrayscale
const erotionBinary = require('./erotion.js').erotionBinary
const filterBlur = require('./filter.js').blur
const filterSharp = require('./filter.js').sharp
const filterSobel = require('./filter.js').sobel
const threshold = require('./threshold.js')
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
    dilationGrayscale: function() {
        dilationGrayscale(props)
    },
    dilationBinary: function() {
        dilationBinary(props)
    },
    erotionGrayscale: function() {
        erotionGrayscale(props)
    },
    erotionBinary: function() {
        erotionBinary(props)
    },
    filterBlur: function() {
        filterBlur(props)
    },
    filterSharp: function() {
        filterSharp(props)
    },
    filterSobel: function() {
        filterSobel(props)
    },
    coba: function() {
        filterSharp(props)
    }
}
module.exports = expose;

