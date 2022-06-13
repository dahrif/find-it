import { LoginPage } from './auth/login/login.page';
import { ListePage } from './annonces/liste/liste.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AddAnnoncePage } from './annonces/add-annonce/add-annonce.page';
import { SingleAnnoncePage } from './annonces/single-annonce/single-annonce.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'add-annonce',
    component: AddAnnoncePage,
  },
  {
    path: 'annonces',
    component: ListePage,
  },
  {
    path: 'liste',
    component: ListePage,
  },
  {
    path: 'annonce',
    component: SingleAnnoncePage,
  },
  {
    path: 'post/:id',
    component: SingleAnnoncePage,
  },
  {
    path: 'login',
    component: LoginPage
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
