# possible configuration to use MoveNet

```
    if (!this.detector) {
      console.log('No Pose detector saved, will create one');
      const model = poseDetection.SupportedModels.MoveNet;
      this.detector = await poseDetection.createDetector(model, {
        architecture: 'ResNet50',
      } as poseDetection.PosenetModelConfig);
      console.log('Pose detector created', this.detector);
```

# error with BlazePose

```
 const model = poseDetection.SupportedModels.BlazePose;

this.detector = await poseDetection.createDetector(model, {
        runtime: 'tfjs',
        modelType: 'lite',
        maxPoses: 5,
      } as poseDetection.BlazePoseTfjsModelConfig);

    const poses = await this.detector.estimatePoses(video, {
      maxPoses: 5,
      flipHorizontal: false,
      scoreThreshold: 0.4,
    });

Error: Multi-pose detection is not implemented yet. Please set maxPoses to 1.
    at pose-detection.esm.js:1177:41
    at t2.<anonymous> (pose-detection.esm.js:1179:13)
    at pose-detection.esm.js:131:17
    at Object.next (pose-detection.esm.js:142:7)
    at pose-detection.esm.js:65:33
    at new ZoneAwarePromise (zone.js:2702:25)
    at N (pose-detection.esm.js:44:10)
    at t2.estimatePoses (pose-detection.esm.js:1169:12)
    at _PoseDetectorService.<anonymous> (pose-detector.service.ts:49:39)
    at Generator.next (<anonymous>)
    ```

