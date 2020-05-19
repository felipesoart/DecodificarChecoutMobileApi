import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataTableDataSource, DataTableItem} from './data-table-datasource';
import { MatTable } from '@angular/material/table'; 


@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

/* export class DataTableComponent implements AfterViewInit, OnInit */
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;/* 
  @ViewChild(MatTable) table: MatTable<DataTableItem>; */
  dataSource: DataTableDataSource;

  /** Colunas exibidas na tabela. Os IDs das colunas podem ser adicionados, removidos ou reordenados. , comocar depois no fim 'pagamento'*/
  displayedColumns = ['id', 'servico', 'periodo', 'parcela', 'vencimento', 'startus',
   'original', 'desconto', 'multas', 'juros', 'liquido'];

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.paginator, this.sort);
    
  }

/*    ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }  */  
}
