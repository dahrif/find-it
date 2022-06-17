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
  annonceArray!: any[];
  objPerduArray!: any[];
  newHeight = 0;

  constructor(
    private annonceService: AnnonceService,
    private categoryService: CategoryService,
    
  ) {

    this.annonceService.loadTrouve().subscribe((val) => {
      this.activeAnnonceArray = val;
    });

    
    this.annonceService.loadPerdu().subscribe((val) => {
      this.objPerduArray = val;
    });
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe((val) => {
      this.categoryArray = val;
    });

  }

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }

  scroll(event) {
    const value = event.detail.scrollTop;
    console.log(value, this.newHeight);
    if(value > 40) {
      this.newHeight += 5; // this.newHeight = this.newHeight + 5
    } else {
      this.newHeight = 0;
    }
    if(value > 180 && this.newHeight <= 65) {
      this.newHeight += 50;
    }
  }

  
}
