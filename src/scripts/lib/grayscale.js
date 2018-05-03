const cwise = require('cwise')
const ndarray = require('ndarray')

const cwiseGrayscale = cwise({
    args: ["array", "array", "array", "array"],
    body: function(imx, r, g, b) {
        imx = r * 0.3 + g * 0.59 + b * 0.11
    }
})

/**
 * Apply grayscale with cwiseGrayscale
 * Returning 2d image matrix
 * 
 * @param {ndarray} imx 
 * @return {ndarray} grayscaled image matrix
 */
const grayscale = imx => {
    // check if already grascalled
    if (imx.shape.length == 2) {
        return imx
    } 

    let w = imx.shape[0]
    let h = imx.shape[1]
    let grayscalledImx = new ndarray(new Uint8Array(w*h), [w, h])
    let r = imx.pick(null, null, 0),
    g = imx.pick(null, null, 1),
    b = imx.pick(null, null, 2)
    cwiseGrayscale(grayscalledImx, r, g, b)
    
    console.log('Grayscalled.')
    return grayscalledImx        
}

module.exports = grayscale