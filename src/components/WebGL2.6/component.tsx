import { notification, Cascader } from 'antd';
import { CascaderOptionType } from 'antd/lib/cascader';
import * as React from 'react';

import { GlPrimitives } from '../../glUtils/types';
import { labelify } from '../../utils/cascader';

import { Container } from './styled';

interface TaskBaseProps {
  gl: WebGLRenderingContext;
}

interface SceneProps {
  task: GlPrimitives;
}

const renderOptions: CascaderOptionType[] = [
  {
    value: 'points',
    children: [
      {
        value: GlPrimitives.GL_POINTS,
      },
    ],
  },
  {
    value: 'lines',
    children: [
      {
        value: GlPrimitives.GL_LINES,
      },
      {
        value: GlPrimitives.GL_LINES_STRIP,
      },
      {
        value: GlPrimitives.GL_LINES_LOOP,
      },
    ],
  },
  {
    value: 'triangles',
    children: [
      {
        value: GlPrimitives.GL_TRIANGLES,
      },
      {
        value: GlPrimitives.GL_TRIANGLE_STRIP,
      },
      {
        value: GlPrimitives.GL_TRIANGLE_FAN,
      },
    ],
  },
  {
    value: 'quads',
    children: [
      {
        value: GlPrimitives.GL_QUADS,
      },
      {
        value: GlPrimitives.GL_QUAD_STRIP,
      },
    ],
  },
].map(labelify);

// @ts-ignore
const tasks: { [key in GlPrimitives]: (props: TaskBaseProps) => void } = {
  [GlPrimitives.GL_POINTS](props: TaskBaseProps) {
    const { gl } = props;

    const vertices = [-0.5, 0.5, 0.0, 0.0, 0.5, 0.0, -0.25, 0.25, 0.0];

    // Create an empty buffer object to store the vertex buffer
    const vertexBuffer = gl.createBuffer();

    // Bind appropriate array buffer to it
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    /*=========================Shaders========================*/

    // vertex shader source code
    const vertCode =
      'attribute vec3 coordinates;' +
      'void main(void) {' +
      ' gl_Position = vec4(coordinates, 1.0);' +
      'gl_PointSize = 10.0;' +
      '}';

    // Create a vertex shader object
    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertShader) {
      throw Error('Failed to initialize vertex shader');
    }

    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);

    // Compile the vertex shader
    gl.compileShader(vertShader);

    // fragment shader source code
    const fragCode = 'void main(void) { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);}';

    // Create fragment shader object
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragShader) {
      throw Error('Failed to initialize frag shader');
    }

    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);

    // Compile the fragment shader
    gl.compileShader(fragShader);

    // Create a shader program object to store
    // the combined shader program
    const shaderProgram = gl.createProgram();
    if (shaderProgram === null) {
      throw Error('Failed to initialize shader program');
    }

    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);

    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);

    // Link both programs
    gl.linkProgram(shaderProgram);

    // Use the combined shader program object
    gl.useProgram(shaderProgram);

    /*======== Associating shaders to buffer objects ========*/

    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Get the attribute location
    const coord = gl.getAttribLocation(shaderProgram, 'coordinates');

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);

    /*============= Drawing the primitive ===============*/

    // Clear the canvas
    gl.clearColor(0.5, 0.5, 0.5, 0.9);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set the view port
    gl.viewport(0, 0, 640, 480);

    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 3);
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
