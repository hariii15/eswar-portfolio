import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl';
import './DarkVeil.css';

const vertex = `
attribute vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}
`;

const fragment = `
#ifdef GL_ES
precision highp float;
#endif
uniform vec2 uResolution;
uniform float uTime;
uniform float uHueShift;
uniform float uNoise;
uniform float uScan;
uniform float uScanFreq;
uniform float uWarp;

// Classic smooth noise functions for high-precision organic animations
vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453123);
}

float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(dot(hash(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
                   dot(hash(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
               mix(dot(hash(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
                   dot(hash(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
}

float rand(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;
    
    // Scale coordinate space slightly
    p *= 1.6;
    
    // Add time-based velocity parameters for faster movement
    float t = uTime * 2.8; 
    
    // Multi-octave coordinate displacement warp
    vec2 q = vec2(0.0);
    q.x = noise(p + vec2(t * 0.35, t * 0.25));
    q.y = noise(p + vec2(t * -0.15, t * 0.45));
    
    vec2 r = vec2(0.0);
    r.x = noise(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.2);
    r.y = noise(p + 3.0 * q + vec2(8.3, 2.8) + t * 0.3);
    
    float f = noise(p + 3.5 * r);
    
    // Premium cinematic color palette coordinates (Deep indigo and violet gradients)
    vec3 col = vec3(0.03, 0.01, 0.08); // Dark background base
    vec3 col1 = vec3(0.24, 0.08, 0.48); // Royal violet-blue
    vec3 col2 = vec3(0.38, 0.12, 0.65); // Shifting magenta-violet
    vec3 col3 = vec3(0.09, 0.04, 0.22); // Moody ambient purple
    
    // Layer mixture
    col = mix(col, col1, clamp(f * 2.2, 0.0, 1.0));
    col = mix(col, col2, clamp(length(q), 0.0, 1.0) * 0.65);
    col = mix(col, col3, clamp(length(r), 0.0, 1.0) * 0.45);
    
    // Apply subtle scanline overlay
    float scanline = sin(gl_FragCoord.y * uScanFreq) * 0.5 + 0.5;
    col.rgb *= 1.0 - (scanline * scanline) * uScan;
    
    // Apply high-fidelity film noise
    col.rgb += (rand(gl_FragCoord.xy + uTime) - 0.5) * uNoise;
    
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export default function DarkVeil({
                                   hueShift = 0,
                                   noiseIntensity = 0.5,
                                   scanlineIntensity = 0,
                                   speed = 0.5,
                                   scanlineFrequency = 0,
                                   warpAmount = 0,
                                   resolutionScale = 1
                                 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      canvas
    });

    const gl = renderer.gl;
    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uHueShift: { value: hueShift },
        uNoise: { value: noiseIntensity },
        uScan: { value: scanlineIntensity },
        uScanFreq: { value: scanlineFrequency },
        uWarp: { value: warpAmount }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = parent.clientWidth,
        h = parent.clientHeight;
      renderer.setSize(w * resolutionScale, h * resolutionScale);
      program.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener('resize', resize);
    resize();

    const start = performance.now();
    let frame = 0;

    const loop = () => {
      program.uniforms.uTime.value = ((performance.now() - start) / 1000) * speed;
      program.uniforms.uHueShift.value = hueShift;
      program.uniforms.uNoise.value = noiseIntensity;
      program.uniforms.uScan.value = scanlineIntensity;
      program.uniforms.uScanFreq.value = scanlineFrequency;
      program.uniforms.uWarp.value = warpAmount;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [hueShift, noiseIntensity, scanlineIntensity, speed, scanlineFrequency, warpAmount, resolutionScale]);

  return <canvas ref={ref} className="darkveil-canvas" />;
}
