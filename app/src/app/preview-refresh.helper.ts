import { Subject } from 'rxjs';

export class PreviewRefreshHelper {
  private fps: number = 10;
  private lastFrameTime: number = 0;
  private running = false;
  render: Subject<number>;

  static getInstance() {
    return new PreviewRefreshHelper();
  }

  private constructor() {
    this.render = new Subject();
  }

  setup(fps: number) {
    this.fps = fps;
    this.lastFrameTime = 0;
  }

  start(): void {
    this.running = true;
    this.lastFrameTime = performance.now();
    this.animate();
  }

  stop(): void {
    this.running = false;
    this.lastFrameTime = performance.now();
  }

  private animate(): void {
    requestAnimationFrame((currentTime) => {
      const elapsedTime = currentTime - this.lastFrameTime;

      // Calculate frame interval based on desired FPS
      const frameInterval = 1000 / this.fps;

      if (elapsedTime >= frameInterval) {
        this.lastFrameTime = currentTime - (elapsedTime % frameInterval); // Update the last frame time
        this.render.next(elapsedTime);
      }

      if (this.running) {
        this.animate();
      }
    });
  }
}
