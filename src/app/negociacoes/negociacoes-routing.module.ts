import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NegociacoesPage } from './negociacoes.page';

const routes: Routes = [
  {
    path: '',
    component: NegociacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NegociacoesPageRoutingModule {}
