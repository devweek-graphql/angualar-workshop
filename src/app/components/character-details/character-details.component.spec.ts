import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharcaterDetailsComponent } from './character-details.component';

describe('CharcaterDetailsComponent', () => {
  let component: CharcaterDetailsComponent;
  let fixture: ComponentFixture<CharcaterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharcaterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharcaterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
