import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosNoticiaComponent } from './comentarios-noticia.component';

describe('ComentariosNoticiaComponent', () => {
  let component: ComentariosNoticiaComponent;
  let fixture: ComponentFixture<ComentariosNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
