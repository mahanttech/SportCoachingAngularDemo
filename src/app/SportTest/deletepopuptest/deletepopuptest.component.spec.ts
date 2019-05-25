import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepopuptestComponent } from './deletepopuptest.component';

describe('DeletepopuptestComponent', () => {
  let component: DeletepopuptestComponent;
  let fixture: ComponentFixture<DeletepopuptestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletepopuptestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletepopuptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
