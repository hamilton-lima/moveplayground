import { Component, OnInit, HostListener } from '@angular/core';
import { PreviewRefreshHelper } from '../preview-refresh.helper';

class Balloon {
  x: number = 0;
  y: number = 0;
  radius: number = 2;
  color: string = '#FFFFFF';
  popped: boolean = false;
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
  readonly MAX_COLUMNS = 5;
  lines: number[] = [];
  currentLine = this.MAX_LINES - 1;

  greenCount = 0;
  redCount = 0;

  totalGameTime = 300000; // 5 minutes in milliseconds
  currentTime = 0; // Timer for each round (60 seconds)

  private refresh: PreviewRefreshHelper;

  constructor() {
    this.refresh = PreviewRefreshHelper.getInstance();
  }

  ngOnInit() {
    this.setup();
    this.calculateLines();
    this.start();
  }

  calculateLines() {
    const heightOfEachLine = Math.floor(
      this.canvas.height / this.MAX_LINES / 2
    );

    for (let i = 1; i < this.MAX_LINES; i++) {
      const yPos = heightOfEachLine * i;
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
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    this.refresh.setup(1);
    this.refresh.render.subscribe((elapsed: number) => {
      this.updateTimer(elapsed);
      this.udpate();
    });

    this.addsTestBalloons();
    this.refresh.start();
  }

  // TODO: remove this
  addsTestBalloons() {
    this.balloons.push(this.getNewBallon());
    this.balloons.push(this.getNewBallon());
    this.balloons.push(this.getNewBallon());
  }

  updateTimer(elapsed: number) {
    this.currentTime -= elapsed;
  }

  getNewBallon(): Balloon {
    const y = this.lines[this.currentLine];

    const result: Balloon = {
      x: Math.random() * this.canvas.width,
      y: y,
      color: Math.random() > 0.5 ? 'green' : 'red',
      radius: 30,
      popped: false,
    };

    return result;
  }

  udpate() {
    this.clearScreen();
    this.drawAllBalloons();
    this.drawTimer();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawTimer() {
    // Draw timer
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Time: ${this.currentTime}s`, 10, 20);
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

  // startGame() {
  //   let gameInterval = setInterval(() => {
  //     this.updateCanvas();
  //   }, 1000 / 60);

  //   let timerInterval = setInterval(() => {
  //     this.timer--;
  //     if (this.timer <= 0) {
  //       this.resetRound();
  //     }
  //   }, 1000);

  //   setTimeout(() => {
  //     clearInterval(gameInterval);
  //     clearInterval(timerInterval);
  //     this.endGame();
  //   }, this.gameTime);
  // }

  // resetRound() {
  //   this.timer = 60;
  //   this.spawnBalloons();
  // }

  // spawnBalloons() {
  //   if (this.canvas) {
  //     // Create balloons in random positions
  //     for (let i = 0; i < 10; i++) {
  //       this.balloons.push({
  //         x: Math.random() * this.canvas.width,
  //         y: this.canvas.height,
  //         color: Math.random() > 0.5 ? 'green' : 'red',
  //         radius: 30,
  //         speed: Math.random() * 2 + 1,
  //         popped: false,
  //       });
  //     }
  //   }
  // }

  // update() {
  //   if (!this.ctx || !this.canvas) {
  //     console.warn('No context or canvas found');
  //     return;
  //   }

  //   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  //   // Draw timer
  //   this.ctx.fillStyle = '#000';
  //   this.ctx.font = '20px Arial';
  //   this.ctx.fillText(`Time: ${this.timer}s`, 10, 20);

  //   // Draw balloons
  //   this.balloons.forEach((balloon) => {
  //     if (!balloon.popped && this.ctx) {
  //       balloon.y -= balloon.speed;
  //       this.ctx.beginPath();
  //       this.ctx.arc(balloon.x, balloon.y, balloon.radius, 0, 2 * Math.PI);
  //       this.ctx.fillStyle = balloon.color;
  //       this.ctx.fill();
  //     }
  //   });
  // }

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

  // endGame() {
  //   // Display the final score
  //   alert(`Game Over! Green: ${this.greenCount}, Red: ${this.redCount}`);
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
