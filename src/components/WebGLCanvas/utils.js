/**
 * Creates a shader of the given type, uploads the source and compiles it
 * @param {WebGLRenderingContext} gl
 * @param {number} type
 * @param {string} source
 * @return {WebGLShader}
 */
function loadShader(gl, type, source) {
	const shader = gl.createShader(type);

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		gl.deleteShader(shader);
		throw new Error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
	}

	return shader;
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 * @return {WebGLProgram}
 */
export function initShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	const shaderProgram = gl.createProgram();

	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		throw new Error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
	}

	return shaderProgram;
}


/**
 * @param {WebGLRenderingContext} gl
 * @param {array} positions
 * @param {array} colors
 * @return {{
 * 		position: WebGLBuffer,
 * 		color: WebGLBuffer
 * }}
 */
export function initBuffers(gl, positions, colors) {
	const positionBuffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	const colorBuffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	return {
		position: positionBuffer,
		color: colorBuffer,
	};
}

/**
 * @param {WebGLRenderingContext} gl
 * @param {Array<ShaderInfo>} shadersInfo
 */
export function bindShadersToBuffers(gl, shadersInfo) {
	shadersInfo.forEach(shader => {
		// Bind vertex buffer object
		gl.bindBuffer(gl.ARRAY_BUFFER, shader.buffer);

		// Point an attribute to the currently bound VBO
		gl.vertexAttribPointer(
			shader.location,
			shader.numberComponents,
			shader.type,
			shader.normalize,
			shader.stride,
			shader.offset
		);
		gl.enableVertexAttribArray(shader.location);
	});
}

/**
 * @typedef {{
 *   location: number,
 *   numberComponents: number,
 *   type: number,
 *   normalize: boolean,
 *   stride: number,
 *   offset: number,
 *   buffer: WebGLBuffer
 * }} ShaderInfo
 */
