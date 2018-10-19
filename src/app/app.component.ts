import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from './../services/domain/usuario.service';
import { AuthService } from './../services/auth.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { StorageService } from './../services/storage.service';
import { Component, ViewChild } from '@angular/core';

import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { LoginPage } from '../pages/login/login';

import { SecureStorageService } from '../services/secure-storage.service';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';



declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  paciente;

  @ViewChild(Nav) navCtrl: Nav;
  temRecursoBiometria: boolean = false;
  hasFinger: boolean = false;
  profileImage;

  constructor(
             private platform: Platform,
             private statusBar: StatusBar,
             private splashScreen: SplashScreen,
             private storageService:StorageService,
             private alertCtrl:AlertController,
             private authService:AuthService,
             private keychainService:KeychainTouchId,
             private secureStorageService:SecureStorageService,             
             private events: Events,
             private usuarioService:UsuarioService,
             private sanitazer:DomSanitizer,
             private nativePageTransitions:NativePageTransitions
              ) {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#8299EC');
      this.events.subscribe('assinatura:adicionada', () => {
        this.hasFinger = true;
      });
      this.events.subscribe('foto:atualizada', (profileImage) => {
        this.profileImage = profileImage;
      })

      this.events.subscribe('biometria:removida', () => {
        this.hasFinger = false;
      });

      this.events.subscribe('buscar:foto', () => {
        this.getImageIfExists()
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.verificaUsuarioLogado()
      if(window.cordova){
        this.verificaRecursoBiometria();
      }
    });
  }
  verificaUsuarioLogado() {    
    if (!this.storageService.getUser()) {
        this.rootPage = LoginPage;        
        return
    }
    this.getImageIfExists()
    this.rootPage = 'HomePage'       
  }
  setUserOnline(pessoaId){
    this.usuarioService.setUserOnline(pessoaId);
    setTimeout(() => {
      if(this.storageService.getUser()){
        this.setUserOnline(this.storageService.getUser().pessoa.id)
      }
    }, 30000);
  }

  openPage(page) {
    const options: NativeTransitionOptions = {
    direction: 'up',
    duration: 500,    
    androiddelay: 500,    
    }
    this.nativePageTransitions.fade(options)
    this.navCtrl.setRoot(`${page}`);
    return;
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

  getImageIfExists() {
    if(!this.storageService.getUser().pessoa.url){
     this.usuarioService.findPacienteByPessoaCpf()
     .then(paciente => {
       this.paciente = paciente
       this.storageService.setUser(paciente)
       this.setUserOnline(paciente.pessoa.id);
       this.usuarioService.getImageFromBucket(paciente.pessoa.urlFoto).subscribe(
        response => {
          this.blobToDataURL(response).then(dataUrl => {
            let str: string = dataUrl as string;
            this.paciente.profileImage = this.sanitazer.bypassSecurityTrustUrl(
              str
            );
            this.paciente.imageDataUrl = str;
            this.storageService.setUser(this.paciente);
            this.events.publish("foto:atualizada", this.paciente.profileImage);
          });
        },
        error => {
          this.events.publish(
            "foto:atualizada",
            this.paciente.profileImage
              ? this.paciente.profileImage
              : "assets/imgs/avatar-blank.png"
          );
        }
      );
     })
     return;
    }
    this.usuarioService.getImageFromBucket().subscribe(
      response => {        
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.paciente.profileImage = this.sanitazer.bypassSecurityTrustUrl(
            str
          );
          this.paciente.imageDataUrl = str;
          this.storageService.setUser(this.paciente);
          this.events.publish("foto:atualizada", this.paciente.profileImage);

        });
      },
      error => {

        this.events.publish(
          "foto:atualizada",
          this.paciente.profileImage
            ? this.paciente.profileImage
            : "assets/imgs/avatar-blank.png"
        );
      }
    );
  }

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = e => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }
 }
