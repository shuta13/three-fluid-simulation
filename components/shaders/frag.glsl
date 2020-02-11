#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv; 
uniform float time;
uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform float shakeWidth;

void main( void ) 
{
    
    const float shakeLength = 0.004;
    const float speed = 1.8;
    // const float shakeWidth = 0.05;

    float offsetX = sin((gl_FragCoord.x + gl_FragCoord.y * 0.8) / 1.0 * shakeLength + time * speed) * shakeWidth;
    // float offsetY = cos(gl_FragCoord.y * shakeLength + time * speed) * shakeWidth;

    vec4 color = texture2D(tDiffuse, vec2(vUv.x + offsetX , vUv.y));
    gl_FragColor = color; 
}
