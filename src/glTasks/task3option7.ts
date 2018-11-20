import { bindShadersToBuffers, initBuffers, initShaderProgram } from '../glUtils';
import fragmentShader from '../shaders/fragment/task1';
import vertexShader from '../shaders/vertex/task1';

import { TaskFuncBaseProps } from './types';

export default (props: TaskFuncBaseProps) => {
  const { gl } = props;

  const vertices = [
    // Передняя грань
    -1, -1, -1,
    1, -1, -1,
    -1, -1, 1,

    1, -1, 1,
    -1, -1, 1,
    1, -1, -1,

    // Задняя грань
    -1, 1, -1,
    -1, 1, 1,
    1, 1, -1,

    1, 1, 1,
    1, 1, -1,
    -1, 1, 1,

    // Нижняя грань
    -1, -1, -1,
    -1, 1, -1,
    1, -1, -1,

    1, 1, -1,
    1, -1, -1,
    -1, 1, -1,

    // Верхняя грань
    -1, -1, 1,
    1, -1, 1,
    -1, 1, 1,

    1, 1, 1,
    -1, 1, 1,
    1, -1, 1,

    // Левая грань
    -1, -1, -1,
    -1, -1, 1,
    -1, 1, -1,

    -1, 1, 1,
    -1, 1, -1,
    -1, -1, 1,

    // Правая грань
    1, -1, -1,
    1, 1, -1,
    1, -1, 1,

    1, 1, 1,
    1, -1, 1,
    1, 1, -1,
  ];

  const colors = [
    // Передняя грань
    1, 0.5, 0.5,
    1, 0.5, 0.5,
    1, 0.5, 0.5,
    1, 0.5, 0.5,
    1, 0.5, 0.5,
    1, 0.5, 0.5,

    // Задняя грань
    1, 0.5, 0.5,
    1, 0.5, 0.5,
    1, 0.5, 0.5,
    1, 0.5, 0.5,
    1, 0.5, 0.5,
    1, 0.5, 0.5,

    // Нижняя грань
    0.5, 0.7, 1,
    0.5, 0.7, 1,
    0.5, 0.7, 1,
    0.5, 0.7, 1,
    0.5, 0.7, 1,
    0.5, 0.7, 1,

    // Верхняя грань
    0.5, 0.7, 1,
    0.5, 0.7, 1,
    0.5, 0.7, 1,
    0.5, 0.7, 1,
    0.5, 0.7, 1,
    0.5, 0.7, 1,

    // Левая грань
    0.3, 1, 0.3,
    0.3, 1, 0.3,
    0.3, 1, 0.3,
    0.3, 1, 0.3,
    0.3, 1, 0.3,
    0.3, 1, 0.3,

    // Правая грань
    0.3, 1, 0.3,
    0.3, 1, 0.3,
    0.3, 1, 0.3,
    0.3, 1, 0.3,
    0.3, 1, 0.3,
    0.3, 1, 0.3,
  ];

  const buffers = initBuffers(gl, vertices, colors);

  const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(shaderProgram);

  // const uCube = gl.getUniformLocation(shaderProgram, 'u_cube');
  // const uCamera = gl.getUniformLocation(shaderProgram, 'u_camera');
  const aPosition = gl.getAttribLocation(shaderProgram, 'a_position');
  // const aColor = gl.getAttribLocation(shaderProgram, 'a_color');

  const shadersInfo = [{
    location: aPosition,
    numberComponents: 3,
    type: gl.FLOAT,
    normalize: false,
    stride: 0,
    offset: 0,
    // TODO: May be null in some cases
    buffer: buffers.position as WebGLBuffer,
  // }, {
  //   location: aColor,
  //   numberComponents: 3,
  //   type: gl.FLOAT,
  //   normalize: false,
  //   stride: 0,
  //   offset: 0,
  //   buffer: buffers.color as WebGLBuffer,
  }];

  bindShadersToBuffers(gl, shadersInfo);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  gl.drawArrays(gl.TRIANGLES, 0, 36);
};
