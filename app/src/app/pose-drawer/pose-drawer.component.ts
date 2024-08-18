import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
} from '@angular/core';
import { Pose } from '@tensorflow-models/pose-detection';

@Component({
  selector: 'app-pose-drawer',
  standalone: true,
  templateUrl: './pose-drawer.component.html',
  styleUrls: ['./pose-drawer.component.scss'],
})
export class PoseDrawerComponent implements AfterViewInit, OnChanges {
  @ViewChild('poseCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() poses: Pose[] = []; // Input to receive pose data

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.drawPose();
  }

  ngOnChanges(): void {
    if (this.ctx) {
      this.clearCanvas();
      this.drawPose();
    }
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawPose(): void {
    if (!this.poses || this.poses.length === 0) return;

    this.poses.forEach((pose) => {
      const keypoints = pose.keypoints;
      keypoints.forEach((keypoint: any) => {
        if (keypoint.score > 0.98) {
          this.drawPoint(keypoint.x, keypoint.y);
        }
      });
    });
  }

  private drawPoint(x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw a circle at the keypoint
    this.ctx.fillStyle = 'red'; // Set color
    this.ctx.fill();
  }
}
