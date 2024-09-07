// Basic vertex shader for testing
uniform float u_time;
uniform vec2 u_mouse;

void main() {
    vec3 pos = position;
    
    // Simple animation based on time
    pos.x += sin(u_time + position.x) * 0.1;
    pos.y += cos(u_time + position.y) * 0.1;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}