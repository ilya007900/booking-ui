import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsSearchFormComponent } from './hotels-search-form.component';

describe('HotelsSearchFormComponent', () => {
  let component: HotelsSearchFormComponent;
  let fixture: ComponentFixture<HotelsSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsSearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelsSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
