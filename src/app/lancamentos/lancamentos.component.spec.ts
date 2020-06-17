import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LancamentosComponent } from './lancamentos.component';

describe('LancamentosPage', () => {
  let component: LancamentosComponent;
  let fixture: ComponentFixture<LancamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
