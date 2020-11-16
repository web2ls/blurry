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
		canvas: null,
		ctx: null,
		contour: []
	};

	componentDidMount() {
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');
		canvas.addEventListener('mousedown', this.mouseDownHandler);
		this.setState({ canvas, ctx });
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
	};

	renderImage() {
		const { canvas, ctx, image } = this.state;
		canvas.setAttribute('width', image.naturalWidth);
		canvas.setAttribute('height', image.naturalHeight);
		ctx.drawImage(this.state.image, 0, 0);
	};

	clearImage = () => {
		this.renderImage();
	};

	resetParams = () => {
		this.setState({ isToolActive: false, contour: [] });
	};

	saveImage = () => {
		const link = document.getElementById('download-image');
		link.setAttribute('href', this.state.canvas.toDataURL());
	};

	toggleTool = () => {
		this.setState(prevState => ({ isToolActive: !prevState.isToolActive }));
	};

	mouseDownHandler = (event) => {
		if (!this.state.isToolActive)
			return;

		const { ctx, contour } = this.state;
		const { pageX: x, pageY: y } = event;

		if (contour.length >= 4) {
			console.log('countour has been filled');
			return;
		};

		const coords = contour;
		coords.push([x, y]);
		this.setState({ contour: coords });
		this.renderDot({ x, y });

		if (coords.length !== 4)
			return;

		this.renderArtefact(coords);
		this.setState({ contour: [], isToolActive: false });
	};

	renderDot({ x, y }) {
		const { ctx } = this.state;
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		ctx.arc(x, y, 5, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
	};

	renderArtefact(coords) {
		this.renderImage();
		const { ctx } = this.state;
		ctx.beginPath();
		ctx.moveTo(coords[0][0], coords[0][1]);
		coords.forEach(item => {
			ctx.lineTo(item[0], item[1]);
		});
		ctx.lineTo(coords[0][0], coords[0][1]);
		ctx.fillStyle = '#000';
		ctx.fill();
		ctx.closePath();
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
