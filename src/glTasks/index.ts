import { GlPrimitives } from '../glUtils/types';

import glPoints from './glPoints';
import task1 from './task1';
import { TaskFunc } from './types';

const tasks: {
  [name: string]: TaskFunc;
} = {
  'Lab 1': task1,
  [GlPrimitives.GL_POINTS]: glPoints,
};

export default tasks;
