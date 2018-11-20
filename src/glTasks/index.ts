import { GlPrimitives } from '../glUtils/types';

import glLines from './glLines';
import glPoints from './glPoints';
import task1 from './task1';
import { TaskFunc } from './types';

const tasks: {
  [name: string]: TaskFunc;
} = {
  'Lab 1': task1,
  [GlPrimitives.GL_POINTS]: glPoints,
  [GlPrimitives.GL_LINES]: glLines(GlPrimitives.GL_LINES),
  [GlPrimitives.GL_LINE_STRIP]: glLines(GlPrimitives.GL_LINE_STRIP),
  [GlPrimitives.GL_LINE_LOOP]: glLines(GlPrimitives.GL_LINE_LOOP),
  [GlPrimitives.GL_TRIANGLES]: glLines(GlPrimitives.GL_TRIANGLES),
  [GlPrimitives.GL_TRIANGLE_STRIP]: glLines(GlPrimitives.GL_TRIANGLE_STRIP),
  [GlPrimitives.GL_TRIANGLE_FAN]: glLines(GlPrimitives.GL_TRIANGLE_FAN),
};

export default tasks;
