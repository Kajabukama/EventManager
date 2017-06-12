import { Component } from '@angular/core';
import { IonicPage, Loading,LoadingController, NavController,AlertController  } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';


@IonicPage({
   name:'login'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

   public signin:FormGroup;
   public loading:Loading;

   constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authProvider: AuthProvider, public formBuilder: FormBuilder) {

      this.signin = formBuilder.group({
         email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
         password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  loginUser(): void {
     if (!this.signin.valid){
        console.log(this.signin.value);
      } else {
         this.authProvider.loginUser(this.signin.value.email,
         this.signin.value.password)
         .then( authData => {
            this.loading.dismiss().then( () => {
               this.navCtrl.setRoot(HomePage);
            });
         }, error => {
            this.loading.dismiss().then( () => {
               let alert = this.alertCtrl.create({
                  message: error.message,
                  buttons: [
                     {text: "Ok",role: 'cancel'}
                  ]
               });
               alert.present();
            });
         });

         this.loading = this.loadingCtrl.create();
         this.loading.present();
      }
   }

   signup(): void {
      this.navCtrl.push('signup');
   }

   resetPassword(): void {
      this.navCtrl.push('reset-password');
   }

}
