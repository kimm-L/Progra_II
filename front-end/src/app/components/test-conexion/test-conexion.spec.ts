import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConexion } from './test-conexion';

describe('TestConexion', () => {
  let component: TestConexion;
  let fixture: ComponentFixture<TestConexion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestConexion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestConexion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
