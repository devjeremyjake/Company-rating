import { Component } from '@angular/core';
import { IonicPage,
     NavController,
     NavParams,
     LoadingController,
     AlertController, 
     ToastController,
      } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';

@IonicPage()
@Component({
  selector: 'page-createcompany',
  templateUrl: 'createcompany.html',
})
export class CreatecompanyPage {

      name: string;
      address: string;
      city: string;
      country: string;
      sector: string;
      website: string;
      userId: any;

      loading: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private company: CompanyProvider,
     private loadingCtrl: LoadingController,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController
     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCompanyPage');
  }

  ionViewDidEnter() {
    this.company.getUserData()
      .subscribe(res => {
        if(res.user !== null){
          this.userId = res.user._id;
        }
      });
  }

  register() {
    if( this.name !== undefined || this.address !== undefined || this.city !== undefined || this.country !== undefined || this.sector !== undefined || this.website !== undefined) {
      this.showLoading();
      this.company.createCompany(this.name, this.address, this.city, this.country, this.sector, this.website, this.userId)
        .subscribe(res => { 
          this.loading.dismiss();

          if(res.message){
            let toast = this.toastCtrl.create({
              message: res.message,
              duration: 4000,
              position: 'top' 
            });

            toast.present();
          }

          if(res.error) {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: res.error,
              buttons: ['OK']
            });
            alert.present();
          }
        });

        this.name = '';
        this.address = '';
        this.city = '';
        this.sector = '';
        this.website = '';
        this.country = '';
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
