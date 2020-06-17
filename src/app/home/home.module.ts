import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';/* 
import { PostProvider } from 'src/providers/post-provider'; */
import { LancamentosComponent } from '../lancamentos/lancamentos.component';
/* import { LancamentosPage } from '../lancamentos/lancamentos.page'; */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


/* import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DataTableComponent } from 'src/app//data-table/data-table.component';
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgbModule
   /*  PostProvider, */
    /* MatTableModule,
    MatPaginatorModule,
    MatSortModule, */
  ],
  declarations: [HomePage, LancamentosComponent] 
  
})
export class HomePageModule {}
