const cwise = require('cwise')
const draw = require('./draw.js')

// Brighten with Sumation function
const cwiseBrightenPlus = cwise({
    args: ["array", "scalar"],
    pre: function() {
        this.index = 1
    },
    body: function(a, s) {
        if (this.index % 4 !== 0) {
            a = Math.min(255, a + s)
        }
        this.index += 1
    }
})
const cwiseBrightenSub = cwise({
    args: ["array", "scalar"],
    pre: function() {
        this.index = 1
    },
    body: function(a, s) {
        if (this.index % 4 !== 0) {
            a = Math.max(0, a + s)
        }
        this.index += 1
    }
})

// Brighten with Multiplication function
const cwiseBrightenMult = cwise({
    args: ["array", "scalar"],
    pre: function() {
        this.index = 1
    },
    body: function(a, s) {
        if (this.index % 4 !== 0) {
            a = Math.min(255, Math.floor(a * s))
        }
        this.index += 1
    }
})
const cwiseBrightenDiv = cwise({
    args: ["array", "scalar"],
    pre: function() {
        this.index = 1
    },
    body: function(a, s) {
        if (this.index % 4 !== 0) {
            a = Math.max(0, Math.floor(a * s))
        }
        this.index += 1
    }
})

/**
 * Apply brighten with Sumation function
 *  
 * @param {*} props 
 * @param {int} s 
 */
const brightenSum = (props, s) => {
    if (s > 0) {
        cwiseBrightenPlus(props.imx, s)
    } else {
        cwiseBrightenSub(props.imx, s)
    }
} 

/**
 * Apply brighten with Multiplication function
 *  
 * @param {*} props 
 * @param {int} s 
 */
const brightenMult = (props, s) => {
    if (s >= 1) {
        cwiseBrightenMult(props.imx, s)
    } else if (s >= 0 && s < 1) {
        cwiseBrightenDiv(props.imx, s)
    } else {
        console.error('Error[Multiplication Brighten]: scalar shouldnt negative')
    }
} 

/**
 * Apply brighten
 * 
 * @param {*} props 
 * @param {string} f 
 * @param {scalar} s 
 */
const brighten = (props, f, s) => {
    if (f == "sum") {
        brightenSum(props, s)
    } else if (f == "mult") {
        brightenMult(props, s)
    } else {
        console.error('Error: brighten function should be either \"sum\" or \"mult\"')
    }
    draw(props.c, props.imx)
}

module.exports = brighten