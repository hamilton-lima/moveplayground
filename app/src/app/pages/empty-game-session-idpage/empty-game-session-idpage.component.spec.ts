import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyGameSessionIDPageComponent } from './empty-game-session-idpage.component';

describe('EmptyGameSessionIDPageComponent', () => {
  let component: EmptyGameSessionIDPageComponent;
  let fixture: ComponentFixture<EmptyGameSessionIDPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyGameSessionIDPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyGameSessionIDPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
