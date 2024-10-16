"use client";

import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";

interface CalibrationScreenProps {
  onCalibrationComplete: () => void;
}

export default function CalibrationScreen({
  onCalibrationComplete,
}: CalibrationScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let detector: poseDetection.PoseDetector;

    async function setupTensorFlowAndPoseDetection() {
      try {
        // Initialize TensorFlow.js
        await tf.ready();

        // Set the backend to 'webgl' which is widely supported
        await tf.setBackend("webgl");

        const model = poseDetection.SupportedModels.MoveNet;
        detector = await poseDetection.createDetector(model);

        if (videoRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          videoRef.current.srcObject = stream;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error setting up TensorFlow and Pose Detection:", error);
        setIsLoading(false);
      }
    }

    async function detectPose() {
      if (videoRef.current && detector) {
        try {
          const poses = await detector.estimatePoses(videoRef.current);
          if (poses.length > 0) {
            const torsoKeypoints = [
              "left_shoulder",
              "right_shoulder",
              "left_hip",
              "right_hip",
            ];
            const isTorsoVisible = torsoKeypoints.every(
              (kp) =>
                poses[0].keypoints.find((p) => p.name === kp)?.score ?? 0 > 0.5
            );

            if (isTorsoVisible) {
              setIsCalibrated(true);
              onCalibrationComplete();
            }
          }
          if (!isCalibrated) {
            requestAnimationFrame(detectPose);
          }
        } catch (error) {
          console.error("Error during pose detection:", error);
        }
      }
    }

    setupTensorFlowAndPoseDetection().then(() => {
      if (!isCalibrated) {
        detectPose();
      }
    });

    return () => {
      if (detector) {
        detector.dispose();
      }
    };
  }, [onCalibrationComplete, isCalibrated]);

  if (isLoading) {
    return (
      <div className="text-center">
        <FormattedMessage id="play.loading" />
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        <FormattedMessage id="play.calibration" />
      </h2>
      <p>
        <FormattedMessage id="play.calibrationInstructions" />
      </p>
      <video
        ref={videoRef}
        className="mx-auto mt-4"
        width="640"
        height="480"
        autoPlay
        playsInline
        muted
      />
    </div>
  );
}
