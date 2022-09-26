import { useState } from "react";
import Canvas from "./Canvas";
import { downloadAsPNG } from "./helpers";

function App() {
	const [downloadButton, setDownloadButton] = useState({
		isDisabled: false,
		text: "Save as png",
	});

	// TODO make those variables part of App's state using useState
	// and allow to alter them via UI
	const width = 512;
	const height = 512;
	const blockSize = 16;
	const blocksHorizontal = width / blockSize;
	const blocksVertical = height / blockSize;
	const bgColor = "#FFFFFF";
	const penColor = "#000000";
	const initialPixels = getBlankPixels();

	const [pixelBlocks, setPixelBlocks] = useState(initialPixels);

	function getBlankPixels() {
		const pixels = [];
		for (let i = 0; i < blocksVertical; i++) {
			const row = [];
			for (let j = 0; j < blocksHorizontal; j++) {
				row.push(bgColor);
			}
			pixels.push(row);
		}
		return pixels;
	}

	const handleMouseEvent = (row, column) => (e) => {
		if (e.buttons === 1) {
			const pixelsCopy = pixelBlocks.slice();
			pixelsCopy[row][column] = penColor;
			setPixelBlocks(pixelsCopy);
		} else if (e.buttons === 2) {
			const pixelsCopy = pixelBlocks.slice();
			pixelsCopy[row][column] = bgColor;
			setPixelBlocks(pixelsCopy);
		}
	};

	function handleClear() {
		const blankPixels = getBlankPixels();
		setPixelBlocks(blankPixels);
	}

	function handleDownloadClick() {
		setDownloadButton({
			...downloadButton,
			isDisabled: true,
			text: "Downloading should start soon",
		});
		setTimeout(
			downloadAsPNG.bind(null, pixelBlocks, width, height, blockSize),
			0
		);
		setTimeout(
			setDownloadButton.bind(null, {
				isDisabled: false,
				text: "Save as png",
			}),
			0
		);
	}

	return (
		<div className="App">
			<div className="panel">
				<h1>Pixel Canvas</h1>
				<button id="clear" onClick={handleClear}>
					Clear
				</button>
			</div>
			<Canvas
				pixels={pixelBlocks}
				onMouseEvent={(row, column) => handleMouseEvent(row, column)}
				gridHeight={blocksVertical}
				gridWidth={blocksHorizontal}
			/>
			<button
				id="save-img"
				onClick={handleDownloadClick}
				disabled={downloadButton.isDisabled}
			>
				{downloadButton.text}
			</button>
		</div>
	);
}

export default App
