import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { Facebook } from '@ionic-native/facebook';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { AuthData } from '../../providers/auth-data';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  isLoggedIn: boolean = false;
  users: any;
  userProfile: any = null;
  //public loginForm;
  loading: any;
  loginForm: FormGroup;
  loginError: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public keyboard: Keyboard,
    public toastCtrl: ToastController,
    public forgotCtrl: AlertController,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    public formBuilder: FormBuilder,
    public authData: AuthData,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formbuilder: FormBuilder,
    public auth: AuthService) {


    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));

    this.loginForm = formbuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    console.log('login form initialisé');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  showKeyboard() {
    this.keyboard.show;
  }

  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => this.loginError = error.message
      );
  }

  userLogin() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
      let alert = this.alertCtrl.create({
        title: 'Bad Credentials',
        subTitle: 'Identifiant ou mot de passe incorrecte !',
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    } else {
      console.log('authent user')
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        this.loading.dismiss().then(() => {
          let alert = this.forgotCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  facebookLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === "connected") {
          this.isLoggedIn = true;
          //this.getUserDetail(res.authResponse.userID);
          this.navCtrl.setRoot(HomePage);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  /*googlePlusLogin() {
    this.auth.signInWithGoogle()
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => console.log(error.message)
      );
  }*/

  googlePlusLogin(): void {
    this.googlePlus.login({
      'webClientId': 'com.googleusercontent.apps.873981431086-pme9apf8fk9lq87pf4abgrgsfteq5ftq',
      'offline': true
    }).then(res => {
      console.log(res);
      this.navCtrl.setRoot(HomePage);
    })
      .catch(err => console.error(err));
  }

  forgotPass() {
    console.log("Mot de Passe oublié !");
    let forgot = this.forgotCtrl.create({
      title: 'Mot de passe oublié ?',
      message: "Entrez votre adresse mail pour recevoir la procédure de réinitialisation du mot de passe.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Retour',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Envoyer',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email envoyé avec succés',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }
}
