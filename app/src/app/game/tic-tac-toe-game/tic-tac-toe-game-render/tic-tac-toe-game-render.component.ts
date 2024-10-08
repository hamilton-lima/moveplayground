import { Component, OnInit } from '@angular/core';
import { PreviewRefreshHelper } from '../../../preview-refresh.helper';
import {
  CurrentPoseStateService,
  Hand,
} from '../../../pose-detector/current-pose-state.service';

@Component({
  selector: 'app-tic-tac-toe-game-render',
  standalone: true,
  imports: [],
  templateUrl: './tic-tac-toe-game-render.component.html',
  styleUrl: './tic-tac-toe-game-render.component.scss',
})
export class TicTacToeGameRenderComponent implements OnInit {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  board: string[][] = [
    ['cross', 'circle', 'cross'],
    ['cross', 'circle', 'circle'],
    ['cross', 'cross', 'circle'],
  ];

  handTimestamps: (number | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  private refresh: PreviewRefreshHelper;

  constructor(private poseState: CurrentPoseStateService) {
    this.refresh = PreviewRefreshHelper.getInstance();
  }

  ngOnInit() {
    this.setup();
    this.start();

    this.poseState.handDetected.subscribe((hand: Hand) => {
      this.detectHandPosition(hand);
    });
  }

  // detect if the hand position is playing
  detectHandPosition(hand: Hand) {
    const thirdWidth = this.canvas.width / 3;
    const thirdHeight = this.canvas.height / 3;

    // Determine the column and row based on hand position
    const col = Math.floor(hand.x / thirdWidth);
    const row = Math.floor(hand.y / thirdHeight);

    // Ensure the calculated indexes are within bounds
    if (col >= 0 && col < 3 && row >= 0 && row < 3) {
      // Check if the hand is in a new quadrant
      if (this.handTimestamps[row][col] === null) {
        // Reset all positions to null
        this.resetHandTimestamps();

        // Set the timestamp for the new quadrant
        this.handTimestamps[row][col] = Date.now();
      }
    }
  }

  resetHandTimestamps() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.handTimestamps[i][j] = null;
      }
    }
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
      this.update();
    });

    this.refresh.start();
  }

  update() {
    this.clearScreen();
    this.drawBoard();
    this.highlightQuadrant();
    this.drawElements();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  highlightQuadrant() {
    const thirdWidth = this.canvas.width / 3;
    const thirdHeight = this.canvas.height / 3;

    this.ctx.fillStyle = 'rgba(128, 128, 128, 0.5)'; // 30% alpha gray

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.handTimestamps[i][j] !== null) {
          const x = j * thirdWidth;
          const y = i * thirdHeight;
          this.ctx.fillRect(x, y, thirdWidth, thirdHeight);
        }
      }
    }
  }

  drawElements() {
    const thirdWidth = this.canvas.width / 3;
    const thirdHeight = this.canvas.height / 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const x = j * thirdWidth;
        const y = i * thirdHeight;

        if (this.board[i][j] === 'circle') {
          this.drawCircle(
            x + thirdWidth / 2,
            y + thirdHeight / 2,
            thirdWidth / 4
          );
        } else if (this.board[i][j] === 'cross') {
          this.drawCross(
            x + thirdWidth / 2,
            y + thirdHeight / 2,
            thirdWidth / 4
          );
        }
      }
    }
  }

  drawBoard() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const thirdWidth = width / 3;
    const thirdHeight = height / 3;

    // Draw vertical lines
    this.ctx.beginPath();
    this.ctx.moveTo(thirdWidth, 0);
    this.ctx.lineTo(thirdWidth, height);
    this.ctx.moveTo(2 * thirdWidth, 0);
    this.ctx.lineTo(2 * thirdWidth, height);

    // Draw horizontal lines
    this.ctx.moveTo(0, thirdHeight);
    this.ctx.lineTo(width, thirdHeight);
    this.ctx.moveTo(0, 2 * thirdHeight);
    this.ctx.lineTo(width, 2 * thirdHeight);

    this.ctx.strokeStyle = '#00FFFF'; // Cyan color
    this.ctx.lineWidth = 4;
    this.ctx.stroke();
  }

  drawCircle(x: number, y: number, radius: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.strokeStyle = '#00FFFF'; // Cyan color
    this.ctx.lineWidth = 4;
    this.ctx.stroke();
  }

  drawCross(x: number, y: number, size: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x - size, y - size);
    this.ctx.lineTo(x + size, y + size);
    this.ctx.moveTo(x + size, y - size);
    this.ctx.lineTo(x - size, y + size);
    this.ctx.strokeStyle = '#00FFFF'; // Cyan color
    this.ctx.lineWidth = 4;
    this.ctx.stroke();
  }
}
