import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdetaillistComponent } from './testdetaillist.component';

describe('TestdetaillistComponent', () => {
  let component: TestdetaillistComponent;
  let fixture: ComponentFixture<TestdetaillistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestdetaillistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdetaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
