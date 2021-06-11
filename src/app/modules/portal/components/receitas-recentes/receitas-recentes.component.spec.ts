import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasRecentesComponent } from './receitas-recentes.component';

describe('ReceitasRecentesComponent', () => {
  let component: ReceitasRecentesComponent;
  let fixture: ComponentFixture<ReceitasRecentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceitasRecentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitasRecentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
