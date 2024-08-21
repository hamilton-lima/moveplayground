import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-green-balloon-game',
  standalone: true,
  imports: [],
  templateUrl: './green-balloon-game.component.html',
  styleUrl: './green-balloon-game.component.scss',
})
export class GreenBalloonGameComponent implements OnInit {
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  balloons: any[] = [];
  greenCount = 0;
  redCount = 0;
  gameTime = 300000; // 5 minutes in milliseconds
  timer = 60; // Timer for each round (60 seconds)

  ngOnInit() {
    this.setupCanvas();
    this.startGame();
  }

  setupCanvas() {
    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.spawnBalloons();
  }

  startGame() {
    let gameInterval = setInterval(() => {
      this.updateCanvas();
    }, 1000 / 60);

    let timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.resetRound();
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      this.endGame();
    }, this.gameTime);
  }

  resetRound() {
    this.timer = 60;
    this.spawnBalloons();
  }

  spawnBalloons() {
    if (this.canvas) {
      // Create balloons in random positions
      for (let i = 0; i < 10; i++) {
        this.balloons.push({
          x: Math.random() * this.canvas.width,
          y: this.canvas.height,
          color: Math.random() > 0.5 ? 'green' : 'red',
          radius: 30,
          speed: Math.random() * 2 + 1,
          popped: false,
        });
      }
    }
  }

  updateCanvas() {
    if (!this.ctx || !this.canvas) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw timer
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Time: ${this.timer}s`, 10, 20);

    // Draw balloons
    this.balloons.forEach((balloon) => {
      if (!balloon.popped && this.ctx) {
        balloon.y -= balloon.speed;
        this.ctx.beginPath();
        this.ctx.arc(balloon.x, balloon.y, balloon.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = balloon.color;
        this.ctx.fill();
      }
    });
  }

  popBalloon(balloon: any) {
    if (!balloon.popped) {
      balloon.popped = true;
      if (balloon.color === 'green') {
        this.greenCount++;
      } else {
        this.redCount++;
      }
    }
  }

  endGame() {
    // Display the final score
    alert(`Game Over! Green: ${this.greenCount}, Red: ${this.redCount}`);
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const clickX = event.clientX;
    const clickY = event.clientY;

    this.balloons.forEach((balloon) => {
      const dist = Math.sqrt(
        (clickX - balloon.x) ** 2 + (clickY - balloon.y) ** 2
      );
      if (dist < balloon.radius) {
        this.popBalloon(balloon);
      }
    });
  }
}
