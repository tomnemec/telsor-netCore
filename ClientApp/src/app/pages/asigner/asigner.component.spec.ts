import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignerComponent } from './asigner.component';

describe('AsignerComponent', () => {
  let component: AsignerComponent;
  let fixture: ComponentFixture<AsignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
