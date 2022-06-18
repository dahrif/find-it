import { Component } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  activeAnnonceArray!: any[];
  segmentValue = '1';
  categoryArray: any[];
  objPerduArray!: any[];
  objTrouveArray!: any[];

  constructor(
    private annonceService: AnnonceService,
    private categoryService: CategoryService,
    
  ) {

    this.annonceService.loadTrouve().subscribe((val) => {
      this.objTrouveArray = val;
    });

    
    this.annonceService.loadPerdu().subscribe((val) => {
      this.objPerduArray = val;
    });

    this.annonceService.loadActive().subscribe((val) => {
      this.activeAnnonceArray = val;
    });
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe((val) => {
      this.categoryArray = val;
    });

  }

  segmentChanged(event) {
    this.segmentValue = event.detail.value;
  }

  
}
