import { WidgetUtilService } from './../providers/widget-util.service';
import { FirebaseAuthService } from './../providers/firebase-auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail!: string;
  isLoggeIn$ !: Observable<boolean>;
  userData !: any;
  profileAvailable: boolean = false;
  profileInfo: any = {};

  constructor(private firebaseAuthService:FirebaseAuthService, private router: Router, private widgetUtilService: WidgetUtilService) {}

  ngOnInit() {
    this.getUserProfile();
  }

  
  getUserProfile() {
    this.profileAvailable = false;
    this.firebaseAuthService.getAuthState().subscribe(user => {
      if (user) {
        this.profileInfo = user.toJSON();
      }
      this.profileAvailable = true;
    }, (error) => {
      this.profileAvailable = true;
      this.widgetUtilService.presentToast(error.message);
      this.router.navigate(['/login']);
    });
  }

  async logout() {
    try {
      await this.firebaseAuthService.logout();
      this.widgetUtilService.presentToast('Logout Success');
      this.router.navigate(['/login']);
      window.location.reload();
      localStorage.removeItem('user');
    } catch (error) {
      console.log('Error', error);
      this.widgetUtilService.presentToast(error.message);
    }
  }


}
