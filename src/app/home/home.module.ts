import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';/* 
import { PostProvider } from 'src/providers/post-provider'; */
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
   /*  PostProvider, */
    /* MatTableModule,
    MatPaginatorModule,
    MatSortModule, */
  ],
  declarations: [HomePage] /* , DataTableComponent */
})
export class HomePageModule {}
