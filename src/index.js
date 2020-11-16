import './style';
import { Component } from 'preact';
import Toolbar from './components/Toolbar';
import Handler from './components/Handler';

export default class App extends Component {
	state = {
		isToolActive: false,
		image: null,
		file: null,
		imageData: null,
		contour: []
	};

	componentDidMount() {
		const canvas = document.getElementById('canvas');
		canvas.addEventListener('mousedown', this.mouseDownHandler);
	}

	selectFileHandler = (event) => {
		this.resetParams();
		const file = event.target.files[0];
		const url = URL.createObjectURL(file);
		const image = new Image();
		this.setState({ file: file, image: image });

		image.onload = this.onLoadImageHandler;
		image.src = url;
	};

	onLoadImageHandler = () => {
		this.renderImage();
		// const canvas = document.getElementById('canvas');
		// const ctx = canvas.getContext('2d');
		// canvas.setAttribute('width', this.state.image.naturalWidth);
		// canvas.setAttribute('height', this.state.image.naturalHeight);

		// ctx.drawImage(this.state.image, 0, 0);
		// const imageData = ctx.getImageData(0, 0, this.state.image.naturalWidth, this.state.image.naturalHeight);
		// this.setState({ imageData: imageData });

		// const pixels = imageData.data;

		// for (let i = 0; i < pixels.length; i += 4) {
		// 	if (i > 2550 && i < 12200) {
		// 		pixels[i] = 0;
		// 		pixels[i + 1] = 255;
		// 		pixels[i + 2] = 255;
		// 	}
		// }

		// ctx.putImageData(imageData, 0, 0);
	};

	renderImage() {
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		canvas.setAttribute('width', this.state.image.naturalWidth);
		canvas.setAttribute('height', this.state.image.naturalHeight);
		ctx.drawImage(this.state.image, 0, 0);
	};

	clearImage = () => {
		this.renderImage();
	};

	resetParams = () => {
		this.setState({ isToolActive: false, contour: [] });
	};

	saveImage = () => {
		const canvas = document.getElementById('canvas');
		const link = document.getElementById('download-image');
		link.setAttribute('href', canvas.toDataURL());
	};

	toggleTool = () => {
		console.log('tool is activated');
		this.setState(prevState => ({ isToolActive: !prevState.isToolActive }));
	};

	mouseDownHandler = (event) => {
		if (!this.state.isToolActive)
			return;

		console.log('mousedown is occure');

		const { pageX, pageY } = event;
		console.log(pageX, pageY);

		if (this.state.contour.length >= 4) {
			console.log('countour has been filled');
			return;
		};
		const coords = this.state.contour;
		coords.push([pageX, pageY]);
		this.setState({ contour: coords });

		console.log(coords);

		if (coords.length !== 4)
			return;

		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');

		ctx.beginPath();
		ctx.moveTo(coords[0][0], coords[0][1]);
		coords.forEach(item => {
			ctx.lineTo(item[0], item[1]);
		});
		ctx.lineTo(coords[0][0], coords[0][1]);
		ctx.fillStyle = '#000';
		ctx.fill();
		ctx.closePath();

		this.setState({ contour: [], isToolActive: false });
	};

	componentWillUnmount() {
		canvas.removeEventListener('mousedown', this.mouseDownHandler);
	}

	render() {
		return (
			<div class="container">
				<Toolbar
					selectFileHandler={this.selectFileHandler}
					isToolActive={this.state.isToolActive}
					clearImage={this.clearImage}
					saveImage={this.saveImage}
					toggleTool={this.toggleTool} />
				<Handler />
			</div>
		);
	}
}
