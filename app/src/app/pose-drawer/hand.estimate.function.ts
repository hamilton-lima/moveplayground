// Define a type for a point with x and y coordinates
type Point = {
  x: number;
  y: number;
};

// Function to calculate the distance between two points
function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Function to normalize a vector
function normalizeVector(x: number, y: number): Point {
  const length = Math.sqrt(x ** 2 + y ** 2);
  return { x: x / length, y: y / length };
}

// Function to calculate the next point in the sequence
function calculateNextPoint(
  elbow: Point,
  wrist: Point,
  proportion: number
): Point {
  // Calculate the distance from the elbow to the wrist
  const distanceElbowToWrist = calculateDistance(
    elbow.x,
    elbow.y,
    wrist.x,
    wrist.y
  );

  // Calculate the direction vector from elbow to wrist
  const directionVector = { x: wrist.x - elbow.x, y: wrist.y - elbow.y };

  // Normalize the direction vector
  const normalizedVector = normalizeVector(
    directionVector.x,
    directionVector.y
  );

  // Calculate the distance from the wrist to the next point (1/4 of elbow to wrist)
  const distanceWristToNext = distanceElbowToWrist * proportion;

  // Calculate the next point's coordinates
  const nextPoint: Point = {
    x: wrist.x + distanceWristToNext * normalizedVector.x,
    y: wrist.y + distanceWristToNext * normalizedVector.y,
  };

  return nextPoint;
}

export function estimateHandPosition(elbow: Point, wrist: Point) {
  // Proportion for the distance from wrist to the next point (1/4 of elbow to wrist)
  const proportion = 1 / 4;

  // Calculate the next point
  const nextPoint: Point = calculateNextPoint(elbow, wrist, proportion);
  return nextPoint;
}
