const cwise = require('cwise')
const draw = require('./draw.js')

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
 * Apply inverse
 * 
 * @param {*} props 
 */
const inverse = props => { 
    cwiseInverse(props.imx) 
    draw(props.c, props.imx)
}

module.exports = inverse