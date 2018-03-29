const ndarray = require('ndarray')

const read = props => {
    let imageData = props.c.getContext("2d").getImageData(0, 0, props.c.width, props.c.height)
    let shape = [imageData.width, imageData.height, 4]
    let stride = [4, imageData.width * 4, 1]

    let imx = new ndarray(new Uint8Array(imageData.data), shape, stride, 0)

    return imx
}

module.exports = read