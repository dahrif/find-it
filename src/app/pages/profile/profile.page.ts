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

  constructor(private authService : AuthService, private router: Router) {}

  ngOnInit() {

    if(this.authService.isLoggedIn){
      this.userEmail = JSON.parse (localStorage.getItem('user') || '{}').email;
    }
    

  }

  logOut(){
    this.authService.SignOut();
    this.router.navigate(['/login']);
     window.location.reload();
  }


}
