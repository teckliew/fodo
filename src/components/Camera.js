import React, { Component } from 'react';

import ri from '@enact/ui/resolution';
import Button from '@enact/moonstone/Button';

import css from './Camera.module.less';

const filters = {
	'normal': null,
	'bw': 'grayscale(100%)',
	'sepia': 'sepia(1)',
	'blur': 'blur(5px)'
};

class Camera extends Component {
	constructor(props) {
		super(props);

		this.videoRef = React.createRef();
		this.canvasRef = React.createRef();

		this.state = {
			filterIndex: 0,
			photoSrc: null,
			streaming: false,
			videoSrc: null,
			height: this.props.height || 0, // height for the video stream
			width: this.props.width || 810 // width for the video stream
		};
	}
	componentDidMount () {
		const mediaDevices = window.navigator.mediaDevices;

		if (mediaDevices) {
			mediaDevices.getUserMedia({video: true, audio:false}).then(
				stream => {
					this.setState({videoSrc: stream}, this.startVideoStream);
				}
			).catch(function(err) {
				console.log(`An error occurred: ${err}`);
			});
		} else {
			console.log('No Camera Devices');
		}

		this.clearPhoto();
	}

	startVideoStream = () => {
		const video = this.videoRef.current;

		video.srcObject = this.state.videoSrc;
		video.play();
	}

	clearPhoto = () => {
		const canvas = this.canvasRef.current;
		const context = canvas.getContext('2d');

		context.fillStyle = "#AAA";
		context.fillRect(0, 0, canvas.width, canvas.height);

		const data = canvas.toDataURL('image/png');
		this.setState({photoSrc: data});
	}

	takePhoto = () => {
		if (this.state.width && this.state.height) {
			const canvas = this.canvasRef.current;
			const context = canvas.getContext('2d');
			const filterStyle = filters[Object.keys(filters)[this.state.filterIndex]];

			canvas.width = this.state.width;
			canvas.height = this.state.height;

			// filter effects
			context.filter = filterStyle;

			// video capture
			context.drawImage(this.videoRef.current, 0, 0, this.state.width, this.state.height);

			// // other canvas drawings and do other things
			// const gradient = context.createLinearGradient(0, 0, 200, 0);

			// gradient.addColorStop(0, 'red');
			// gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');

			// context.fillStyle = gradient;
			// context.fillRect(0, 0, 320, 380);

			// context.beginPath();
			// context.moveTo(175, 50);
			// context.lineTo(200, 75);
			// context.lineTo(200, 25);
			// context.fill();

			// Get image data and set it as photoSrc
			const data = canvas.toDataURL('image/png');
			this.setState({photoSrc: data});
		} else {
			this.clearPhoto();
		}
	}

	takePhotoHandler = () => {
		this.takePhoto();
	}

	filterHandler = () => {
		this.setState((prevState) => {
			const currentIndex = prevState.filterIndex;
			const filtersLength = Object.keys(filters).length;
			const filterIndex = currentIndex === (filtersLength - 1) ? 0 : currentIndex + 1;

			return {...prevState, filterIndex};
		});
	}

	canPlayHandler = () => {
		if (!this.state.streaming) {
			const video = this.videoRef.current;

			this.setState({
				height: video.videoHeight / (video.videoWidth / this.state.width),
				streaming: true
			});
		}
	}

	render () {
		const filterStyle = filters[Object.keys(filters)[this.state.filterIndex]];
		const videoHeight = ri.scale(this.state.height);
		const videoWidth = ri.scale(this.state.width);

		return (
			<div>
				<video
					className="video"
					ref={this.videoRef}
					onCanPlay={this.canPlayHandler}
					style={{
						height: videoHeight,
						width: videoWidth,
						filter: filterStyle
					}}
				>
					Video Stream Not Available.
				</video>
				<Button
					className={css.button}
					onClick={this.filterHandler}
					style={{left: '0'}}
				>
					Filters
				</Button>
				<Button
					className={css.button}
					onClick={this.takePhotoHandler}
					style={{left: '20%'}}
				>
					Take Photo
				</Button>
				<canvas
					ref={this.canvasRef}
					style={{display: 'none'}}
				/>
				<div style={{display: 'inline-block'}}>
					<img
						alt="The screen capture will appear in this box"
						className={css.outputImage}
						src={this.state.photoSrc}
						style={{
							height: videoHeight / 1.2,
							width: videoWidth / 1.2
						}}
					/>
				</div>
			</div>
		)
	}
}

export default Camera;
