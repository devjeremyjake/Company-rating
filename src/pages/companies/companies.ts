import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyProvider } from '../../providers/company/company';

/**
 * Generated class for the CompaniesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html',
})
export class CompaniesPage {

  companies =  []; 

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private company: CompanyProvider) {
  }

  ionViewDidLoad() {
    this.getAllCompanies();
    console.log('ionViewDidLoad CompaniesPage');
    
  }

  getAllCompanies() {
    this.company.getCompanies()
      .subscribe(res => {
         this.companies = res.result;
      });
  }

  companyProfile(company) {
    this.navCtrl.push("CompanyprofilePage", {"data": company}); 
  }
}
