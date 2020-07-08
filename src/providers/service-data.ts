import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Componente } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: Array<Object> = [];
 
  constructor(private router: Router, private http: HttpClient) { }
 
  setData(uri,data) {
    this.data[0] = data;
    this.router.navigateByUrl(uri);
    console.log(data)
  }
 
  getData() {
    return this.data[0];
  }

  getMenu(){
    return this.http.get<Componente[]>('assets/data/menu.json');
  }

}