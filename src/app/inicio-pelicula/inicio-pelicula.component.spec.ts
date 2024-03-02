import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPeliculaComponent } from './inicio-pelicula.component';

describe('InicioPeliculaComponent', () => {
  let component: InicioPeliculaComponent;
  let fixture: ComponentFixture<InicioPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioPeliculaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
