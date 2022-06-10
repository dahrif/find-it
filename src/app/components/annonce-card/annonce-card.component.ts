import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-annonce-card',
  templateUrl: './annonce-card.component.html',
  styleUrls: ['./annonce-card.component.scss'],
})
export class AnnonceCardComponent implements OnInit {

  constructor() { }

  @Input() annonceData !: any;

  ngOnInit() {}

}
