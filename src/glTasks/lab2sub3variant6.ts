import { bindShadersToBuffers, initBuffers, initShaderProgram } from '../components/WebGLCanvas/utils';

import { TaskFuncBaseProps } from './types';

export default ({ gl }: TaskFuncBaseProps) => {
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

  ((gl, vertCode, fragCode) => {
    const vertices = [
      -0.1, 0.1, 0,
      -0.1, -0.1, 0,
      0.3, 0.3, 0,
      0.3, -0.3, 0,
    ];

    const colors = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      1, 0, 0, 0,
    ];

    const buffers = initBuffers(gl, vertices, colors);

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

    gl.drawArrays(gl.LINE_LOOP, 0, vertices.length / 3);
  })(gl, vertCode, fragCode);

  ((gl, vertCode, fragCode) => {
    const vertices = [
      -0.2, 0.4, 0,
      0.4, 0.4, 0,
      0.4, -0.4, 0,
      -0.2, -0.4, 0,
    ];

    const colors = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      1, 0, 0, 0,
    ];

    const buffers = initBuffers(gl, vertices, colors);

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

    gl.drawArrays(gl.LINE_LOOP, 0, vertices.length / 3);
  })(gl, vertCode, fragCode);
};
