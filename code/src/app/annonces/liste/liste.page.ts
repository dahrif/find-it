import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.page.html',
  styleUrls: ['./liste.page.scss'],
})
export class ListePage implements OnInit {

  annonceArray!: any[]

  constructor(private annonceService : AnnonceService) { }

  ngOnInit() {
    this.annonceService.loadList().subscribe(val => {
      this.annonceArray = val;
      
    })
  }

  deleteAnnonce(annonceImgPath: any, id: any){

    if ((confirm('Êtes-vous sûr de supprimer cette annonce ?'))) {
      this.annonceService.deleteImage(annonceImgPath, id);
    }    
  }
  
  active(id: any, value: any){

    const activeData = {
      isActive: value
    }

    this.annonceService.markactive(id, activeData);
  }
}
