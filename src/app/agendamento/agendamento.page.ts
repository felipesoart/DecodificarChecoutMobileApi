import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {
  
  Status: string;
  width: any=window.innerWidth;
  heith: any=window.innerHeight;

  constructor() { }

  ngOnInit() {
 this.statusv()
  }

  ionViewCanEnter() {
    this.statusv()
  }

statusv(){
  return new Promise(resolve => {
    
  if(this.width < this.heith){
    this.Status = "classNone";
}else{
   this.Status = "classBlock";
}
console.log(this.width);
console.log(this.heith);
console.log(this.Status);
resolve(true);

  });
}

}
