import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bebida } from './bebida';

describe('Bebida', () => {
  let component: Bebida;
  let fixture: ComponentFixture<Bebida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bebida],
    }).compileComponents();

    fixture = TestBed.createComponent(Bebida);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
