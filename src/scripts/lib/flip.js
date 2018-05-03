/**
 * Apply fliping based on direction
 * "h" for horizontal and "v" for vertical
 * 
 * @param {ndarray} imx 
 * @param {String} d direction
 * @return {ndarray} flipped image matrix
 */
const flip = (imx, d) =>  {
    let flippedImx = null
    if (d == "h") {
        flippedImx = imx.step(-1)
    } else if (d == "v") {
        flippedImx = imx.step(1, -1)
    } else {
        console.error("You must specify flip direction, either \"h\" for horizontal or \"v\" for vertical")
    }
    console.log('Flipped.')
    return flippedImx
}

module.exports = flip