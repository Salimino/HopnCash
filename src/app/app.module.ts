import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { AuthService } from '../services/auth.service';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SplashPage } from '../pages/splash/splash';
import { AuthData } from '../providers/auth-data';
//import { Register1Page } from '../pages/Register1/Register1';
//import { Register2Page } from '../pages/Register2/Register2';
//import { Register3Page } from '../pages/Register3/Register3';
//import { Register4Page } from '../pages/Register4/Register4';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SplashPage,
    LoginPage//,
    //Register1Page,
    //Register2Page,
    //Register3Page,
    //Register4Page,
  ],
  imports: [
    NgxErrorsModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SplashPage,
    LoginPage//,
    //Register1Page,
    //Register2Page,
    //Register3Page,
    //Register4Page
  ],
  providers: [
    StatusBar,
    Keyboard,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    GooglePlus,
    AuthData,
    AngularFireAuth,
    AuthService
  ]
})
export class AppModule {}
