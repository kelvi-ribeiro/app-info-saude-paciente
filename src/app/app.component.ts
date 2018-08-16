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
declare var window;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  user;

  @ViewChild(Nav) navCtrl: Nav;
  temRecursoBiometria: boolean = false;
  hasFinger: boolean = false;
  profileImage;

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
      this.events.subscribe('assinatura:adicionada', () => {
        this.hasFinger = true;
      });
      this.events.subscribe('foto:atualizada', (profileImage) => {
        this.profileImage = profileImage;
      })

      statusBar.styleDefault();
      splashScreen.hide();
      this.verificaUsuarioLogado();
      this.verificaRecursoBiometria();
    });
  }
  verificaUsuarioLogado() {
    if (this.storageService.getUser()) {
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
    const userCpf = (String(this.storageService.getUser().pessoa.cpf))
    this.keychainService.has(userCpf)
    .then(res=>{
      this.hasFinger = true
      console.log('this.hasFinger = false')
    })
    .catch(error=>{
      this.hasFinger = false;
    })

  })
  .catch((error: any) => console.error(error));
  }
  salvaBiometria(){
    const userCpf = (String(this.storageService.getUser().pessoa.cpf))
      this.secureStorageService.getSenha()
      .then((password)=>{
            this.keychainService.has(userCpf)
            .catch(res=>{
            this.keychainService.save(userCpf,String(password))
            .then((res)=>{
              this.hasFinger = true
            })
            .catch(error=>{
              this.hasFinger = false
              this.storageService.setUser(this.user);
            });
          })
          .catch(res=>console.log(res))


        });

    }
    removerBiometria(){
      const userCpf = (String(this.storageService.getUser().pessoa.cpf))
    return this.keychainService.delete(userCpf)
    .then(() => {
      this.hasFinger = false
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
