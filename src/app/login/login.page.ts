import { DataService } from './../../providers/service-data';
import { ToastController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx'
import { resolve } from 'url';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: string;
  senha: string;

  

  constructor(
    private router: Router,
    private provider: PostProvider,
    private storage: NativeStorage,
    public toast: ToastController,
    private dataService: DataService,
  ) { }

  ngOnInit() {
  }



  async btlogin() {

    
    //ALERT BASICOS
    if (this.login == "") {
      const toast = await this.toast.create({
        message: 'Preencha o Usuário',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    if (this.senha == "") {
      const toast = await this.toast.create({
        message: 'Preencha a Senha',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }


    let dados = {
      requisicao: 'login',
      login: this.login,
      senha: this.senha,
    };
    this.provider.Api(dados, 'api/Autenticacao').subscribe(async data => {
      var alert = data['MessageResponse'];
    if (this.login == "" && this.senha == "") {
      const toast = await this.toast.create({
        message: alert,
        duration: 5000,
        color: 'warning'
      });
      toast.present();
      return;
    }
  });
//VERIFICACAO DE LOGIN
    this.provider.Api(dados, 'api/Autenticacao').subscribe(async data => {
      var alert = data['MessageResponse'];
      if (data['StatusResponse'] == 1) {
        this.storage.setItem('session_storage', data['Response']);
        console.log(data['Response']);
        this.dataService.setData('home', {login: this.login});/* passa a variavel login para a outra page pelo service-data */
        this.router.navigate(['/home']);
        const toast = await this.toast.create({
           message: 'Bem vindo!',
           duration: 3000,
           color: 'success'
        });
        toast.present();
        this.login = "";
        this.senha = "";
        console.log(data);
      } else {
        const toast = await this.toast.create({
          message: alert,
          duration: 5000,
          color: 'danger'
        });
        toast.present();
        console.log(data);
      }
    });
  }

}