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

 
  CodColigada: number;
  CodFilial: number;
  IdLan: number;
  IdBoleto: number;
  Servico: string="";
  Parcela: string="";
  Status: string=""; 
  ValorLiquido: number; 
  DataVencimento: string="";
  

  constructor(
    private router: Router,
    private provider: PostProvider, 
    public toastController: ToastController,
    private actRoute: ActivatedRoute 
    ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      this.CodColigada = data.CodColigada;
      this.CodFilial = data.CodFilial;
      this.IdLan = data.IdLan;
      this.IdBoleto = data.IdBoleto;
      this.Servico = data.Servico;
      this.Parcela = data.Parcela;
      this.Status = data.Status;
      this.ValorLiquido = data.ValorLiquido;
      this.DataVencimento = data.DataVencimento;
      console.log(data);
    });
  }

}
