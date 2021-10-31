import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaofertasComponent } from './listaofertas.component';

describe('ListaofertasComponent', () => {
  let component: ListaofertasComponent;
  let fixture: ComponentFixture<ListaofertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaofertasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaofertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
