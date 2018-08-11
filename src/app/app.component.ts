import { AuthService } from './../services/auth.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { StorageService } from './../services/storage.service';
import { Component, ViewChild } from '@angular/core';

import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { SecureStorageService } from '../services/secure-storage.service.';
import { SecureStorage, SecureStorageObject } from '../../node_modules/@ionic-native/secure-storage';


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
  hasFinger: boolean

  @ViewChild(Nav) navCtrl: Nav;
  temRecursoBiometria: boolean = false;

  constructor(
             public platform: Platform,
             public statusBar: StatusBar,
             public splashScreen: SplashScreen,
             public storageService:StorageService,
             public alertCtrl:AlertController,
             public authService:AuthService,
             public keychainService:KeychainTouchId,
             public secureStorageService:SecureStorageService,
             public secureStorage:SecureStorage,
             private events: Events
              ) {
    platform.ready().then(() => {
      this.events.subscribe('user:logado', (hasFinger) => this.hasFinger = hasFinger);
      statusBar.styleDefault();
      splashScreen.hide();
      this.verificaUsuarioLogado();
      this.verificaRecursoBiometria();
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
      this.secureStorage.create('password_user')
      .then((storage:SecureStorageObject)=>{
        storage.get(STORAGE_KEYS.password)
        .then((password)=>{
          this.keychainService.save(String(this.storageService.getCpf()),String(password))
          .then((res)=>{
            this.hasFinger = true;
          })
          .catch((error: any) => (this.hasFinger = false));
        });
      });
    }
    removerBiometria(){
    return this.keychainService.delete(String(this.storageService.getCpf()))
    .then(() => {
      this.hasFinger = false;
    }, err => err);
  }
  alertRemoverBiometria(){
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      message: 'Deseja mesmo remover a biometria ?',
      buttons: [
        {
          text:"Sim",
          handler: () => {
            this.removerBiometria()
          }
        },
        {
          text: 'Não'
        }
      ]
    });
    alert.present();
  }
 }
