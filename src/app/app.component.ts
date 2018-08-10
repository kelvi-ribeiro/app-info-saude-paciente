import { AuthService } from './../services/auth.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { StorageService } from './../services/storage.service';
import { Component, ViewChild } from '@angular/core';

import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  @ViewChild(Nav) navCtrl: Nav;
  temRecursoBiometria: boolean = false;
  constructor(
             public platform: Platform,
             public statusBar: StatusBar,
             public splashScreen: SplashScreen,
             public storageService:StorageService,
             public alertCtrl:AlertController,
             public authService:AuthService,
             public keychainService:KeychainTouchId
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.verificaUsuarioLogado()
    });
  }
  verificaUsuarioLogado() {
    if (this.storageService.getLocalUser()) {
        this.rootPage = TabsPage;
    } else {
      this.rootPage = LoginPage;
    }
  }
  openPage(page) {
    this.navCtrl.setRoot(TabsPage, { pagina: page });
  }

  openPageInicio() {
    TabsPage.index = 0;
    this.navCtrl.setRoot(TabsPage);
  }


  alertCertezaSair() {
    let alert = this.alertCtrl.create({
      title: "Logout!",
      message: "Você deseja se desconectar ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.authService.logout();
            this.navCtrl.setRoot(LoginPage);
          }
        },
        {
          text: "Não",
          handler: () => {
            this.storageService.setEmail(null);
          }
        }
      ]
    });
    alert.present();
  }
  verificaRecursoBiometria(){
   this.keychainService.isAvailable()
  .then(()=>{
    this.temRecursoBiometria = true;
  })
  .catch((error: any) => console.error(error));
  }
  salvaBiometria(){
    this.keychainService.save(this.storageService.getCpf(),"teste")
    .then((res)=>{
      console.log(res)
    })
    .catch((error: any) => console.error(error));
    }
}
