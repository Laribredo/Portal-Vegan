import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRestaurantesComponent } from './cadastro-restaurantes.component';

describe('CadastroRestaurantesComponent', () => {
  let component: CadastroRestaurantesComponent;
  let fixture: ComponentFixture<CadastroRestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroRestaurantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
