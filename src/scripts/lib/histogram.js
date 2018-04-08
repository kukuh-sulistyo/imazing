const Chart = require('chart.js')

/**
 * Get array of histogram
 * 
 * @param {ndarray} imx
 * @returns {array} 
 */
const getHistogram = imx => {
    let histo, histograms
    histograms = [] // array of histo (r, g, b)

    // looping through dimension
    for (let z = 0; z < 3; z++) {
        // single histo
        // set value of axis (x,y) => [0, 0, 0, ...]
        histo = Array.apply(null, new Array(256)).map(Number.prototype.valueOf, 0); 

        // update Y axis
        for (let i = 0; i < imx.shape[0]; i++) {
            for (let j = 0; j < imx.shape[1]; j++) {
                histo[imx.get(i, j, z)]++
            }
        }

        histograms.push(histo)
    }
    return histograms
}

/**
 * Draw histogram on canvas
 * Using chart.js
 * 
 * @param {ndarray} imx 
 * @param {<canvas>} canvas 
 */
const drawHistogram = (imx, canvas) => {
    let histograms = getHistogram(imx)

    let chart = new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            datasets: [
                { 
                    label: 'R',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, .5)',
                    data: histograms[0],
                    pointRadius: 1,
                    pointBorderWidth: 0
                },
                { 
                    label: 'G',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0, 255, 0, .5)',
                    data: histograms[1],
                    pointRadius: 1,
                    pointBorderWidth: 0
                },
                { 
                    label: 'B',
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, .5)',
                    data: histograms[2],
                    pointRadius: 1,
                    pointBorderWidth: 0
                },
            ],
            labels: new Array(256).fill().map((item, index) => index),
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        min: 'March'
                    }
                }]
            }
        }
    })
}

module.exports = drawHistogram

