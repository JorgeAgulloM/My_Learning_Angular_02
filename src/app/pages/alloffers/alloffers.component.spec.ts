import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOffersComponent } from './alloffers.component';

describe('OfertasComponent', () => {
  let component: AllOffersComponent;
  let fixture: ComponentFixture<AllOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});