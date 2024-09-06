import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalloonsGamePageComponent } from './balloons-game-page.component';

describe('BalloonsGamePageComponent', () => {
  let component: BalloonsGamePageComponent;
  let fixture: ComponentFixture<BalloonsGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalloonsGamePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalloonsGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
