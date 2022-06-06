import { Component, OnInit } from '@angular/core';
import { Subscriber } from '../models/subscriber';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formVal: any){
    const subData : Subscriber = {
      name: formVal.name,
      email: formVal.email
  }
}

}
