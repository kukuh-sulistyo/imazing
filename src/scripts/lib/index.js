// Vendors
// const nj = require('numjs')
// var cwise = require('cwise')
// var chartjs = require('chart.js')

// Libs
const load = require('./load.js') 

let props = {
    oimx: null, // originalImageMatrix
    imx: null, // working imageMatrix
    c: null, // canvas
    ctx: null, // canvas's 2D context
    i: null // <input type="file">
}

/**
* Initializing Imazing
*
* @param {<canvas>} canvas
* @param {<input type="file">} input
*/
function create(canvas, input) {
    props.c = canvas
    props.ctx =  props.c.getContext('2d')
    props.oimx = props.ctx.getImageData(0, 0, props.c.width, props.c.height)
    props.imx = props.oimx
    props.i = input
    // console.log(props)
}


/**
* Exposing modules to global
* Available globally in "Imazing" 
*/
const expose = {
    create: create,
    load: function() {
        load(props)
    }
}
module.exports = expose;

