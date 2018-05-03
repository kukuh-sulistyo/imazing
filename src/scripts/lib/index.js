// Libs
const load = require('./load.js')
const draw = require('./draw.js')
const read = require('./read.js')
const grayscale = require('./grayscale.js')
const brighten = require('./brighten.js')
const inverse = require('./inverse.js')
const threshold = require('./threshold.js')
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
        props.imx = read(props.c)
    },
    grayscale: function() {
        let imx = grayscale(props.imx)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    brighten: function(f="sum", s) {
        brighten(props.imx, s, f)
        draw(props.c, props.imx)
    },
    inverse: function() {
        inverse(props.imx)
        draw(props.c, props.imx)
    },
    threshold: function(threshold=127) {
        let imx = threshold(props.imx, threshold)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    flip: function(d="h") {
        let imx = flip(props.imx, d)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    crop: function(startX, startY, w, h) {
        startX = startX ? startX : 0
        startY = startY ? startY : 0
        w = w ? w : 100
        h = h ? h : 100
        let imx = crop(props.imx, startX, startY, w, h)
        // console.log(imx.data.length)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    rotate: function(deg) {
        let imx = rotate(props.imx, deg)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    scaleUp: function(scale) {
        let imx = scaleUp(props.imx, scale)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    scaleDown: function(scale) {
        let imx = scaleDown(props.imx)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    histogram: function() {
        histogram(props.imx, props.hC)
    },
    noiseReduction: function(type) {
        let imx = noiseReduction(props.imx, type)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    dilationGrayscale: function() {
        let imx = dilationGrayscale(props.imx)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    dilationBinary: function() {
        let imx = dilationBinary(props.imx)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    erotionGrayscale: function() {
        let imx = erotionGrayscale(props.imx)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    erotionBinary: function() {
        let imx = erotionBinary(props.imx)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    filterBlur: function() {
        let imx = filterBlur(props.imx)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    filterSharp: function() {
        let imx = filterSharp(props.imx)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    filterSobel: function() {
        let imx = filterSobel(props.imx)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
    coba: function(t=127) {
        let imx = threshold(props.imx, t)
        console.log(imx)
        draw(props.c, imx)
        props.imx = read(props.c)
    },
}
module.exports = expose;

