export const downloadAsPNG = (pixelBlocks, width, height, blockSize) => {
    // Create an offscreen canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    // It creates Uint8ClampedArray which is 1-dimensional
    // and is of size width x height x 4 (because colorspace is srgb)
    const imgData = context.createImageData(width, height);

    canvas.height = height;
    canvas.width = width;

    // Transforming array containing color data for components to array representing equivalent pixels
    const pixels = [];
    for(const row of pixelBlocks) {
        const newRow = [];

        for (const pixel of row) {
            newRow.push.apply(newRow, Array(blockSize).fill(pixel));
        }
        pixels.push.apply(pixels, Array(blockSize).fill(newRow));
    }

    
    // Transform 2-d pixels array into 1-d array
    const transformedPixels = pixels.reduce((prev, curr) => {
        return [...prev, ...curr];
    }, []);


    for (let i = 0; i < imgData.data.length; i += 4) {
        const rHex = transformedPixels[i / 4].substring(1, 3);
        const gHex = transformedPixels[i / 4].substring(3, 5);
        const bHex = transformedPixels[i / 4].substring(5, 7);

        const r = hexToDecimal(rHex);
        const g = hexToDecimal(gHex);
        const b = hexToDecimal(bHex)

        imgData.data[i+0] = r; // r
        imgData.data[i+1] = g; // g 
        imgData.data[i+2] = b; // b
        imgData.data[i+3] = 255; // alpha
    }

    // Painting image form data on offscreen canvas
    context.putImageData(imgData, 0, 0);
    
    // Output image
    const img = new Image();
    img.src = canvas.toDataURL('image/png');

    downloadData(img.src);
}

function downloadData(data, filename = 'pixel-art.png') {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    a.click();
}

const hexToDecimal = hex => parseInt(hex, 16);
