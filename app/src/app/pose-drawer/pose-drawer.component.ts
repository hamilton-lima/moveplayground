import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
} from '@angular/core';
import { Keypoint, Pose } from '@tensorflow-models/pose-detection';
import {
  CurrentPoseStateService,
  Hand,
} from '../pose-detector/current-pose-state.service';
import { estimateHandPosition } from './hand.estimate.function';

const headKeypoints = [
  'nose',
  'left_eye',
  'right_eye',
  'left_ear',
  'right_ear',
];

const keypointConnections: [string, string][] = [
  // Head
  // ['nose', 'left_eye_inner'],
  // ['nose', 'right_eye_inner'],
  // ['left_eye_inner', 'left_eye'],
  // ['left_eye', 'left_eye_outer'],
  // ['right_eye_inner', 'right_eye'],
  // ['right_eye', 'right_eye_outer'],
  // ['left_eye_outer', 'left_ear'],
  // ['right_eye_outer', 'right_ear'],

  // Mouth
  ['mouth_left', 'mouth_right'],

  // Upper body
  ['left_shoulder', 'right_shoulder'],
  ['left_shoulder', 'left_elbow'],
  ['left_elbow', 'left_wrist'],
  ['right_shoulder', 'right_elbow'],
  ['right_elbow', 'right_wrist'],

  // Hands (optional)
  // ['left_wrist', 'left_thumb'],
  // ['left_wrist', 'left_index'],
  // ['left_wrist', 'left_pinky'],
  // ['right_wrist', 'right_thumb'],
  // ['right_wrist', 'right_index'],
  // ['right_wrist', 'right_pinky'],

  // Torso
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],

  // Lower body
  ['left_hip', 'left_knee'],
  ['left_knee', 'left_ankle'],
  ['right_hip', 'right_knee'],
  ['right_knee', 'right_ankle'],

  // Feet (optional)
  ['left_ankle', 'left_foot_index'],
  ['left_ankle', 'left_heel'],
  ['right_ankle', 'right_foot_index'],
  ['right_ankle', 'right_heel'],
];

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

  constructor(private poseState: CurrentPoseStateService) {}

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

    console.log('poses', this.poses);

    this.poses.forEach((pose) => {
      const keypoints = pose.keypoints;
      keypoints.forEach((keypoint: Keypoint) => {
        // Skip hand connections, and facial points
        if (
          ['left_wrist', 'right_wrist'].includes(keypoint.name!) ||
          headKeypoints.includes(keypoint.name!)
        ) {
          return;
        }

        this.drawPoint(keypoint.x, keypoint.y, keypoint.score!);
      });

      this.drawSkeletonWithStrings(pose.keypoints);
      this.drawHeadCircleAroundCenter(pose.keypoints);
      this.drawHandCirclesAroundCenter(pose.keypoints); // Draw circle around the center of hand keypoints
    });
  }

  private drawPoint(x: number, y: number, score: number): void {
    if (score > 0.5) {
      const color = this.getColorForConfidence(score); // Get the color based on confidence
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw a circle at the keypoint
      this.ctx.fillStyle = color; // Set color based on confidence
      this.ctx.fill();
    }
  }

  private getColorForConfidence(score: number): string {
    // Normalize the score between 0 and 1
    const normalizedScore = (score - 0.5) * 2; // This maps 0.5 to 0 and 1 to 1
    const hue = Math.floor(normalizedScore * 120); // 0 is red, 120 is green
    return `hsl(${hue}, 100%, 50%)`; // HSL color where hue depends on normalized score
  }

  drawSkeletonWithStrings(keypoints: Keypoint[]) {
    const keypointMap = keypoints.reduce((map, keypoint) => {
      if (keypoint.name) {
        map[keypoint.name] = keypoint;
      }
      return map;
    }, {} as { [key: string]: any });

    keypointConnections.forEach(([part1, part2]) => {
      const kp1 = keypointMap[part1];
      const kp2 = keypointMap[part2];

      // Only draw the line if both keypoints have a score greater than a threshold (e.g., 0.5)
      if (kp1 && kp2 && kp1.score > 0.5 && kp2.score > 0.5) {
        this.ctx.beginPath();
        this.ctx.moveTo(kp1.x, kp1.y);
        this.ctx.lineTo(kp2.x, kp2.y);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
      }
    });
  }

  // New function to calculate and draw a circle around the center of the head keypoints
  private drawHeadCircleAroundCenter(keypoints: Keypoint[]) {
    const keypointMap = this.createKeypointMap(keypoints);

    // Calculate and draw the circle for the head
    this.drawCircleForHead(headKeypoints, keypointMap);
  }

  // Helper to calculate the center of head points and draw a circle
  private drawCircleForHead(
    headKeypoints: string[],
    keypointMap: { [key: string]: Keypoint }
  ) {
    const validKeypoints = headKeypoints
      .map((part) => keypointMap[part])
      .filter((kp) => kp && kp.score! > 0.5);

    if (validKeypoints.length > 0) {
      const center = this.calculateCenter(validKeypoints);

      this.ctx.beginPath();
      this.ctx.arc(center.x, center.y, 60, 0, 2 * Math.PI); // Draw a larger circle around the head center
      this.ctx.strokeStyle = 'white'; // Optional: color specific to the head
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
  }

  // New function to draw circles around the center of the hand points
  private drawHandCirclesAroundCenter(keypoints: Keypoint[]) {
    const keypointMap = this.createKeypointMap(keypoints);

    // Calculate and draw circle for left hand
    const left = this.drawCircleForHand(
      'left',
      'left_elbow',
      'left_wrist',
      keypointMap
    );

    // Calculate and draw circle for right hand
    const right = this.drawCircleForHand(
      'right',
      'right_elbow',
      'right_wrist',
      keypointMap
    );

    if (left) {
      this.poseState.moveHand(left);
    }

    if (right) {
      this.poseState.moveHand(right);
    }
  }

  // Helper to calculate the center of hand points and draw a circle
  private drawCircleForHand(
    name: string,
    foreArmStartKeypoint: string,
    foreArmEndKeypoint: string,
    keypointMap: { [key: string]: Keypoint }
  ): Hand | undefined {
    const start = keypointMap[foreArmStartKeypoint];
    const end = keypointMap[foreArmEndKeypoint];

    if (start && end && start.score! > 0.5 && end.score! > 0.5) {
      const center = estimateHandPosition(start, end);

      this.ctx.beginPath();
      this.ctx.arc(center.x, center.y, 20, 0, 2 * Math.PI); // Draw a circle around the center
      this.ctx.strokeStyle = 'blue'; // Optional: color specific to hands
      this.ctx.lineWidth = 3;
      this.ctx.stroke();

      return <Hand>{ name: name, x: center.x, y: center.y, radius: 20 };
    }

    return undefined;
  }

  // Helper to calculate the center of a set of keypoints
  private calculateCenter(keypoints: Keypoint[]): { x: number; y: number } {
    const totalPoints = keypoints.length;
    const center = keypoints.reduce(
      (acc, keypoint) => {
        acc.x += keypoint.x;
        acc.y += keypoint.y;
        return acc;
      },
      { x: 0, y: 0 }
    );

    return {
      x: center.x / totalPoints,
      y: center.y / totalPoints,
    };
  }

  // Helper function to create a keypoint map
  private createKeypointMap(keypoints: Keypoint[]): {
    [key: string]: Keypoint;
  } {
    return keypoints.reduce((map, keypoint) => {
      if (keypoint.name) {
        map[keypoint.name] = keypoint;
      }
      return map;
    }, {} as { [key: string]: Keypoint });
  }
}
