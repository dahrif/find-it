import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  prepareValidationMessage(form ,validationMessage, formfields){
    for (const field in formfields){
      formfields[field]='';
      const control =form.controls[field];
      if (control && control.invalid){
        const messageObj = validationMessage[field];
  for (const key in control.errors){
    formfields[field]= formfields[field] +messageObj[key] + ' ';
  }
      }
    }
return formfields;
  }
}
