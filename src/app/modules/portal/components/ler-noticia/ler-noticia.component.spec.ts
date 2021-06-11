import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LerNoticiaComponent } from './ler-noticia.component';

describe('LerNoticiaComponent', () => {
  let component: LerNoticiaComponent;
  let fixture: ComponentFixture<LerNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LerNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LerNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
