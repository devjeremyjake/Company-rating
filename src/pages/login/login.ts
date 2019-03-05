import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { RegisterProvider } from '../../providers/register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  loading: any;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private reg: RegisterProvider,
     private loadingCtrl: LoadingController,
     private alertCtrl: AlertController,
     private storage: Storage
     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register() {
    this.navCtrl.push("RegisterPage");
  } 

  // login script
  loginIn(){
    if(this.email !== undefined || this.password !== undefined){
      this.showLoading();
      this.reg.loginUser( this.email, this.password)
        .subscribe(res => {
          this.loading.dismiss();
          if(res.user){
          this.storage.set('useremail', res.user.email);
            this.navCtrl.setRoot("DashboardPage");
          }

          if(res.error){
            let alert = this.alertCtrl.create({
              title: 'Sign In Error',
              subTitle: res.error,
              buttons: ['OK']
            });

            alert.present();
          } 
        });

        this.password = '';
        this.email = '';

    } else {
      let alert = this.alertCtrl.create({
        title: 'Sign In Error',
        subTitle: 'You cannot submit empty fields',
        buttons: ['OK']
      });

      alert.present();
    }
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Logging In......'
    });

    this.loading.present();
  }

}
