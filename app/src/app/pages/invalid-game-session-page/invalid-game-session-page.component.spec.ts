import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidGameSessionPageComponent } from './invalid-game-session-page.component';

describe('InvalidGameSessionPageComponent', () => {
  let component: InvalidGameSessionPageComponent;
  let fixture: ComponentFixture<InvalidGameSessionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidGameSessionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidGameSessionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
