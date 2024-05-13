import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsShellComponent } from './hotels-shell.component';

describe('HotelsShellComponent', () => {
  let component: HotelsShellComponent;
  let fixture: ComponentFixture<HotelsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsShellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
