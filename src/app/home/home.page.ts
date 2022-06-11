import { Component } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  activeAnnonceArray!: any[];

  constructor(private annonceService : AnnonceService) {

    this.annonceService.loadActive().subscribe(val => {
      this.activeAnnonceArray = val;
    })

  }

}
