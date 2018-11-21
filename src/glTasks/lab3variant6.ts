import { mat4 } from 'gl-matrix';

import { initBuffers, initShaderProgram } from '../glUtils';

import { TaskFuncBaseProps } from './types';

export default ({ gl }: TaskFuncBaseProps) => {
  const cubeMatrix = mat4.create();
  const cameraMatrix = mat4.create();

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

  mat4.perspective(cameraMatrix, 0.785, window.innerWidth / window.innerHeight, 0.1, 1000);
  mat4.translate(cameraMatrix, cameraMatrix, [0, 0, -5]);

  // language=GLSL
  const vertexShader = `
    attribute vec3 a_position;
    attribute vec3 a_color;
    uniform mat4 u_cube;
    uniform mat4 u_camera;
    varying vec3 v_color;
    void main(void) {
      v_color = a_color;
      gl_Position = u_camera * u_cube * vec4(a_position, 1.0);
    }
  `;

  // language=GLSL
  const fragmentShader = `
    precision mediump float;
    varying vec3 v_color;
    void main(void) {
      gl_FragColor = vec4(v_color.rgb, 1.0);
    }
  `;

  const buffers = initBuffers(gl, vertices, colors);

  const shaderProgram = initShaderProgram(gl, vertexShader, fragmentShader);

  const uCube = gl.getUniformLocation(shaderProgram, 'u_cube');
  const uCamera = gl.getUniformLocation(shaderProgram, 'u_camera');
  const aPosition = gl.getAttribLocation(shaderProgram, 'a_position');
  const aColor = gl.getAttribLocation(shaderProgram, 'a_color');

  let lastRenderTime = Date.now();

  const render = () => {
    requestAnimationFrame(render);

    const time = Date.now();
    const dt = lastRenderTime - time;

    mat4.rotateY(cubeMatrix, cubeMatrix, dt / 1000);
    mat4.rotateZ(cubeMatrix, cubeMatrix, dt / 1000);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.enableVertexAttribArray(aColor);
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);

    gl.uniformMatrix4fv(uCube, false, cubeMatrix);
    gl.uniformMatrix4fv(uCamera, false, cameraMatrix);

    gl.drawArrays(gl.TRIANGLES, 0, 36);

    lastRenderTime = time;
  };

  render();
};
