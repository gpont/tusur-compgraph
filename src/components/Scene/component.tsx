import { notification } from 'antd';
import * as React from 'react';

import tasks from '../../glTasks';
import { RootTasksType, TaskFuncBaseProps } from '../../glTasks/types';

interface SceneProps {
  task: RootTasksType;
}

const execTask = <K extends RootTasksType>(task: K, props: TaskFuncBaseProps) => {
  if (tasks[task] === undefined) {
    throw Error(`Handler for ${task} is undefined`);
  }

  tasks[task](props);
};

export const Scene = (props: SceneProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(
    () => {
      if (canvasRef.current === null) {
        return;
      }

      const gl = canvasRef.current.getContext('webgl');
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

  return <canvas ref={canvasRef}/>;
};
