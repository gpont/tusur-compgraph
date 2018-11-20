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
  [GlPrimitives.GL_LINES]: glLines,
};

export default tasks;
