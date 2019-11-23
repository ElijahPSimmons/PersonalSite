import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrazyEightsComponent } from './crazy-eights.component';

describe('CrazyEightsComponent', () => {
  let component: CrazyEightsComponent;
  let fixture: ComponentFixture<CrazyEightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrazyEightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrazyEightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
