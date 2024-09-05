import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PreviewRefreshHelper } from '../preview-refresh.helper';
import {
  CurrentPoseStateService,
  Hand,
} from '../pose-detector/current-pose-state.service';

class Balloon {
  id: string = '';
  x: number = 0;
  y: number = 0;
  radius: number = 2;
  color: string = '#FFFFFF';
  popped: boolean = false;
  creationTime: number = 0;
  implosionStartTime: number | null = null; // Track when implosion starts
  imploding: boolean = false; // Is the balloon currently imploding?
}

@Component({
  selector: 'app-green-balloon-game',
  standalone: true,
  imports: [],
  templateUrl: './green-balloon-game.component.html',
  styleUrl: './green-balloon-game.component.scss',
})
export class GreenBalloonGameComponent implements OnInit {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  balloons: Balloon[] = [];

  readonly MAX_LINES = 4;
  readonly BALLOON_RADIUS = 30;
  readonly MIN_BALLOONS = 5;

  lines: number[] = [];
  currentLine = this.MAX_LINES - 1;

  @Output() green = new EventEmitter<void>();
  @Output() red = new EventEmitter<void>();
  // miliseconds
  @Output() time = new EventEmitter<number>();

  @Input() drawPositionsEnabled = false;

  totalGameTime = 300000; // 5 minutes in milliseconds
  currentTime = 0; // Timer for each round (60 seconds)

  private refresh: PreviewRefreshHelper;
  possiblePositions: { x: number; y: number }[] = [];

  constructor(private poseState: CurrentPoseStateService) {
    this.refresh = PreviewRefreshHelper.getInstance();
  }

  ngOnInit() {
    this.setup();
    this.calculateLines();
    this.possiblePositions = this.calculatePossiblePositions(5);
    this.start();

    this.poseState.handDetected.subscribe((hand: Hand) => {
      this.didHandPopBalloon(hand);
    });
  }

  didHandPopBalloon(hand: Hand) {
    this.balloons.forEach((balloon) => {
      const dist = Math.sqrt(
        (hand.x - balloon.x) ** 2 + (hand.y - balloon.y) ** 2
      );
      if (dist < balloon.radius) {
        this.popBalloon(balloon, `hand-${hand.name}`);
      }
    });
  }

  calculateLines() {
    const paddingTop = 50; // Define top padding in pixels
    const paddingBottom = 50; // Define bottom padding in pixels

    // Adjust the total height by subtracting the padding
    const availableHeight = this.canvas.height - paddingTop - paddingBottom;
    const heightOfEachLine = Math.floor(availableHeight / this.MAX_LINES);
    const halfLine = heightOfEachLine / 2;

    for (let i = 1; i <= this.MAX_LINES; i++) {
      const yPos = paddingTop + (heightOfEachLine * i - halfLine); // Apply top padding to yPos
      this.lines.push(yPos);
    }

    console.log('lines', this.lines, this.currentLine);
  }

