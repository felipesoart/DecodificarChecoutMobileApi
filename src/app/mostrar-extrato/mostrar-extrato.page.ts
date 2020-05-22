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

  /* variaveis de detale do pagamento */
  codColigada: number;
  codFilial: number;
  idLan: number;
  idBoleto: number;
  servico: string = "";
  parcela: string = "";
  status: string = "";
  valorLiquido: number;
  dataVencimento: string = "";

  /* variaveis de pagamento */
  nomeCartao: string = "";
  nomeRA: string = "Joao Paulo Felipe Sobrinho de Souza";
  meioPagamento: any[];
  bandeira: any[];
  parcelas: number;
  validade: string = "";
  numeroCartao: string = "";
  codSeguranca: number;

  constructor(
    private router: Router,
    private provider: PostProvider,
    public toastController: ToastController,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
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


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Dados Salvos',
      duration: 15000,
      color: "success"
    });
    toast.present();
  }

  btPagamento() {
    return new Promise(resolve=> {
      let dados = {
        /* requisicao: 'add', */
        nomeCartao: this.nomeCartao,
        nomeRA: this.nomeRA,
        meioPagamento: this.meioPagamento,
        bandeira: this.bandeira,
        parcelas: this.parcelas,
        validade: this.validade,
        numeroCartao: this.numeroCartao,
        codSeguranca: this.codSeguranca
      };
      this.presentToast();
      console.log(dados);

      /* this.provider.Api(dados, 'inserirCliente.php')
        .subscribe(data => {
          this.router.navigate(['/clientes']);
          this.presentToast();
          console.log(data);
        }); */

    });
  }


}
