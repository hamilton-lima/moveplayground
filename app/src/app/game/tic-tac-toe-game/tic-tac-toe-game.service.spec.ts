import { TestBed } from '@angular/core/testing';

import { TicTacToeGameService } from './tic-tac-toe-game.service';

describe('TicTacToeGameService', () => {
  let service: TicTacToeGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicTacToeGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
