import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JletComponent } from './jlet.component';

describe('JletComponent', () => {
  let component: JletComponent;
  let fixture: ComponentFixture<JletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JletComponent]
    });
    fixture = TestBed.createComponent(JletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
