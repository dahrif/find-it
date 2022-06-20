import { Component } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { CategoryService } from '../services/category.service';
import SwiperCore, { EffectFade, SwiperOptions } from 'swiper';

SwiperCore.use([EffectFade]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  desactiveAnnonceArray!: any[];
  segmentValue = '1';
  categoryArray: any[];
  objPerduArray!: any[];
  objTrouveArray!: any[];

  config: SwiperOptions;
  config1: SwiperOptions;

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

    this.annonceService.loadDesactive().subscribe((val) => {
      this.desactiveAnnonceArray = val;
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

  ngAfterContentChecked() {
    this.config = {
      slidesPerView: 2.1
    };
    this.config1 = {
      slidesPerView: 2
    };
  }
  
}
