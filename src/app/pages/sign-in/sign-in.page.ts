import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/pages/welcome/providers/helper.service';
import { FirebaseAuthService } from '../providers/firebase-auth.service';
import { WidgetUtilService } from '../providers/widget-util.service';
import { LOGIN } from './../constants/formValidationMessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  formError: any = {
    email: '',
    password: ''
  };
  validationMessage: any = LOGIN; 
  showLoginSpinner: boolean = false;
 

  constructor(private helperService: HelperService, private router: Router, private firebaseAuthService: FirebaseAuthService,
    private widgetUtilService: WidgetUtilService) { }
 
  

  ngOnInit() {
    this.createFormControl();
    this.createForm();
    
  }

 
 createFormControl (){
 this.email = new FormControl('', [
  Validators.required,
  Validators.email
]);

this.password = new FormControl('', [
  Validators.required,
  Validators.minLength(8)
]);
 }

 createForm (){
  this.loginForm = new FormGroup ({
  email: this.email,
  password: this.password
  });

  this.loginForm.valueChanges.subscribe( data => this.onFormValueChanged(data));
}
resetForm() {
  this.loginForm.reset();
  this.formError = {
    email: '',
    password: ''
  };
}

async loginWithEmailPassword() {
  try {
    this.showLoginSpinner = true;
    const result = await this.firebaseAuthService.loginWithEmailPassword(this.email.value, this.password.value);
    console.log('result==', result);
    this.showLoginSpinner = false;
    this.widgetUtilService.presentToast('Login Success!');
    this.resetForm();
    this.router.navigate(['/tabs/home']);
  } catch (error) {
    console.log('Error', error);
    this.showLoginSpinner = false;
    this.widgetUtilService.presentToast(error.message);
  }
}


onFormValueChanged(data){
this.formError = this.helperService.prepareValidationMessage(this.loginForm, this.validationMessage, this.formError);
// console.log('===formError', this.formError);
}
}

