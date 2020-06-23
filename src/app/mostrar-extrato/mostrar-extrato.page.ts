import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { ToastController } from '@ionic/angular';
import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';


@Component({
  selector: 'app-mostrar-extrato',
  templateUrl: './mostrar-extrato.page.html',
  styleUrls: ['./mostrar-extrato.page.scss'],
})
export class MostrarExtratoPage implements OnInit {

  /* variaveis de detale do pagamento */
  CodColigada: string = "";
  CodFilial: string = "";
  IdLan: number;
  IdBoleto: number;
  CodServicoPrincipal: string = "";
  Servico: string = ""
  Parcela: string = "";
  Status: string = "";
  ValorLiquido: number;
  DataVencimento: string = "";
  cvv: number;
  CValue: String;


  validadeAtual: number = new Date().getFullYear();
  validades: Array<Number> = new Array<Number>();
  validadeAno: number;

  meioPagamento: string = "";
  meioPagamentos: any = [];

  parcela: String;
  parcelas: Array<Number> = new Array<Number>();

/*   data: String;
  datas: any = [];
  datasAtual: [
    {mindataAtual: 2020},
    {maxdataAtual: 2030}

  ] */

  bandeira: String;
  bandeiras: any = [];
  bandeirasCredito: any = [
    {nomeBandeira: 'Visa'},
    {nomeBandeira: 'MasterCard'},
    {nomeBandeira: 'Elo'},
    {nomeBandeira: 'Amex'},
    {nomeBandeira: 'Dines'},
    {nomeBandeira: 'Discover'},
    {nomeBandeira: 'Aura'},
    {nomeBandeira: 'JCB'},
  ];
  bandeirasDebito: any = [
    {nomeBandeira: 'Visa'},
    {nomeBandeira: 'MasterCard'}
  ]





  /* variaveis de pagamento */
  nomeCartao: string = "";
  nomeRA: string = "Joao Paulo Felipe Sobrinho de Souza";



  
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
      this.CodColigada = data.CodColigada;
      this.CodFilial = data.CodFilial;
      this.Servico = data.Servico;
      this.IdBoleto = data.IdBoleto;
      this.CodServicoPrincipal = data.CodServicoPrincipal;
      this.Status = data.Status;
      this.ValorLiquido = data.ValorLiquido;
      this.DataVencimento = data.DataVencimento;
      console.log(data);
    });

    this.carregarFormasPagamento();
    this.carregarValidadeAno();
  }

  onChange(CValue) {
    this.meioPagamento = CValue;
    this.carregarTemplatePagamento();
    this.carragarBandeira();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Dados Salvos',
      duration: 15000,
      color: "success"
    });
    toast.present();
  }

  /*   btPagamento() {
     return new Promise(resolve => {
       let dados = {
         requisicao: 'add',
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
    
 
     });
   }  
   */

  carregarFormasPagamento() {

    return new Promise(resolve => {
      this.provider.ApiGet(`api/Pagamento/GetFormasPagamento/${this.CodColigada}/${this.CodFilial}/${this.CodServicoPrincipal}`)
        .subscribe(data => {
          /* console.log(data) */
          for (let mp of data['Response']['FormasPagamento']) {
            this.meioPagamentos.push(mp);
            err => console.log(err)
          }
          resolve(true);

        });
    });
  }

  /* let variavel: number=this.parcela as number; explo de corverta string em numero */

  carregarTemplatePagamento() {
    this.parcela = "";
    this.parcelas = []
    return new Promise(resolve => {
      this.provider.ApiGet(`api/Pagamento/GetTemplatePagamento/${this.meioPagamento}`)
        .subscribe(data => {

          let minParcela = data['Response']['TemplatePagamento']['MinimoParcelas']
          let maxParcela = data['Response']['TemplatePagamento']['MaximoParcelas']
          for (let p = minParcela; p <= maxParcela; p++) {
            this.parcelas.push(p);
          }
          /* console.log(data['Response']['TemplatePagamento']['MaximoParcelas']) */

          resolve(true);

        });
    });
  }

  carragarBandeira() {
    this.bandeira = "";
    this.bandeiras=[];
    return new Promise(resolve => {      
      if (this.meioPagamento == '1063') {
      /*   console.log(this.bandeiras=this.bandeirasCredito) */
        this.bandeiras=this.bandeirasCredito;        
      }
      if (this.meioPagamento == '1064') {
        /* console.log(this.bandeiras=this.bandeirasDebito) */
        this.bandeiras=this.bandeirasDebito;
      }
      resolve(true);

    });
  }

  carregarValidadeAno(){

    this.validades = []
    return new Promise(resolve => {
      let mindataAtual = this.validadeAtual
      let maxdataAtual = this.validadeAtual + 11
        for (let v = mindataAtual; v <= maxdataAtual; v++) {
          this.validades.push(v);
        }
      resolve(true);

    });
  }


}
