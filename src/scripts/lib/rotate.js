const draw = require('./draw.js')

const rotate = (props, deg) => {
    let n = Math.floor(deg / 90)
    for (let i = 1; i <= n; i++) {
        props.imx = props.imx.transpose(1, 0).step(-1)
    }
    draw(props.c, props.imx, props.ctx)
    console.error('ROTATED')
}

module.exports = rotate