import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusRestaurantesComponent } from './meus-restaurantes.component';

describe('MeusRestaurantesComponent', () => {
  let component: MeusRestaurantesComponent;
  let fixture: ComponentFixture<MeusRestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusRestaurantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
