import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarExtratoPage } from './mostrar-extrato.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarExtratoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarExtratoPageRoutingModule {}
