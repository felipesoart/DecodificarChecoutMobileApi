import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NegociacoesPage } from './negociacoes.page';

describe('NegociacoesPage', () => {
  let component: NegociacoesPage;
  let fixture: ComponentFixture<NegociacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegociacoesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NegociacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
