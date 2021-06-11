import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LerReceitaComponent } from './ler-receita.component';

describe('LerReceitaComponent', () => {
  let component: LerReceitaComponent;
  let fixture: ComponentFixture<LerReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LerReceitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LerReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
