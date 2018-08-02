import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { AuthService } from '../services/auth.service';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SplashPage } from '../pages/splash/splash';
//import { Register1Page } from '../pages/Register1/Register1';
//import { Register2Page } from '../pages/Register2/Register2';
//import { Register3Page } from '../pages/Register3/Register3';
//import { Register4Page } from '../pages/Register4/Register4';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage ;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public keyboard: Keyboard, 
    modalCtrl: ModalController,
    private auth: AuthService) {
    platform.ready().then(() => {
 
      statusBar.styleDefault();

      let splash = modalCtrl.create(SplashPage);
      splash.present();

  });
   this.auth.afAuth.authState
  .subscribe(
    user => {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    },
    () => {
      this.rootPage = LoginPage;
    }
  ); 
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Statistiques', component: HomePage },
      { title: 'Blog', component: ListPage },
      { title: 'Informations', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
