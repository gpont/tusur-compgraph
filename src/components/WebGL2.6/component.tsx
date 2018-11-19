import { notification, Cascader } from 'antd';
import { CascaderOptionType } from 'antd/lib/cascader';
import * as React from 'react';

import { GlPrimitives } from '../../glUtils/types';
import { labelify } from '../../utils/cascader';

import { Container } from './styled';
import { bindShadersToBuffers, initBuffers, initShaderProgram } from "../WebGLCanvas/utils";

interface TaskBaseProps {
  gl: WebGLRenderingContext;
}

interface SceneProps {
  task: GlPrimitives;
}

const renderOptions: CascaderOptionType[] = [
  {
    value: '1 lab',
    children: [
      { value: GlPrimitives.GL_TRIANGLE_STRIP, },
    ]
  }, {
    value: 'points',
    children: [
      { value: GlPrimitives.GL_POINTS, },
    ],
  }, {
    value: 'lines',
    children: [
      { value: GlPrimitives.GL_LINES, },
      { value: GlPrimitives.GL_LINES_STRIP, },
      { value: GlPrimitives.GL_LINES_LOOP, },
    ],
  }, {
    value: 'triangles',
    children: [
      { value: GlPrimitives.GL_TRIANGLES, },
      { value: GlPrimitives.GL_TRIANGLE_STRIP, },
      { value: GlPrimitives.GL_TRIANGLE_FAN, },
    ],
  }, {
    value: 'quads',
    children: [
      { value: GlPrimitives.GL_QUADS, },
      { value: GlPrimitives.GL_QUAD_STRIP, },
    ],
  },
].map(labelify);

// @ts-ignore
const tasks: { [key in GlPrimitives]: (props: TaskBaseProps) => void } = {
  [GlPrimitives.GL_POINTS](props: TaskBaseProps) {
    const { gl } = props;

    const vertices = [
      -0.5, 0.5, 0.0,
      0.0, 0.5, 0.0,
      -0.25, 0.25, 0.0
    ];

    const colors = [
      1.0, 1.0, 1.0, 1.0, // white
      1.0, 0.0, 0.0, 1.0, // red
      0.0, 1.0, 0.0, 1.0, // green
      0.0, 0.0, 1.0, 1.0, // blue
    ];

    const buffers = initBuffers(gl, vertices, colors);

    const vertexCode = `
      attribute vec3 coordinates;
      void main(void) {
        gl_Position = vec4(coordinates, 1.0);
        gl_PointSize = 10.0;
      }
    `;

    const fragmentCode = `
      void main(void) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
      }
    `;

    const shaderProgram = initShaderProgram(gl, vertexCode, fragmentCode);
    gl.useProgram(shaderProgram);

    const shadersInfo = [{
      location: gl.getAttribLocation(shaderProgram, 'coordinates'),
      numberComponents: 3,
      type: gl.FLOAT,
      normalize: false,
      stride: 0,
      offset: 0,
      // TODO: May be null in some cases
      buffer: buffers.position as WebGLBuffer,
    }];

    bindShadersToBuffers(gl, shadersInfo);

    // gl.clearColor(0, 0, 0, 1);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.viewport(0, 0, 640, 480);

    gl.drawArrays(gl.POINTS, 0, 3);
  },
  [GlPrimitives.GL_TRIANGLE_STRIP](props: TaskBaseProps) {
    const { gl } = props;

    const vertices = [
      -0.5, 0.5, 0.0,
      0.0, 0.5, 0.0,
      -0.25, -0.25, 0.0,
    ];

    const colors = [
      1.0, 1.0, 1.0, 1.0, // white
      1.0, 0.0, 0.0, 1.0, // red
      0.0, 1.0, 0.0, 1.0, // green
      0.0, 0.0, 1.0, 1.0, // blue
    ];

    const buffers = initBuffers(gl, vertices, colors);

    const vertexCode = `
      attribute vec3 aVertexPosition;
      attribute vec4 aVertexColor;
      varying lowp vec4 vColor;
      void main(void) {
       gl_Position = vec4(aVertexPosition, 1.0);
       gl_PointSize = 10.0;
       vColor = aVertexColor;
      }
    `;

    const fragmentCode = `
      varying lowp vec4 vColor;
      void main(void) {
       gl_FragColor = vColor;
      }
    `;

    const shaderProgram = initShaderProgram(gl, vertexCode, fragmentCode);
    gl.useProgram(shaderProgram);

    const shadersInfo = [{
      location: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      numberComponents: 3,
      type: gl.FLOAT,
      normalize: false,
      stride: 0,
      offset: 0,
      // TODO: May be null in some cases
      buffer: buffers.position as WebGLBuffer,
    }, {
      location: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      numberComponents: 3,
      type: gl.FLOAT,
      normalize: false,
      stride: 0,
      offset: 0,
      buffer: buffers.color as WebGLBuffer,
    }];

    bindShadersToBuffers(gl, shadersInfo);

    // gl.clearColor(0, 0, 0, 1);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.viewport(0, 0, 640, 480);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  },
};

const Scene = (props: SceneProps) => {
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
        tasks[props.task]({ gl });
      } catch (e) {
        notification.error({
          message: `${props.task}`,
          description: e.message,
        });
      }
    },
    [props.task],
  );

  return <canvas ref={canvasRef} />;
};

const getDefaultValue = (option: CascaderOptionType): string[] =>
  option.value
    ? option.children
      ? [option.value].concat(getDefaultValue(option.children[0]))
      : [option.value]
    : [];

const WebGL2Var6 = () => {
  const [selectedTask, setSelectedTask] = React.useState(getDefaultValue(renderOptions[0]));

  return (
    <Container>
      <Cascader
        value={selectedTask}
        options={renderOptions}
        onChange={setSelectedTask}
      />
      <Scene task={selectedTask[selectedTask.length - 1] as GlPrimitives} />
    </Container>
  );
};

export default WebGL2Var6;
