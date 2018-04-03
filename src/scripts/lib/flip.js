const draw = require('./draw.js')

/**
 * Apply fliping based direction,"h" for horizontal and "v" for vertical
 * 
 * @param {*} props 
 * @param {String} direction 
 */
const flip = (props, direction) =>  {
    if (direction == "h") {
        props.imx = props.imx.step(-1)
    } else if (direction == "v") {
        props.imx = props.imx.step(1, -1)
    } else {
        console.error("You must specify flip direction, either \"h\" for horizontal or \"v\" for vertical")
    }
    draw(props.c, props.imx)
}

module.exports = flip