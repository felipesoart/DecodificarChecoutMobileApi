import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NegociacoesPageRoutingModule } from './negociacoes-routing.module';

import { NegociacoesPage } from './negociacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NegociacoesPageRoutingModule
  ],
  declarations: [NegociacoesPage]
})
export class NegociacoesPageModule {}
