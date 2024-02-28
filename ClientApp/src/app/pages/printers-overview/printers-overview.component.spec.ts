import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintersOverviewComponent } from './printers-overview.component';

describe('PrintersOverviewComponent', () => {
  let component: PrintersOverviewComponent;
  let fixture: ComponentFixture<PrintersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintersOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
