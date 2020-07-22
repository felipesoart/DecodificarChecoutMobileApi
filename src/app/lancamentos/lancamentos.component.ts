import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { BehaviorSubject, Observable } from 'rxjs';


import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/providers/service-data';
import { element } from 'protractor';



@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss'],
})
export class LancamentosComponent implements OnInit {

  
  closeResult: string;
  /* listaLancamentos: Array<Object> = new Array(); */
  @Input() extratoFinanLancamentos: Array<any>;
  @Input() titulo: string;
  /* listas: any = []; */
  /* codColigada: number;
  dataVencimento: string = "";
  IdLancamento: number;
  servico: string = "";
  status: string = "";
  valorLiquido: number;
  lista: Observable<any>; */
  ra: String = this.dataService.getData()["login"]
  IdBoleto: number;

  

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private provider: PostProvider,
    public toastController: ToastController,
    private actRoute: ActivatedRoute,
    private dataService: DataService,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    
  }

  
  
  open(content) {
    this.modalService.open(content).result.then(
        (result) => {
            this.closeResult = `Closed with: ${result}`;   
            console.log(this.extratoFinanLancamentos);     
            
        },
        (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
    );
   
}

btFechar(){
  this.modalService.dismissAll();
  console.log(this.extratoFinanLancamentos);
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return `with: ${reason}`;
    }
}



}
