import { DataService } from './../../providers/service-data';
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
  CodServicoPrincipal: string = "";

  IdLan: number;
  IdBoleto: number;
 
  Servico: string = ""
  Parcela: string = "";
  Status: string = "";
  ValorLiquido: number;
  DataVencimento: string = "";
  cvv: number;
  CValue: String;
  nomeCartao: string = "";
  numeroCartao: string = "";

  valorTotal: number  = 0.00;




  meioPagamento: string = "";
  meioPagamentos: any = [];

  parcela: String;
  parcelas: Array<Number> = new Array<Number>();

  validadeAtualAno: number = new Date().getFullYear();
  validadesAno: Array<Number> = new Array<Number>();
  validadeAno: number;
  
  validadeMes: number;
  validadesMes: any = [];
  validadeMeses: any=[
    {mes: 1}, {mes: 2}, {mes: 3},
    {mes: 4}, {mes: 5}, {mes: 6},
    {mes: 7}, {mes: 8}, {mes: 9},
    {mes: 10}, {mes: 11}, {mes: 12} 
  ];

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

  listaBoletosSelecionados: Array<any> = new Array<any>();
  listasBoletosSelecionados: any = [];
  

  constructor(
    private router: Router,
    private provider: PostProvider,
    public toastController: ToastController,
    private actRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    /* this.actRoute.params.subscribe((data: any) => {
      this.CodColigada = data.CodColigada;
      this.CodFilial = data.CodFilial;
      this.Servico = data.Servico;
      this.IdBoleto = data.IdBoleto;
      this.CodServicoPrincipal = data.CodServicoPrincipal;
      this.Status = data.Status;
      this.ValorLiquido = data.ValorLiquido;
      this.DataVencimento = data.DataVencimento;
      console.log(data);
    }); */

     


    this.listaBoletosSelecionados = this.dataService.getData()["listaBoletosSelecionados"];
    
    
    this.carregarlistaBoletosSelecionados();
    this.carregarFormasPagamento();
    this.carregarValidadeAno();
    this.carregarValidadeMes();

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
         let codColigada: string = this.CodColigada.toString();
         let codFilial: string = this.CodFilial.toString();
         let codServicoPrincipal: string = this.CodServicoPrincipal.toString();
    return new Promise(resolve => {
      this.provider.ApiGet(`api/Pagamento/GetFormasPagamento/${codColigada}/${codFilial}/${codServicoPrincipal}`)
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

    this.validadesAno = []
    return new Promise(resolve => {
      let mindataAtual = this.validadeAtualAno
      let maxdataAtual = this.validadeAtualAno + 11
        for (let v = mindataAtual; v <= maxdataAtual; v++) {
          this.validadesAno.push(v);
        }
      resolve(true);

    });
  }

  carregarValidadeMes() {    
    this.validadesMes=[];
    return new Promise(resolve => {      
      
        this.validadesMes=this.validadeMeses;        
            
      resolve(true);

    });
  }

  carregarlistaBoletosSelecionados(){

    return new Promise(resolve => {
      let listaBoletosSelecionados = this.listaBoletosSelecionados
      for (let lbs of listaBoletosSelecionados) {
        /* carrega total do valor */
        this.listasBoletosSelecionados.push(lbs); 
        let convert: number = lbs['extrato'].ValorLiquido as number;
        this.CodFilial = lbs['extrato'].CodFilial as string;
        this.CodColigada = lbs['extrato'].CodColigada as string;
        this.CodServicoPrincipal = lbs['extrato'].CodServicoPrincipal as string;
        this.valorTotal += convert;

        err => console.log(err)
      }
      
      resolve(true);
       
    });

  } 
  
}
