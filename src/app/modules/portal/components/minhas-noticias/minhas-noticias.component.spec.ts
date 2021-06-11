import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasNoticiasComponent } from './minhas-noticias.component';

describe('MinhasNoticiasComponent', () => {
  let component: MinhasNoticiasComponent;
  let fixture: ComponentFixture<MinhasNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
