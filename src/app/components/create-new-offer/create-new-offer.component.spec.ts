import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewOfferComponent } from './create-new-offer.component';

describe('CreateNewOfferComponent', () => {
  let component: CreateNewOfferComponent;
  let fixture: ComponentFixture<CreateNewOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
