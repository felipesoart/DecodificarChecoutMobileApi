import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MostrarExtratoPage } from './mostrar-extrato.page';

describe('MostrarExtratoPage', () => {
  let component: MostrarExtratoPage;
  let fixture: ComponentFixture<MostrarExtratoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarExtratoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MostrarExtratoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
