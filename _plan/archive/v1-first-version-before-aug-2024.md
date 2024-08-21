# v1 - First version of the plan before 20-aug-204

## First version 
- Indentify skeletal - OK 
    - Preview overlay in the video - OK
    - Choose video source - OK 
    - Draw lines to connect the key body parts - OK

- Enable multiple pode detection, is working with only one, see documentation https://github.com/tensorflow/tfjs-models/tree/master/pose-detection

- Sync to Colyseus server
- Display as 3D spheres

## MVP 
The goal of the initial version is to allow a remove shared experience during the halloween of 2024.

- Research skeletal structure libraries - OK 
- Identify skeletal structure nomenclature and compatible 3D models
- Build first end to end synchonization implementation
- Add URL option to display only the 3D rendering, to be watched in a separated screen

## Next steps 

- Track events in a kafka stream
- Receive events sequence using https://temporal.io and generate videos
- Post videos to twitter 
- Allow the creation of separated rooms

