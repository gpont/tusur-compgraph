import { bindShadersToBuffers, initBuffers, initShaderProgram } from '../glUtils';

import { TaskFuncBaseProps } from './types';

export default (props: TaskFuncBaseProps) => {
  const { gl } = props;

  const vertices = [
    -0.5, 0.5, 0.0,
    0.0, 0.5, 0.0,
    -0.25, 0.25, 0.0,
  ];

  const colors = [
    1.0, 1.0, 1.0, 1.0, // white
    1.0, 0.0, 0.0, 1.0, // red
    0.0, 1.0, 0.0, 1.0, // green
    0.0, 0.0, 1.0, 1.0, // blue
  ];

  const buffers = initBuffers(gl, vertices, colors);

  const vertexCode = `
      attribute vec3 coordinates;
      void main(void) {
        gl_Position = vec4(coordinates, 1.0);
        gl_PointSize = 10.0;
      }
    `;

  const fragmentCode = `
      void main(void) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
      }
    `;

  const shaderProgram = initShaderProgram(gl, vertexCode, fragmentCode);
  gl.useProgram(shaderProgram);

  const shadersInfo = [{
    location: gl.getAttribLocation(shaderProgram, 'coordinates'),
    numberComponents: 3,
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offset: 0,
    // TODO: May be null in some cases
    buffer: buffers.position as WebGLBuffer,
  }];

  bindShadersToBuffers(gl, shadersInfo);

  // gl.clearColor(0, 0, 0, 1);
  // gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.viewport(0, 0, 640, 480);

  gl.drawArrays(gl.POINTS, 0, 3);
};
