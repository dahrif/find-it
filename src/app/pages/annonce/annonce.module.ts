import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnoncePageRoutingModule } from './annonce-routing.module';

import { AnnoncePage } from './annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnoncePageRoutingModule
  ],
  declarations: [AnnoncePage]
})
export class AnnoncePageModule {}
