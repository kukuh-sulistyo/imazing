const cwise = require('cwise')

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
 * @param {ndarray} imx 
 * @param {int} s 
 */
const brightenSum = (imx, s) => {
    if (s > 0) {
        cwiseBrightenPlus(imx, s)
    } else {
        cwiseBrightenSub(imx, s)
    }
} 

/**
 * Apply brighten with Multiplication function
 *  
 * @param {ndarray} imx 
 * @param {int} s 
 */
const brightenMult = (imx, s) => {
    if (s >= 1) {
        cwiseBrightenMult(imx, s)
    } else if (s >= 0 && s < 1) {
        cwiseBrightenDiv(imx, s)
    } else {
        console.error('Error[Multiplication Brighten]: scalar shouldnt negative')
    }
} 

/**
 * Apply brighten on image matrix
 * 
 * @param {ndarray} imx 
 * @param {scalar} s 
 * @param {string} f 
 */
const brighten = (imx, s, f) => {
    if (f == "sum") {
        brightenSum(imx, s)
        console.log('Brightened.')
    } else if (f == "mult") {
        brightenMult(imx, s)
        console.log('Brightened.')
    } else {
        console.error('Error: brighten function should be either \"sum\" or \"mult\"')
    }
}

module.exports = brighten