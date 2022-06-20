import { Injectable } from '@angular/core';
import { Platform, ToastController,LoadingController  } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WidgetUtilService {

  loading: any ={};

  constructor( private toastController:ToastController ,private platform: Platform, private loadingController: LoadingController) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message:message,
      duration: 1500,
      
      position:'top',
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
  
    });
   return  await this.loading.present();

  
  }

  async dismissLoader(){
    await this.loading.dismiss ();
  }
 
}
