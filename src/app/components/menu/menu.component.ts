import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from 'src/providers/service-data';
import { Componente } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  
  componentes: Observable<Componente[]>

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.componentes = this.dataService.getMenu();
  }
}
