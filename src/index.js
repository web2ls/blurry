import './style';
import { Component } from 'preact';
import Toolbar from './components/Toolbar';
import Handler from './components/Handler';

export default class App extends Component {
	state = {
		isDrawing: false,
	};

	selectFileHandler = (event) => {
		const file = event.target.files[0];
		const url = URL.createObjectURL(file);
		const image = new Image();

		image.onload = () => {
			console.log('image has beel loaded');
			const canvas = document.getElementById('canvas');
			const ctx = canvas.getContext('2d');
			canvas.setAttribute('width', image.naturalWidth);
			canvas.setAttribute('height', image.naturalHeight);

			canvas.addEventListener('mousedown', this.mouseDownHandler);

			ctx.drawImage(image, 0, 0);
			const imageData = ctx.getImageData(0, 0, image.naturalWidth, image.naturalHeight);

			const pixels = imageData.data;

			for (let i = 0; i < pixels.length; i += 4) {
				if (i > 2550 && i < 12200) {
					pixels[i] = 0;
					pixels[i + 1] = 255;
					pixels[i + 2] = 255;
				}
			}

			ctx.putImageData(imageData, 0, 0);
		}

		image.src = url;
	};

	mouseDownHandler = (event) => {
		console.log('mousedown is occure');
	};

	mouseUpHandler = (event) => {
		console.log('mouseup is occure');
	};

	drawing = (event) => {
		console.log('drawing is occure');
	};

	render() {
		return (
			<div class="container">
				<Toolbar selectFileHandler={this.selectFileHandler} />
				<Handler />
			</div>
		);
	}
}
