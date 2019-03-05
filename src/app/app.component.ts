import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: any[];

  constructor(public platform: Platform,
     public statusBar: StatusBar,
     public splashScreen: SplashScreen,
     private storage: Storage 
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'DashboardPage', icon: 'home' },
      { title: 'Companies', component: 'CompaniesPage', icon: 'list-box' },
      { title: 'Search', component: 'ListPage', icon: 'search' },
      { title: 'LeaderBoard', component: 'ListPage', icon: 'archive' },
      { title: 'Review', component: 'ReviewPage', icon: 'star' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

     this.storage.get('useremail').then(loggedIn => {
       if (loggedIn === null) {
         this.nav.setRoot("LoginPage");
       }

       if (loggedIn !== null) {
          this.nav.setRoot("DashboardPage");
       }
     }); 
    });
  }

  openPage(page) {
      // if (page.component === "HomePage") {
      //   this.nav.setRoot(page.component);
      // }else {
      //   this.nav.push(page.component);
      // }
     this.nav.setRoot(page.component);
  }

  logout() {
    this.storage.remove('useremail');
      this.nav.setRoot("LoginPage");
  }
}
