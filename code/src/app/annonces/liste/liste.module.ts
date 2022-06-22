import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListePageRoutingModule } from './liste-routing.module';

import { ListePage } from './liste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListePageRoutingModule
  ],
  declarations: []
})
export class ListePageModule {}
