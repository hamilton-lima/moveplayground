import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosePreviewComponent } from './pose-preview.component';

describe('PosePreviewComponent', () => {
  let component: PosePreviewComponent;
  let fixture: ComponentFixture<PosePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
