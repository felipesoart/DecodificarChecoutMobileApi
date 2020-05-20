import { LoginPageModule } from './../login/login.module';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';

import { IonInfiniteScroll, ToastController } from '@ionic/angular';



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
   IdLan: number;
   IdBoleto: number; */
  start: number = 0;
  Servico: string = "";
  Parcela: string = "";
  DataVencimento: string = "";
  /* 
  login: string = "";
  
  
  CodColigada: number=1;
  @ViewChild(LoginPage) ra: number=login;
  /* Status: string=""; 
  ValorLiquido: number;*/



  constructor(
    private router: Router,
    private provider: PostProvider,
    public ToastController: ToastController,
    
  ) {

  }

  ngOnInit() {
    this.carregar();
  }

  ionViewCanEnter() {
    this.listas = [];
    this.start = 0;
    this.carregar();
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
  loadData(event) {

    /* this.start += this.limit; */

    setTimeout(() => {
      this.carregar().then(() => {
        event.target.complete();

      });

    }, 500);
  }


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

  /* mostrar(id, nome, telefone, email){
      this.router.navigate(['/mostrar-cliente/' + id + '/' + nome + '/' + telefone + '/' + email]);
    } */

  mostrar(CodColigada, CodFilial, IdLan, IdBoleto, Servico, Parcela, Status, ValorLiquido, DataVencimento) {
    this.router.navigate(['/mostrar-extrato/' + CodColigada + '/' + CodFilial + '/' + IdLan + '/' + IdBoleto + '/' + Servico + '/' + Parcela + '/' + Status + '/' + ValorLiquido + '/' + DataVencimento]);
  }

  carregar() {
    return new Promise(resolve => {
      this.provider.ApiGet('api/ExtratoFinanceiro/GetExtratoFinanceiroAluno/1/716396')
      .subscribe(data => {
        console.log(data);
        for (let extrato of data['Response']['Itens']) {
          this.listas.push(extrato);
          err => console.log(err)
        }
        resolve(true);
        
      });

    });

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

