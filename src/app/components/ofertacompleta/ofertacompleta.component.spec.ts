import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertacompletaComponent } from './ofertacompleta.component';

describe('OfertacompletaComponent', () => {
  let component: OfertacompletaComponent;
  let fixture: ComponentFixture<OfertacompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfertacompletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertacompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
