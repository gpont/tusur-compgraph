import { GlPrimitives } from '../glUtils/types';

import glPoints from './glPoints';
import glQuadStrip from './glQuadStrip';
import glQuads from './glQuads';
import task1 from './task1';
import { TaskFunc } from './types';

const tasks: {
  [name: string]: TaskFunc;
} = {
  'Lab 1': task1,
  [GlPrimitives.GL_POINTS]: glPoints,
  [GlPrimitives.GL_QUADS]: glQuads,
  [GlPrimitives.GL_QUAD_STRIP]: glQuadStrip,
};

export default tasks;
