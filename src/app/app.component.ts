import { FirebaseAuthService } from './pages/providers/firebase-auth.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { WidgetUtilService } from './pages/providers/widget-util.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isLoggedIn: boolean = false;

  constructor(
    private platform: Platform, 
    private firebaseAuthService: FirebaseAuthService,
    private router: Router,
    private widgetUtilService: WidgetUtilService) {

      this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("ready");
      
    });
    this.getAuthState();
  }



  getAuthState() {
    this.widgetUtilService.presentLoading();
    this.firebaseAuthService.getAuthState().subscribe(user => {
      console.log('user auth state===', user ? user.toJSON() : null);
      if (user) {
        this.isLoggedIn = true;
        localStorage.setItem('user',''+JSON.stringify(user))
      } else {
        this.isLoggedIn = false;
      }
      this.handleNavigation();
      this.widgetUtilService.dismissLoader();

    // }, (error) => {
    //   this.widgetUtilService.dismissLoader();
    //   this.widgetUtilService.presentToast(error.message);
    });
  }

  handleNavigation() {
    if (this.isLoggedIn) {
  console.log('route==', this.router.url.split('/')[1]);
const currentUrl = this.router.url.split('/')[1];
if (currentUrl === 'login' || currentUrl === 'register') {
this.router.navigate(['home']);
}
    } else {
      this.router.navigate(['login'])
    }
  }
}
