import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonce-card',
  templateUrl: './annonce-card.component.html',
  styleUrls: ['./annonce-card.component.scss'],
})
export class AnnonceCardComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() annonceData !: any;

  ngOnInit() {}

  navigate = () => {
    this.router.navigate(['/annonces',this.annonceData.id]);
    
  }


}
