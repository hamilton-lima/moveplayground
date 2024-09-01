import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeGameRenderComponent } from './tic-tac-toe-game-render.component';

describe('TicTacToeGameRenderComponent', () => {
  let component: TicTacToeGameRenderComponent;
  let fixture: ComponentFixture<TicTacToeGameRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicTacToeGameRenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicTacToeGameRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
