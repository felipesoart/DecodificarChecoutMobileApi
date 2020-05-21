import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-mostrar-extrato',
  templateUrl: './mostrar-extrato.page.html',
  styleUrls: ['./mostrar-extrato.page.scss'],
})
export class MostrarExtratoPage implements OnInit {

 
  codColigada: number;
  codFilial: number;
  idLan: number;
  idBoleto: number;
  servico: string="";
  parcela: string="";
  status: string=""; 
  valorLiquido: number; 
  dataVencimento: string="";
  

  constructor(
    private router: Router,
    private provider: PostProvider, 
    public toastController: ToastController,
    private actRoute: ActivatedRoute 
    ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      this.codColigada = data.CodColigada;
      this.codFilial = data.CodFilial;
      this.idLan = data.IdLan;
      this.idBoleto = data.IdBoleto;
      this.servico = data.Servico;
      this.parcela = data.Parcela;
      this.status = data.Status;
      this.valorLiquido = data.ValorLiquido;
      this.dataVencimento = data.DataVencimento;
      console.log(data);
    });
  }

  btPagamento(){
    this.router.navigate(['/pagamento'])
  }

  btBoleto(){
    
  }
}
