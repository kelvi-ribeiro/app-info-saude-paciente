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


  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";
  pureResult: any;
  maskedId: any;
  val: any;
  v: any;
  cpfValido;





  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public usuarioService:UsuarioService,
    public storageService:StorageService,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController) {

      this.creds.cpf = storageService.getCpf();
      this.creds.cpf = this.format(this.creds.cpf)


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
    this.retirarFormatacao()
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        loading.dismiss()
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.alertSalvarLogin(this.creds.cpf)
        this.navCtrl.setRoot(TabsPage);
      },
      error => {
        this.creds.cpf = this.format(this.creds.cpf)
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
    this.storageService.setCpf(cpf)
  }

  alertSalvarLogin(cpf){
    let alert = this.alertCtrl.create({
      title:'Salvar Login!',
      message:'Deseja Salvar o Seu CPF ?',
      buttons:[
        {
          text:'Sim',
          handler:() =>{
            this.salvarLogin(cpf)
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

  retirarFormatacao() {
     this.creds.cpf = this.creds.cpf.replace(/(\.|\/|\-)/g,"");
}

format(valString) {
  if (!valString) {
      return '';
  }
  let val = valString.toString();
  const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
  this.pureResult = parts;
  if(parts[0].length <= 11){
    this.maskedId = this.cpf_mask(parts[0]);
    this.cpfValido = this.pureResult;
    return this.maskedId;
  }else{
    return this.cpfValido;
  }
};
cpf_mask(v) {
  v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
  //de novo (para o segundo bloco de números)
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
  return v;
  }

  unFormat(val) {
    if (!val) {
        return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
        return val.replace(/,/g, '');
    } else {
        return val.replace(/\./g, '');
    }
}


}
