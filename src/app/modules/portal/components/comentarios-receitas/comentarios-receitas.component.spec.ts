import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosReceitasComponent } from './comentarios-receitas.component';

describe('ComentariosReceitasComponent', () => {
  let component: ComentariosReceitasComponent;
  let fixture: ComponentFixture<ComentariosReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosReceitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
