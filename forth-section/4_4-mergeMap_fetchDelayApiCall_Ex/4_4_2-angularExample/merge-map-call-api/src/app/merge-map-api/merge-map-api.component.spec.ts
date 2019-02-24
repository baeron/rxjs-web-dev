import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeMapApiComponent } from './merge-map-api.component';

describe('MergeMapApiComponent', () => {
  let component: MergeMapApiComponent;
  let fixture: ComponentFixture<MergeMapApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeMapApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeMapApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
