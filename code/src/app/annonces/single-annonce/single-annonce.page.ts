import { AnnonceService } from 'src/app/services/annonce.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-annonce',
  templateUrl: './single-annonce.page.html',
  styleUrls: ['./single-annonce.page.scss'],
})
export class SingleAnnoncePage implements OnInit {

  annonceData : any;

  constructor(private route: ActivatedRoute, private annonceService : AnnonceService) { }

  ngOnInit() {
    this.route.params.subscribe(val =>{
      
      this.annonceService.loadOneData(val['id']).subscribe(annonce =>{
        this.annonceData = annonce;
      })
    })
  }

}
