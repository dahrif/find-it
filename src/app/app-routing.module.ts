import { ListePage } from './annonces/liste/liste.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AddAnnoncePage } from './annonces/add-annonce/add-annonce.page';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    

  },
  {path: 'login', component: LoginComponent},

  {
    path: 'add-annonce',
    component: AddAnnoncePage
  },
  {
    path: 'annonces',
    component: ListePage
  },
  {
    path: 'liste',
    loadChildren: () => import('./annonces/liste/liste.module').then( m => m.ListePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