  setup() {
    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Not able to get canvas context');
    }
    this.ctx = context;
  }

  start() {
    this.refresh.setup(20);
    this.refresh.render.subscribe((elapsed: number) => {
      this.updateTimer(elapsed);
      this.udpate();
    });

    this.refresh.start();
  }

  udpate() {
    this.clearScreen();
    this.removeOldRedBalloons();
    this.keepMinimumAmountOfBalloons();
    this.drawPossiblePositions(this.possiblePositions);
    this.drawAllBalloons();
    this.drawImplosions();
    this.time.emit(this.currentTime);
  }

  drawImplosions() {
    // Handle the implosion for each balloon
    this.balloons.forEach((balloon) => {
      if (balloon.imploding) {
        this.implodeBalloon(balloon); // Call implodeBalloon at each frame
      }
    });
  }

  removeOldRedBalloons() {
    const currentTime = performance.now();
    this.balloons = this.balloons.filter((balloon) => {
      if (
        balloon.color === 'red' &&
        currentTime - balloon.creationTime > 5000
      ) {
        return false; // Remove the balloon if it's red and older than 5 seconds
      }
      return true;
    });
  }

  keepMinimumAmountOfBalloons() {
    const missing = this.MIN_BALLOONS - this.balloons.length;
    this.addBalloons(missing);
  }

  updateTimer(elapsed: number) {
    this.currentTime += elapsed;
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawAllBalloons() {
    this.balloons.forEach((balloon) => {
      this.drawBalloon(balloon);
    });
  }

  drawBalloon(balloon: Balloon) {
    this.ctx.font = `${balloon.radius * 2}px Arial`; // Set font size relative to balloon radius
    this.ctx.textAlign = 'center'; // Align the text to the center
    this.ctx.textBaseline = 'middle'; // Align the text to the vertical middle

    // Choose the emoji based on the balloon color
    const emoji = balloon.color === 'green' ? '⚽' : '🏀';

    // Draw the emoji at the balloon's position
    this.ctx.fillText(emoji, balloon.x, balloon.y);
  }

  addBalloons(balloonCount: number) {
    // Clone the possible positions
    let availablePositions = [...this.possiblePositions];

    // Remove positions that are already occupied by existing balloons
    this.balloons.forEach((balloon) => {
      availablePositions = availablePositions.filter((position) => {
        const dist = Math.sqrt(
          (position.x - balloon.x) ** 2 + (position.y - balloon.y) ** 2
        );
        return dist >= this.BALLOON_RADIUS * 2; // Ensure no overlap by checking distance
      });
    });

    // Add new balloons at random positions
    for (let i = 0; i < balloonCount && availablePositions.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const { x, y } = availablePositions.splice(randomIndex, 1)[0]; // Remove the chosen position from the list

      const balloon: Balloon = {
        id: crypto.randomUUID(),
        x: x,
        y: y,
        color: Math.random() > 0.5 ? 'green' : 'red',
        radius: this.BALLOON_RADIUS,
        popped: false,
        creationTime: performance.now(),
        implosionStartTime: 0,
        imploding: false,
      };

      this.balloons.push(balloon);
    }
  }

  calculatePossiblePositions(balloonCount: number): { x: number; y: number }[] {
    const positions: { x: number; y: number }[] = [];

    const padding = this.BALLOON_RADIUS * 2; // Ensure there is space between balloons
    const horizontalSpacing = this.BALLOON_RADIUS * 2 + padding;
    const totalWidth = this.canvas.width;

    // Calculate possible positions along each line
    this.lines.forEach((y) => {
      let currentX = padding;

      // Ensure there is enough space for all balloons
      while (currentX + this.BALLOON_RADIUS * 2 <= totalWidth) {
        positions.push({ x: currentX + this.BALLOON_RADIUS, y: y }); // Store center position
        currentX += horizontalSpacing; // Move to the next position
      }
    });

    console.log('positions', positions);
    return positions;
  }

  drawPossiblePositions(positions: { x: number; y: number }[]) {
    if (!this.drawPositionsEnabled) {
      return;
    }

    this.ctx.strokeStyle = '#cccccc'; // Set the outline color for the empty circles
    this.ctx.lineWidth = 2;

    positions.forEach(({ x, y }) => {
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.BALLOON_RADIUS, 0, 2 * Math.PI);
      this.ctx.stroke(); // Draw the outline of the circle
    });
  }

  popBalloon(balloon: Balloon, source: string) {
    console.log('balloon popped by', source);

    if (!balloon.popped) {
      balloon.popped = true;
      if (balloon.color === 'green') {
        this.green.emit();
      } else {
        this.red.emit();
      }

      // Start the implosion effect
      this.implodeBalloon(balloon);
    }
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    if (!this.canvas) {
      console.warn('No canvas defined yet...');
      return;
    }
    // Get the bounding rectangle of the canvas
    const rect = this.canvas.getBoundingClientRect();

    // Calculate the click coordinates relative to the canvas
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    console.log('click', clickX, clickY);

    this.balloons.forEach((balloon) => {
      const dist = Math.sqrt(
        (clickX - balloon.x) ** 2 + (clickY - balloon.y) ** 2
      );
      if (dist < balloon.radius) {
        this.popBalloon(balloon, 'mouse-click');
      }
    });
  }

  implodeBalloon(balloon: Balloon, duration: number = 500) {
    if (!balloon.imploding) {
      // Start the implosion and record the start time
      balloon.imploding = true;
      balloon.implosionStartTime = performance.now();
      console.log('start imploding');
    }

    const currentTime = performance.now();
    const elapsed = currentTime - (balloon.implosionStartTime ?? 0);
    const progress = elapsed / duration;

    // Shrink the balloon's radius based on the progress of the animation
    balloon.radius = Math.max(balloon.radius * (1 - progress), 0);

    // If the implosion is complete, remove the balloon from the array
    if (progress >= 1) {
      balloon.imploding = false;
      this.balloons = this.balloons.filter((b) => b.id !== balloon.id);
    }
  }
}
