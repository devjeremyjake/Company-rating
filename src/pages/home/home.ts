import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';

import { RegisterProvider } from '../../providers/register/register';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string;
  password: string;

  loading: any;

  constructor(public navCtrl: NavController,
     public NavParams: NavParams,
     private reg: RegisterProvider,
     private loadingCtrl: LoadingController,
     private alertCtrl: AlertController
     ) {

  }
     // console script toshow page actually loaded
    ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
    }
    
    // go to register page
  register() {
    this.navCtrl.setRoot(RegisterPage);
  } 
  // login script
  loginIn(){
    if(this.email !== undefined || this.password !== undefined){
      this.showLoading();
      this.reg.loginUser( this.email, this.password)
        .subscribe(res => {
          this.loading.dismiss();
          if(res.user){
            this.navCtrl.setRoot(DashboardPage);
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
 