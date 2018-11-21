import { bindShadersToBuffers, initBuffers, initShaderProgram } from '../glUtils';
import fragmentShader from '../shaders/fragment/glPoints';
import vertexShader from '../shaders/vertex/glPoints';

import { TaskFuncBaseProps } from './types';

export default (props: TaskFuncBaseProps) => {
  const { gl } = props;

  const vertices = [
    -0.5, 0.5, 0.0,
    0.0, 0.5, 0.0,
    -0.25, 0.25, 0.0,
  ];

  const colors = [
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
  ];

  const buffers = initBuffers(gl, vertices, colors);

  const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);
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

  gl.drawArrays(gl.POINTS, 0, 3);
};
