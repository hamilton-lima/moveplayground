import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenBalloonGameComponent } from './green-balloon-game.component';

describe('GreenBalloonGameComponent', () => {
  let component: GreenBalloonGameComponent;
  let fixture: ComponentFixture<GreenBalloonGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreenBalloonGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenBalloonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
