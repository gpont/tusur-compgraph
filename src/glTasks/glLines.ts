import { bindShadersToBuffers, initBuffers, initShaderProgram } from '../components/WebGLCanvas/utils';

import { TaskFuncBaseProps } from './types';

export default ({ gl }: TaskFuncBaseProps) => {
  const vertices = [
    -0.7, -0.1, 0,
    -0.3, 0.6, 0,
    -0.3, -0.3, 0,
    0.2, 0.6, 0,
    0.3, -0.3, 0,
    0.7, 0.6, 0,
  ];

  const colors = [
    0.1, 0.5, 0.8, 0.0,
    0.4, 0.9, 0.2, 0.0,
    0.2, 0.0, 0.8, 0.0,
    0.0, 0.0, 0.0, 0.0,
    0.2, 1.0, 0.3, 0.0,
    0.6, 0.8, 0.2, 0.0,
  ];

  const buffers = initBuffers(gl, vertices, colors);

  // language=GLSL
  const vertCode = `
    attribute vec3 coordinates;
    attribute vec4 aVertexColor;
    varying lowp vec4 vColor;
    void main(void) {
      gl_Position = vec4(coordinates, 1.0);
      vColor = aVertexColor;
    }
  `;

  // language=GLSL
  const fragCode = `
    varying lowp vec4 vColor;
    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  const shaderProgram = initShaderProgram(gl, vertCode, fragCode);
  gl.useProgram(shaderProgram);

  const shadersInfo = [{
    location: gl.getAttribLocation(shaderProgram, 'coordinates'),
    numberComponents: 3,
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offset: 0,
    buffer: buffers.position!,
  }, {
    location: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    numberComponents: 3,
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offset: 0,
    buffer: buffers.color!,
  }];

  bindShadersToBuffers(gl, shadersInfo);

  gl.drawArrays(gl.LINES, 0, 6);
};
