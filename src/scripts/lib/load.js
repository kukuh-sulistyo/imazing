const ndarray = require('ndarray');
const read = require('./read.js')

/**
 * Load image from local directory, then draw on canvas
 * 
 * @param {Imazing Props} props 
 */
const load = function(props) {
    if (input.files[0].type.search(/image/g) == false) {
        let reader = new FileReader();
        // When file reading is successfully completed
        reader.onload = function () {
            let img = new Image();
            // When image is completely loaded into originalImage
            img.onload = function () {
                props.c.width = img.width;
                props.c.height = img.height;

                props.c.getContext("2d").drawImage(img, 0, 0)

                // Get image matrix
                props.oimx = read(props)
                props.imx = read(props)
                
                console.log("Image drawed.");
            }
            // load reader result into img
            img.src = reader.result;
            console.log("Image loaded.");
          
        }
        // Read image file as dataURL
        reader.readAsDataURL(props.i.files[0]);
    } else {
        console.log('Input ONLY image type file')
        return null
    }
}

module.exports = load