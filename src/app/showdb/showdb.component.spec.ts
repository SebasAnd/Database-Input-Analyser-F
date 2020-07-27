import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdbComponent } from './showdb.component';

describe('ShowdbComponent', () => {
  let component: ShowdbComponent;
  let fixture: ComponentFixture<ShowdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
