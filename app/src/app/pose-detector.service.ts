import { Injectable } from '@angular/core';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

@Injectable({
  providedIn: 'root',
})
export class PoseDetectorService {
  private detector: poseDetection.PoseDetector | null = null;

  constructor() {}
  isReady(): boolean {
    if (this.detector) {
      return true;
    }
    return false;
  }

  // Initialize TensorFlow and pose detection
  async initPoseDetection(): Promise<poseDetection.PoseDetector> {
    // Wait for TensorFlow to be ready
    await tf.ready();

    if (!this.detector) {
      const model = poseDetection.SupportedModels.BlazePose;
      this.detector = await poseDetection.createDetector(model, {
        runtime: 'tfjs',
        modelType: 'lite',
        maxPoses: 1,
      } as poseDetection.BlazePoseTfjsModelConfig);
    }

    return this.detector;
  }

  // Perform pose detection
  async detect(video: HTMLVideoElement): Promise<poseDetection.Pose[]> {
    if (!this.detector) {
      throw new Error(
        'Pose detector is not initialized. Call initPoseDetection() first.'
      );
    }

    const poses = await this.detector.estimatePoses(video, {
      maxPoses: 1,
      flipHorizontal: false,
      scoreThreshold: 0.4,
    });

    return poses;
  }
}
