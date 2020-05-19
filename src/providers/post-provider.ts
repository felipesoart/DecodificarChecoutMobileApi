import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class PostProvider{
    server: string = "http://localhost/Decodificar.CheckOut.MobileApi/";
    
   /*  items = []; */
    constructor(private http : HttpClient) {
       /*  this.http.get(this.extrato).toPromise().then(data=> {
            console.log(data);
            

            for (let key in data)
                if (data.hasOwnProperty(key))
                    this.items.push(data[key]);
        });  */           
    }

    Api(dados: any, api: string){
        
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
            
        };
              
        let url = this.server + api;
        return this.http.post(url, JSON.stringify(dados), httpOptions)
        .map(res => res);
    }  

 
     ApiGet(api: string){
        
                   
        let url = this.server + api;
        return this.http.get(url);
        /* .map(res => res.json()); */
    }  
       
}
