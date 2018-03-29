// Vendors
// const nj = require('numjs')
// var cwise = require('cwise')
// var chartjs = require('chart.js')

// Libs
const load = require('./load.js')
const grayscale = require('./grayscale.js')
const draw = require('./draw.js')

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
        console.log(props)
    },
    coba: function() {
        grayscale(props)
    }
}
module.exports = expose;

