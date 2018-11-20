import { notification } from 'antd';
import * as React from 'react';

import tasks from '../../glTasks';
import { RootTasksType, TaskFuncBaseProps } from '../../glTasks/types';

import { Canvas } from './styled';

interface SceneProps {
  task: RootTasksType;
}

const execTask = <K extends RootTasksType>(task: K, props: TaskFuncBaseProps) => {
  if (tasks[task] === undefined) {
    throw Error(`Handler for ${task} is undefined`);
  }
  // Idk why func here may be undefined
  tasks[task]!(props);
};

const handleCanvasResize = (
  gl: WebGLRenderingContext,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  let blocked = false;

  const handleResize = () => {
    if (blocked || canvasRef.current === null) {
      return;
    }

    blocked = true;
    setTimeout(() => {
      blocked = false;
    }, 2000);

    const realToCSSPixels = window.devicePixelRatio;

    const displayWidth = Math.floor(gl.canvas.clientWidth * realToCSSPixels);
    const displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);

    canvasRef.current.width = displayWidth;
    canvasRef.current.height = displayHeight;
    console.log(displayWidth, displayHeight);

    gl.viewport(0, 0, displayWidth, displayHeight);
  };

  window.addEventListener('resize', handleResize);
  handleResize();

  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

export const Scene = (props: SceneProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  let gl: WebGLRenderingContext | null = null;

  React.useEffect(
    () => {
      if (canvasRef.current === null) {
        return;
      }

      gl = canvasRef.current.getContext('webgl');
      if (gl === null) {
        throw Error('Failed to get canvas context');
      }

      try {
        execTask(props.task, { gl });
      } catch (e) {
        notification.error({
          message: `${props.task} failed`,
          description: e.message,
        });
      }
    },
    [props.task],
  );

  React.useEffect(() => gl !== null ? handleCanvasResize(gl, canvasRef) : undefined, [gl, canvasRef]);

  return (
    <Canvas
      // @ts-ignore
      ref={canvasRef}
    />
  );
};
