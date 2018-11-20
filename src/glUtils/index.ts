import { Buffers, ShaderInfo } from './types';

function loadShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);

  if (shader === null) {
    throw Error('Cannot create shader');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw Error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
}

export function initShaderProgram(
  gl: WebGLRenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string,
) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  const shaderProgram = gl.createProgram();

  if (shaderProgram === null) {
    throw Error('Cannot create shader program');
  }

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw Error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
  }

  return shaderProgram;
}

export function initBuffers(
  gl: WebGLRenderingContext,
  positions: number[],
  colors: number[],
): Buffers {
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const colorBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

export function bindShadersToBuffers(gl: WebGLRenderingContext, shadersInfo: ShaderInfo[]) {
  shadersInfo.forEach(shader => {
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, shader.buffer);

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(
      shader.location,
      shader.numberComponents,
      shader.type,
      shader.normalize,
      shader.stride,
      shader.offset,
    );
    gl.enableVertexAttribArray(shader.location);
  });
}
