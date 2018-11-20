precision mediump float;

void main() {
    gl_FragColor = vec4(fract(gl_FragCoord.xy / vec2(16., 32.)), 0, 1);
}
