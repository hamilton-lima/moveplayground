import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoseDrawerComponent } from './pose-drawer.component';

describe('PoseDrawerComponent', () => {
  let component: PoseDrawerComponent;
  let fixture: ComponentFixture<PoseDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoseDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoseDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
