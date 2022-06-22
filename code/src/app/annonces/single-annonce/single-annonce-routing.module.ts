import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleAnnoncePage } from './single-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: SingleAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleAnnoncePageRoutingModule {}
