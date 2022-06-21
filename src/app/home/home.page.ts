import { WidgetUtilService } from './../pages/providers/widget-util.service';
import { Router } from '@angular/router';
import { FirebaseAuthService } from './../pages/providers/firebase-auth.service';
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

  userEmail!: string;
  userData !: any;
  profileAvailable: boolean = false;
  profileInfo: any = {};

  constructor(
    private annonceService: AnnonceService,
    private categoryService: CategoryService,
    private firebaseAuthService:FirebaseAuthService, 
    private router: Router, 
    private widgetUtilService: WidgetUtilService
    
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
    this.getUserProfile();

  }

  getUserProfile() {
    this.profileAvailable = false;
    this.firebaseAuthService.getAuthState().subscribe(user => {
      if (user) {
        this.profileInfo = user.toJSON();
      }
      this.profileAvailable = true;
    }, (error) => {
      this.profileAvailable = true;
      this.widgetUtilService.presentToast(error.message);
      this.router.navigate(['/login']);
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
