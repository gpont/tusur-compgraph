import { GlPrimitives } from '../glUtils/types';

import glPoints from './glPoints';
import glQuadStrip from './glQuadStrip';
import glQuads from './glQuads';
import task1 from './task1';
import task3option7 from './task3option7';
import { TaskFunc } from './types';

const tasks: {
  [name: string]: TaskFunc;
} = {
  'Lab 1': task1,
  [GlPrimitives.GL_POINTS]: glPoints,
  [GlPrimitives.GL_QUADS]: glQuads,
  [GlPrimitives.GL_QUAD_STRIP]: glQuadStrip,
  '7 option': task3option7,
};

export default tasks;
