import { Component } from '@angular/core';
import { IonicPage,
   NavController,
    NavParams,
     LoadingController,
      AlertController,
       ToastController 
      } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { RegisterProvider } from '../../providers/register/register';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  // variable decleration

  fullname: string;
  email: string;
  password: string;

  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private reg: RegisterProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private storage: Storage
     ) {
     }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad RegisterPage');
  }
   
  login() {
    this.navCtrl.setRoot("LoginPage");
  }

  usersignup(){
    if(this.fullname !== undefined || this.email !== undefined || this.password !== undefined){
      this.showLoading();
      this.reg.registerUser(this.fullname, this.email, this.password)
        .subscribe(res => {
          this.loading.dismiss();
          if(res.user){
            let toast = this.toastCtrl.create({
              message: res.message,
              duration: 4000,
              position: 'button' 
            });

            toast.present();

            this.storage.set('useremail', res.user.email);
            this.navCtrl.setRoot(" LoginPage");
          }

          if(res.error){
            let alert = this.alertCtrl.create({
              title: 'Sign Up Error',
              subTitle: res.error,
              buttons: ['OK']
            });

            alert.present();
          }
        });

        this.fullname = '';
        this.password = '';
        this.email = '';
    } else {
      let alert = this.alertCtrl.create({
        title: 'Sign Up Error',
        subTitle: 'You cannot submit empty fields',
        buttons: ['OK']
      });

      alert.present();
    }
  }
  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating Your Request....',
      duration: 4000
    });

    this.loading.present();
  }
}
