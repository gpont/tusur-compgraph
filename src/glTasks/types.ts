import tasks from './';

export type RootTasksType = keyof typeof tasks;

export interface TaskFuncBaseProps {
  gl: WebGLRenderingContext;
}

export type TaskFunc = (props: TaskFuncBaseProps) => void;
