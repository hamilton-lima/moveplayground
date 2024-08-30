import { Injectable } from '@angular/core';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { Subject } from 'rxjs';

export class PerformanceTracker {
  average: Subject<number> = new Subject();
  events: number[] = [];
  start: number = 0;
  seconds2Track: number;
  milisecs2Track: number;

  constructor(secondsToTrack: number) {
    this.seconds2Track = secondsToTrack;
    this.milisecs2Track = secondsToTrack * 1000;
  }

  track(measure: number) {
    this.events.push(measure);

    if (this.start == 0) {
      this.start = performance.now();
    }

    if (performance.now() - this.start > this.milisecs2Track) {
      const sum = this.events.reduce((total, num) => total + num, 0);
      const average = sum / this.events.length;
      this.average.next(average);
      this.events = [];
      this.start = performance.now();
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class PoseDetectorService {
  private detector: poseDetection.PoseDetector | null = null;
  private tracker: PerformanceTracker = new PerformanceTracker(10);

  constructor() {}
  isReady(): boolean {
    if (this.detector) {
      return true;
    }
    return false;
  }

  // Initialize TensorFlow and pose detection
  async initPoseDetection(): Promise<poseDetection.PoseDetector> {
    console.log('PoseDetection init');
    // Wait for TensorFlow to be ready
    await tf.ready();
    console.log('Tensorflow is ready');

    if (!this.detector) {
      console.log('No Pose detector saved, will create one');
      const model = poseDetection.SupportedModels.BlazePose;
      this.detector = await poseDetection.createDetector(model, {
        runtime: 'tfjs',
        modelType: 'lite',
        maxPoses: 1,
      } as poseDetection.BlazePoseTfjsModelConfig);
      console.log('Pose detector created', this.detector);
    }

    this.tracker.average.subscribe((average) => {
      console.log(
        `Average time to detect pose in the last ${this.tracker.seconds2Track} seconds: ${average}ms`
      );
    });

    return this.detector;
  }

  // Perform pose detection
  async detect(video: HTMLVideoElement): Promise<poseDetection.Pose[]> {
    if (!this.detector) {
      throw new Error(
        'Pose detector is not initialized. Call initPoseDetection() first.'
      );
    }

    const start = performance.now();
    const poses = await this.detector.estimatePoses(video, {
      maxPoses: 1,
      flipHorizontal: false,
      scoreThreshold: 0.5,
    });

    const result = this.flipPosesHorizontally(video, poses);

    // track elapsed time
    const end = performance.now();
    this.tracker.track(end - start);

    return result;
  }

  // TensorFlow pose detection is skipping flipHorizontal parameter, no changes if set to true
  // Then a manual flip is required
  // See https://github.com/tensorflow/tfjs/issues/8093
  flipPosesHorizontally(video: HTMLVideoElement, poses: poseDetection.Pose[]) {
    // Get the video width for manual flipping
    const videoWidth = video.videoWidth;

    // Flip all poses manually
    poses.forEach((pose) => {
      pose.keypoints.forEach((keypoint) => {
        keypoint.x = videoWidth - keypoint.x;
      });
    });

    return poses;
  }
}
