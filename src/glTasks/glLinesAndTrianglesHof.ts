import { bindShadersToBuffers, initBuffers, initShaderProgram } from '../glUtils';
import { GlPrimitives } from '../glUtils/types';

import { TaskFuncBaseProps } from './types';

type GlType =
  GlPrimitives.GL_LINES
  | GlPrimitives.GL_LINE_STRIP
  | GlPrimitives.GL_LINE_LOOP
  | GlPrimitives.GL_TRIANGLES
  | GlPrimitives.GL_TRIANGLE_STRIP
  | GlPrimitives.GL_TRIANGLE_FAN;

export default (type: GlType) => ({ gl }: TaskFuncBaseProps) => {
  const typesMap = {
    [GlPrimitives.GL_LINES]: gl.LINES,
    [GlPrimitives.GL_LINE_STRIP]: gl.LINE_STRIP,
    [GlPrimitives.GL_LINE_LOOP]: gl.LINE_LOOP,
    [GlPrimitives.GL_TRIANGLES]: gl.TRIANGLES,
    [GlPrimitives.GL_TRIANGLE_STRIP]: gl.TRIANGLE_STRIP,
    [GlPrimitives.GL_TRIANGLE_FAN]: gl.TRIANGLE_FAN,
  };

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

  gl.drawArrays(typesMap[type], 0, 6);
};
