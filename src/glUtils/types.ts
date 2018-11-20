export enum GlPrimitives {
  GL_POINTS = 'GL_POINTS',
  GL_LINES = 'GL_LINES',
  GL_LINES_STRIP = 'GL_LINES_STRIP',
  GL_LINES_LOOP = 'GL_LINES_LOOP',
  GL_TRIANGLES = 'GL_TRIANGLES',
  GL_TRIANGLE_STRIP = 'GL_TRIANGLE_STRIP',
  GL_TRIANGLE_FAN = 'GL_TRIANGLE_FAN',
  GL_QUADS = 'GL_QUADS',
  GL_QUAD_STRIP = 'GL_QUAD_STRIP',
}

export interface Buffers {
  position: WebGLBuffer | null;
  color: WebGLBuffer | null;
}

export interface ShaderInfo {
  location: number;
  numberComponents: number;
  type: number;
  normalize: boolean;
  stride: number;
  offset: number;
  buffer: WebGLBuffer;
}
