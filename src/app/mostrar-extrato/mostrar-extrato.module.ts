import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarExtratoPageRoutingModule } from './mostrar-extrato-routing.module';

import { MostrarExtratoPage } from './mostrar-extrato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarExtratoPageRoutingModule
  ],
  declarations: [MostrarExtratoPage]
})
export class MostrarExtratoPageModule {}
