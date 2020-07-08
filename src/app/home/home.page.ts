import { LoginPage } from './../login/login.page';
import { LoginPageModule } from './../login/login.module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { ModalController, MenuController } from '@ionic/angular';

import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { DataService } from 'src/providers/service-data';
import { LancamentosComponent } from '../lancamentos/lancamentos.component';
import { createPublicKey } from 'crypto';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { element } from 'protractor';
import { exit } from 'process';
/* import { LoginPage } from '../login/login.page'; */



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listas: any = [];
  /*  limit: number = 15;
   
   CodColigada: number;
   CodFilial: number;
   IdLan: number; */
  IdBoleto: number; 
  Status: string = "";
  CodServicoPrincipal: string = "";
  Parcela: string = "";
  DataVencimento: string = "";
  codColigada: number;
  CodFilial: number;
  titulo: string;

  listaBoletosSelecionados: Array<any> = new Array<any>();
  boletosPagar: Array<any> = new Array<any>();
  
  
  checkbox: boolean;

  bp: any =[
    
  ];
 

 /*  extrato: object={
    codColigada: 2,
    dataVencimento: "15/06/2020",
    idLancamento: 123456,
    servico: "mensalidade",
    status: "Em aberto",
    valorLiquido: 154 

  } */

  /* 
  login: string = "";
  
  
  CodColigada: number=1;
  @ViewChild(LoginPage) ra: number=login;
  /* Status: string=""; 
  ValorLiquido: number;*/



  constructor(
    private menu: MenuController,
    private router: Router,
    private provider: PostProvider,
    public ToastController: ToastController,
    private dataService: DataService,
    private modalCtrl: ModalController
    /* private loginService: LoginPage */
  ) { }

/*    get raLogin() {
    // usando o UsuarioProvider
    return this.LoginPage.login;
  }  */

  ngOnInit() {
    this.carregar();
    console.log(this.boletosPagar)
   
  }

  toggleMenu(){
    this.menu.toggle();
   }

  ionViewCanEnter() {
    this.listas = [];
    /* this.start = 0; */
    this.carregar();
  }

  btpagar(extrato){    
      if (extrato!=null) {
        let listaBoletosSelecionados: Array<any> = new Array<any>();
        
        listaBoletosSelecionados.push({extrato: extrato})
      this.dataService.setData('mostrar-extrato', {listaBoletosSelecionados: listaBoletosSelecionados});
   
    }else{
      this.dataService.setData('mostrar-extrato', {listaBoletosSelecionados: this.listaBoletosSelecionados});
  
    }
  }

  

 async btLancamentos() {
    const modal = await this.modalCtrl.create({
    component: LancamentosComponent
    
    });
    
    modal.present();

}
  

  //Refresh
  /*   doRefresh(event) {
  
      setTimeout(() => {
        this.ionViewCanEnter();
        event.target.complete();
      }, 500);
    }
   */


  //barra de rolagem (verificar depois esse erro no php carregar)
/*   loadData(event) {

    this.start += this.limit;

    setTimeout(() => {
      this.carregar().then(() => {
        event.target.complete();

      });

    }, 500);
  } */


  async mensagemErro() {
    const toast = await this.ToastController.create({
      message: "Registro não encontrado",
      duration: 5000,
      color: 'danger'
    });
    toast.present();
  }


  /* addCliente(){
      this.router.navigate(['/add-cliente'])
    } */
  /* editar(id, nome, telefone, email){
      this.router.navigate(['/add-cliente/' + id + '/' + nome + '/' + telefone + '/' + email]);
    } */


/*     pagarmento(CodColigada, CodFilial, IdLan, IdBoleto, Servico, Parcela, Status, ValorLiquido, DataVencimento) {
    this.router.navigate(['/mostrar-extrato/' + CodColigada + '/' + CodFilial + '/' + IdLan + '/' + IdBoleto + '/' + Servico + '/' + Parcela + '/' + Status + '/' + ValorLiquido + '/' + DataVencimento]);
  }
 */

pagarmento(CodColigada, CodFilial, IdBoleto, CodServicoPrincipal, Status, ValorLiquido, DataVencimento, Lancamentos) {
  this.router.navigate(['/mostrar-extrato/' + CodColigada + '/' + CodFilial + '/' + IdBoleto + '/' + CodServicoPrincipal + '/'  + Status + '/' + ValorLiquido + '/' + DataVencimento + '/' + Lancamentos]);
}

  carregar() {
    
    let raLogin: String = this.dataService.getData()["login"];
    
    return new Promise(resolve => {
      this.provider.ApiGet(`api/ExtratoFinanceiro/GetExtratoFinanceiroAluno/1/${raLogin}`)
      .subscribe(data => {
        console.log(data);
        for (let extrato of data['Response']['Itens']) {
          this.listas.push(extrato);
          
          this.boletosPagar.push({extrato: extrato, checked: false})
          
          err => console.log(err)
        }
        resolve(true);
       
      });

    });

  }

  onBoletosPagarChange(event, extrato){
    
    this.boletosPagar.forEach(element=>{
      if (extrato.IdBoleto == element.extrato.IdBoleto) {
        element.checked = event.detail.checked;
        console.log(element)
        exit;
      }    

    })

    this.listaBoletosSelecionados=this.obterBoletosSelecionados(this.boletosPagar);
    console.log(this.boletosPagar);
   
  }

  obterBoletosSelecionados(boletosPagar){
    let listaBoletosSelecionados: Array<any> = new Array<any>();
    
    listaBoletosSelecionados = boletosPagar.map((extrato: any)=>(extrato.checked == true ? extrato: null));
    listaBoletosSelecionados = listaBoletosSelecionados.filter(e=>e!=null);
    return listaBoletosSelecionados;

  }


  geraBoleto(){
    
  }

  /* excluir(id){
    let dados = {
      requisicao : 'excluir',
      id : id
    };
  
    this.provider.inserirApi(dados, 'inserirCliente.php').subscribe(data => {
      this.ionViewCanEnter();
       
      });
    }  */

  /*  buscar(){
      return new Promise(resolve => {
        let dados = {
          requisicao : 'buscar',
          nome : this.nome,
          
          
       
        };
        this.provider.inserirApi(dados, 'inserirCliente.php').subscribe(data => {
          this.clientes = [];
          for(let cliente of data['result']){
            this.clientes.push(cliente);
            err => console.log(err)
          }
          resolve(true);
        });
  
      });
  
    } */

}

