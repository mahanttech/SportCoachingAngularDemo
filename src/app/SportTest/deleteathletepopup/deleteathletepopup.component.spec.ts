import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteathletepopupComponent } from './deleteathletepopup.component';

describe('DeleteathletepopupComponent', () => {
  let component: DeleteathletepopupComponent;
  let fixture: ComponentFixture<DeleteathletepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteathletepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteathletepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
