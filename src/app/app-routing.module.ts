import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home', 
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'mostrar-extrato',
    loadChildren: () => import('./mostrar-extrato/mostrar-extrato.module').then( m => m.MostrarExtratoPageModule)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },

  {path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {path: 'home', loadChildren: './home/home.module#HomePageModule' },
  {path: 'mostrar-extrato/:CodColigada/:CodFilial/:IdLan/:IdBoleto/:Servico/:Parcela/:Status/:ValorLiquido/:DataVencimento', loadChildren: './mostrar-extrato/mostrar-extrato.module#MostrarExtratoPageModule' },
  {path: 'pagamento', loadChildren: './pagamento/pagamento.module#PagamentoPageModule' },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
