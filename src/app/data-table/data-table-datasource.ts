import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Substitua isso por seu próprio tipo de modelo de dados
export interface DataTableItem {
  id:number;
  servico: string;
  periodo: string;
  parcela: number;
  vencimento: string;
  startus: string;
  original: number;
  desconto: number;
  multas: number;
  juros: number;
  liquido: number;
}

// TODO: substitua isso por dados reais do seu aplicativo
const EXAMPLE_DATA: DataTableItem[] = [
  {id:1, servico: 'Mensalidade', periodo: '2015A', parcela: 5, vencimento: '10/05/2015', startus: 'em Aberto', original: 943.00, desconto: 943.00, multas: 18.68, juros: 0.00, liquido: 18.68},
  {id:2, servico: 'Libro', periodo: '2015A', parcela: 5, vencimento: '10/05/2015', startus: 'em Aberto',original: 943.00, desconto: 943.00, multas: 18.68, juros: 0.00, liquido: 18.68},
  {id:3, servico: 'revista', periodo: '2015A', parcela: 5, vencimento: '10/05/2015', startus: 'em Aberto', original: 943.00, desconto: 943.00, multas: 18.68, juros: 0.00, liquido: 18.68},
  {id:4, servico: 'jornal', periodo: '2015A', parcela: 5, vencimento: '10/05/2015', startus: 'em Aberto', original: 943.00, desconto: 943.00, multas: 18.68, juros: 0.00, liquido: 18.68},
  {id:5, servico: 'lapes', periodo: '2015A', parcela: 5, vencimento: '10/05/2015', startus: 'em Aberto', original: 943.00, desconto: 943.00, multas: 18.68, juros: 0.00, liquido: 18.68},
  {id:6, servico: 'atação', periodo: '2015A', parcela: 5, vencimento: '10/05/2015', startus: 'em Aberto', original: 943.00, desconto: 943.00, multas: 18.68, juros: 0.00, liquido: 18.68},
  {id:7, servico: 'pintura', periodo: '2015A', parcela: 5, vencimento: '10/05/2015', startus: 'em Aberto', original: 943.00, desconto: 943.00, multas: 18.68, juros: 0.00, liquido: 18.68},
  {id:8, servico: 'Mensalidade', periodo: '2015A', parcela: 5, vencimento: '10/05/2015', startus: 'em Aberto', original: 943.00, desconto: 943.00, multas: 18.68, juros: 0.00, liquido: 18.68}

];

/**
 * Fonte de dados para a exibição DataTable. Esta classe deve
 * encapsula toda a lógica para buscar e manipular os dados exibidos
 * (incluindo classificação, paginação e filtragem).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
 /*  paginator: MatPaginator;
  sort: MatSort; */

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
  
  * Conecte esta fonte de dados à tabela. A tabela será atualizada somente quando
   * o fluxo retornado emite novos itens.
   * @returns Um fluxo de itens a serem renderizados.
   */
  connect(): Observable<DataTableItem[]> {
    // Combina tudo que afeta os dados renderizados em uma atualização
    // fluxo para a tabela de dados consumir.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];


    // define o comprimento dos paginatos length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'servico': return compare(a.servico, b.servico, isAsc);
        case 'periodo': return compare(a.periodo, b.periodo, isAsc);
        case 'parcela': return compare(a.parcela, b.parcela, isAsc);
        case 'vencimento': return compare(a.vencimento, b.vencimento, isAsc);
        case 'startus': return compare(a.startus, b.startus, isAsc);
        case 'original': return compare(a.original, b.original, isAsc);
        case 'desconto': return compare(a.desconto, b.desconto, isAsc);
        case 'multas': return compare(a.multas, b.multas, isAsc);
        case 'juros': return compare(a.juros, b.juros, isAsc);
        case 'liquido': return compare(a.liquido, b.liquido, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
