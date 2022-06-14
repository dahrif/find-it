import { Component } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';

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
  categoryObj!: any;

  constructor(
    private annonceService: AnnonceService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.annonceService.loadActive().subscribe((val) => {
      this.activeAnnonceArray = val;
    });
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe((val) => {
      this.categoryArray = val;
    });

    // this.route.params.subscribe((val) => {
    //   this.categoryObj = val;

    //   this.annonceService
    //     .loadCategoryAnnonce(val['id'])
    //     .subscribe((annonce) => {
    //       this.annonceArray = annonce;
    //     });
    // });
  }

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }
}
