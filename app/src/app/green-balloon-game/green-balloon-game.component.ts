import { Component, OnInit } from '@angular/core';
import { PreviewRefreshHelper } from '../preview-refresh.helper';

class Balloon {
  x: number = 0;
  y: number = 0;
  radius: number = 2;
  color: string = '#FFFFFF';
  popped: boolean = false;
  creationTime: number = 0;
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

  lines: number[] = [];
  currentLine = this.MAX_LINES - 1;

  greenCount = 0;
  redCount = 0;

  totalGameTime = 300000; // 5 minutes in milliseconds
  currentTime = 0; // Timer for each round (60 seconds)

  private refresh: PreviewRefreshHelper;
  possiblePositions: { x: number; y: number }[] = [];

  constructor() {
    this.refresh = PreviewRefreshHelper.getInstance();
  }

  ngOnInit() {
    this.setup();
    this.calculateLines();
    this.possiblePositions = this.calculatePossiblePositions(5);
    this.start();
  }

  calculateLines() {
    const heightOfEachLine = Math.floor(this.canvas.height / this.MAX_LINES);
    const halfLine = heightOfEachLine / 2;

    for (let i = 1; i <= this.MAX_LINES; i++) {
      const yPos = heightOfEachLine * i - halfLine;
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
    this.refresh.setup(1);
    this.refresh.render.subscribe((elapsed: number) => {
      this.updateTimer(elapsed);
      this.udpate();
    });

    this.addBalloons();
    this.refresh.start();
  }

  udpate() {
    this.clearScreen();
    this.drawPossiblePositions(this.possiblePositions);
    this.drawAllBalloons();
    this.drawTimer();
    this.moveBallons();
  }

  moveBallons() {
    const newLine = this.lines[this.currentLine--];
    if (this.currentLine < 0) {
      this.currentLine = this.MAX_LINES - 1;
    }

    this.balloons.forEach((balloon) => {
      balloon.y = newLine;
    });
  }

  updateTimer(elapsed: number) {
    this.currentTime += elapsed;
  }

  getNewBallon(): Balloon {
    const y = this.lines[this.currentLine];

    const result: Balloon = {
      x: Math.random() * this.canvas.width,
      y: y,
      color: Math.random() > 0.5 ? 'green' : 'red',
      radius: 30,
      popped: false,
      creationTime: performance.now(),
    };

    return result;
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawTimer() {
    const seconds = Math.floor(this.currentTime / 1000);
    // Draw timer
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Time: ${seconds} seconds`, 10, 20);
  }

  drawAllBalloons() {
    this.balloons.forEach((balloon) => {
      this.drawBalloon(balloon);
    });
  }

  drawBalloon(balloon: Balloon) {
    this.ctx.beginPath();
    this.ctx.arc(balloon.x, balloon.y, balloon.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = balloon.color;
    this.ctx.fill();
  }

  addBalloons() {
    const balloonCount = 4;
    // clone the possible positions
    const availablePositions = [...this.possiblePositions];

    for (let i = 0; i < balloonCount; i++) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const { x, y } = availablePositions.splice(randomIndex, 1)[0];

      const balloon: Balloon = {
        x: x,
        y: y,
        color: Math.random() > 0.5 ? 'green' : 'red',
        radius: this.BALLOON_RADIUS,
        popped: false,
        creationTime: performance.now(),
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
    this.ctx.strokeStyle = '#cccccc'; // Set the outline color for the empty circles
    this.ctx.lineWidth = 2;

    positions.forEach(({ x, y }) => {
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.BALLOON_RADIUS, 0, 2 * Math.PI);
      this.ctx.stroke(); // Draw the outline of the circle
    });
  }

  // popBalloon(balloon: any) {
  //   if (!balloon.popped) {
  //     balloon.popped = true;
  //     if (balloon.color === 'green') {
  //       this.greenCount++;
  //     } else {
  //       this.redCount++;
  //     }
  //   }
  // }

  // @HostListener('document:click', ['$event'])
  // handleClick(event: MouseEvent) {
  //   const clickX = event.clientX;
  //   const clickY = event.clientY;

  //   this.balloons.forEach((balloon) => {
  //     const dist = Math.sqrt(
  //       (clickX - balloon.x) ** 2 + (clickY - balloon.y) ** 2
  //     );
  //     if (dist < balloon.radius) {
  //       this.popBalloon(balloon);
  //     }
  //   });
  // }
}
