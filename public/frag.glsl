#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 seed;

varying vec2 v_texcoord;

#define NUM_OCTAVES 5

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 49.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);
  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
    u.y
  );
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

mat2 rotation2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main(void) {
  vec2 uv = v_texcoord;
  vec2 mouse = u_mouse / u_resolution;
  float dist = distance(uv, mouse);
  float strength = smoothstep(0.3, 0.01, dist);

  // 🎨 Pastel Color Palette
  vec4 color1 = vec4(0.3294, 0.6039, 0.4706, 1.0);     // blue (base)
  vec4 color2 = vec4(0.9922, 0.9647, 0.8784, 1.0);   // light pink
  vec4 colorMid = vec4(1.0, 0.9843, 0.9569, 1.0);    // light orange (NEW!)
  vec4 color3 = vec4(1.0, 1.0, 1.0, 1.0);   // cream
  vec4 color4 = vec4(1.0, 1.0, 1.0, 1.0);      // warm orange

  // 🌾 Grain + FBM movement
  float grain = mix(-0.3 * strength, 0.1 * strength, rand(uv * 100.0));
  vec2 movement = vec2(u_time * 0.0001, u_time * -0.00001);
  movement *= rotation2d(u_time * 0.0001);
  float f = fbm(uv + movement);
  f *= 5.0;
  f += grain * 2.5;
  f += u_time * 0.055;
  f = fract(f);

  float gap = mix(0.08, 0.01, strength);
  float mixer = smoothstep(-0.02, gap, f) - smoothstep(-0.09 - gap, 0.9, f);

  // 🎛️ Blend across 5 colors
  vec4 blendedColor;
  if (f < 0.25) {
    blendedColor = mix(color1, color2, f / 0.25);
  } else if (f < 0.5) {
    blendedColor = mix(color2, colorMid, (f - 0.25) / 0.25);
  } else if (f < 0.75) {
    blendedColor = mix(colorMid, color3, (f - 0.65) / 0.45);
  } else {
    blendedColor = mix(color3, color4, (f - 0.65) / 0.25);
  }

  vec4 finalColor = mix(color1, blendedColor, mixer);
  gl_FragColor = finalColor;
}
