const ndarray = require('ndarray')

/*

    [
        [1, 4],
        [5, 2],
        [3, 0],
    ]

    Flip Horizontal
    [
        [3, 0],
        [5, 2],
        [1, 4]

    ]

*/

const coba = () => {
    var w = 3
    var h = 2
    var x = ndarray(new Uint8Array(w * h), [w, h])
    x.set(0, 0, 1)
    x.set(0, 1, 4)
    x.set(1, 1, 2)
    x.set(1, 0, 5)
    x.set(2, 0, 3)
    var horizontalFlip = x.step(-1)
    var lo = x.lo(1, 1)
    console.log(x)
    // console.log(x.get(2, 0))
    // console.log(horizontalFlip.get(2, 0))
    console.log(lo)
    console.log(x.get(1, 0))

}

module.exports = coba