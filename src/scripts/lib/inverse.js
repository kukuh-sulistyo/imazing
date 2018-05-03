const cwise = require('cwise')

const cwiseInverse = cwise({
    args: ["array"],
    pre: function() {
        this.index = 1
    },
    body: function(a) {
        if (this.index % 4 !== 0) {
            a = 255 - a
        }
        this.index += 1
    }
})

/**
 * Apply inverse on image matrix
 * 
 * @param {ndarray} imx 
 */
const inverse = imx => { 
    console.log('Inversed.')
    cwiseInverse(imx)
}

module.exports = inverse