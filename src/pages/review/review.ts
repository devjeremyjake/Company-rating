import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  culture: number;
  benefits: number;
  balance: number;
  speed: number;
  review: string;


  companyProfile: any;
  name: string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams
     ) {
       this.companyProfile  = this.navParams.get("data");

       console.log(this.companyProfile);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

}
