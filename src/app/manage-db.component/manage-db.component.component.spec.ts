import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDbComponentComponent } from './manage-db.component';

describe('ManageDb.ComponentComponent', () => {
  let component: ManageDb.ComponentComponent;
  let fixture: ComponentFixture<ManageDb.ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDb.ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDb.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
