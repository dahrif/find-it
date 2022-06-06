import { SubscribersService } from './../services/subscribers.service';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from '../models/subscriber';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {

  isEmailError : boolean = false

  constructor(private subService : SubscribersService) { }

  ngOnInit(): void {
  }

  onSubmit(formVal: any){
    const subData : Subscriber = {
      name: formVal.name,
      email: formVal.email
  }

  // 

  this.subService.checkSubs(subData.email).subscribe(val => {
    console.log(val);
    
    if(val.empty){
      this.subService.addSubs(subData)
      
    }else{
      this.isEmailError = true;
    }
  })
}

}
