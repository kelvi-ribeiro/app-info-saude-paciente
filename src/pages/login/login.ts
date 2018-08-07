import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { CreadenciaisDTO } from '../../models/credenciais.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';

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
  email;
  perfis = [];
  creds : CreadenciaisDTO = {
    cpf: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public usuarioService:UsuarioService,
    public storageService:StorageService,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController) {

      this.creds.cpf = storageService.getEmail()

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewWillLeave(){

  }


  // ionViewDidEnter() {
  //   this.auth.refreshToken()
  //     .subscribe(response => {
  //       this.auth.successfulLogin(response.headers.get('Authorization'));
  //       this.navCtrl.setRoot(TabsPage);
  //     },
  //     error => {});
  // }

  login() {
    const loading = this.presentLoadingDefault()
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        loading.dismiss()
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.alertSalvarLogin(this.creds.cpf)
        this.navCtrl.setRoot(TabsPage);
      },
      error => {
        //this.showAlert();
        loading.dismiss()
      });
  }

  showAlert(){
    let alert = this.alertCtrl.create({
      title:'Falha!',
      message:'Falha na conexão, tente novamente...',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
          handler:() =>{

          }
        }
      ]

    });
    alert.present();
  }

  salvarLogin(cpf){
    this.storageService.setEmail(cpf)
  }

  alertSalvarLogin(email){
    let alert = this.alertCtrl.create({
      title:'Salvar Login!',
      message:'Deseja Salvar o Seu CPF ?',
      buttons:[
        {
          text:'Sim',
          handler:() =>{
            this.salvarLogin(email)
          }

        },
        {
          text:'Não',
          handler:()=> {
            this.storageService.setEmail(null)
          }
        }

      ]
    });
    alert.present();
   }
   presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Autenticando...'
    });

    loading.present();
    return loading;
  }

}
