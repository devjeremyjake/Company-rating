import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-companyprofile',
  templateUrl: 'companyprofile.html',
})
export class CompanyprofilePage {

  profile: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams
     ) {
      this.profile =  this.navParams.get("data");
      console.log(this.profile);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyprofilePage');
  }

  reviewPage(profile) {
    this.navCtrl.push("ReviewPage", {"data": profile});
  }

}
