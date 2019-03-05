import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

/*
  Generated class for the CompanyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompanyProvider {

  email: any;

  constructor(public http: HttpClient,
     private storage: Storage
     ) {
    
  }

  getUserData(): Observable<any>{
    this.getEmail();

    return this.http
      .get(`http://localhost:3000/api/home/${this.email}`);
  }

  getEmail(){
    this.storage.get('useremail').then(value => {
      this.email = value;
    });
  }

  createCompany(name, address, city, country, sector, website, userId? ): Observable<any> {
    return this.http
      .post('http://localhost:3000/api/company/create', {
          name: name,
          address: address,
          city: city,
          country: country,
          sector: sector,
          website: website,
          userId: userId 
      });

  }

  getCompanies(): Observable<any> {
    return this.http
      .get('http://localhost:3000/api/companies/all');
  }

}
