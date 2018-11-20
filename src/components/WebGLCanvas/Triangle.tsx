import { bindShadersToBuffers, initBuffers, initShaderProgram } from '../../glUtils';
import { Buffers } from '../../glUtils/types';

export default class Triangle {
  gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext, width: number, height: number) {
    this.gl = gl;

    this.initField(width, height);
    this.draw();
  }

  initField(width: number, height: number) {
    const gl = this.gl;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, width, height);
  }

  initShaders(buffers: Buffers) {
    const gl = this.gl;

    const vertexCode = `
      attribute vec3 aVertexPosition;
      attribute vec4 aVertexColor;
      varying lowp vec4 vColor;
      void main(void) {
       gl_Position = vec4(aVertexPosition, 1.0);
       gl_PointSize = 10.0;
       vColor = aVertexColor;
      }
    `;

    const fragmentCode = `
      varying lowp vec4 vColor;
      void main(void) {
       gl_FragColor = vColor;
      }
    `;

    const shaderProgram = initShaderProgram(gl, vertexCode, fragmentCode);
    gl.useProgram(shaderProgram);

    const shadersInfo = [{
      location: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      numberComponents: 3,
      type: gl.FLOAT,
      normalize: false,
      stride: 0,
      offset: 0,
      // TODO: May be null in some cases
      buffer: buffers.position as WebGLBuffer,
    }, {
      location: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      numberComponents: 3,
      type: gl.FLOAT,
      normalize: false,
      stride: 0,
      offset: 0,
      buffer: buffers.color as WebGLBuffer,
    }];

    bindShadersToBuffers(gl, shadersInfo);
  }

  draw() {
    const gl = this.gl;

    const vertices = [
      -0.5, 0.5, 0.0,
      0.0, 0.5, 0.0,
      -0.25, -0.25, 0.0,
    ];

    const colors = [
      1.0, 1.0, 1.0, 1.0, // white
      1.0, 0.0, 0.0, 1.0, // red
      0.0, 1.0, 0.0, 1.0, // green
      0.0, 0.0, 1.0, 1.0, // blue
    ];

    const buffers = initBuffers(gl, vertices, colors);

    this.initShaders(buffers);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}
