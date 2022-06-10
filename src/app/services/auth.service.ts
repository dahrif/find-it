import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) { }

  login(email:any, password:any){
    this.afAuth.signInWithEmailAndPassword(email, password).then(logRef =>{
      this.toastr.success('Logged in Successfully');
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/']);
    }).catch(e =>{
      this.toastr.warning("email or password incorrect");
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user =>{
      localStorage.setItem('user', JSON.stringify(user));    
    });
  }


  logOut(){
    this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
    this.router.navigate(['/login']);
    });
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }


}
