declare module "glslCanvas" {
  export default class GlslCanvas {
    constructor(canvas: HTMLCanvasElement);
    load(frag: string): void;
    setUniform(name: string, value: number): void;
  }
}
