import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleAnnoncePageRoutingModule } from './single-annonce-routing.module';

import { SingleAnnoncePage } from './single-annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // SingleAnnoncePageRoutingModule
  ],
  declarations: []
})
export class SingleAnnoncePageModule {}
