import React, { Component } from 'react';

import Triangle from './Triangle';

class WebGLCanvas extends Component {
  canvasRef: HTMLCanvasElement | null = null;

  constructor(props: {}) {
    super(props);

    this.setCanvasRef = this.setCanvasRef.bind(this);
  }

  static getGlObject(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (gl === null) {
      throw new Error('Unable to initialize WebGL. Your browser may not support it.');
    }

    return gl;
  }

  componentDidMount() {
    const gl = WebGLCanvas.getGlObject(this.canvasRef!);

    new Triangle(gl, this.canvasRef!.width, this.canvasRef!.height);
  }

  setCanvasRef(ref: HTMLCanvasElement) {
    this.canvasRef = ref;
  }

  render() {
    return (
      <canvas
        width={640}
        height={480}
        ref={this.setCanvasRef}
      />
    );
  }
}

export default WebGLCanvas;
