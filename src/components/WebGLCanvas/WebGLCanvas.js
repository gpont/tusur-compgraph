import React, { Component } from 'react';
import Triangle from './Triangle';

class WebGLCanvas extends Component {
	static getGlObject(canvas) {
		let gl = null;

		try {
			gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		}
		catch(e) {}

		if (!gl) {
			gl = null;
			throw new Error('Unable to initialize WebGL. Your browser may not support it.');
		}

		return gl;
	}

	componentDidMount() {
		const gl = WebGLCanvas.getGlObject(this.canvasRef);

		new Triangle(gl, this.canvasRef.width, this.canvasRef.height);
	}

	render() {
		return (
			<canvas
				width={640}
				height={480}
				ref={canvasRef => {this.canvasRef = canvasRef}}
			/>
		);
	}
}

export default WebGLCanvas;
