
import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, Events } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { CreadenciaisDTO } from '../../models/credenciais.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';
import { SecureStorageService } from '../../services/secure-storage.service';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';

import { NotificacoesService } from '../../services/domain/notificacoes.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email;
  perfis = [];
  creds : CreadenciaisDTO = {
    cpf: "98380386019",
    senha: "123"
  };

  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";
  pureResult: any;
  maskedId: any;
  val: any;
  v: any;
  cpfValido;
  hasFingerprint;
  typeSenha: any = 'password';

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public usuarioService:UsuarioService,
    public storageService:StorageService,
    public alertCtrl:AlertController,    
    public events: Events,
    public secureStorageService:SecureStorageService,
    public keychainService:KeychainTouchId,
    public notificacoesService:NotificacoesService) {

      this.creds.cpf = "983.803.860-19";
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  ionViewDidLoad() {
    this.keychainService.isAvailable()
      .then((res: any) => {
        this.keychainService.setLocale('pt');
        this.hasFingerprint = true
      })
      .catch(err => this.hasFingerprint = false);
  }
  exibirSenhaInput(){
    if(this.typeSenha == 'password'){
      this.typeSenha = 'text'
      return;
    }
    this.typeSenha = 'password';

  }
  validarCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF === "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11), 10)) return false;
    return true;
}
  login() {
    const loading = this.notificacoesService.presentLoadingDefault('Autenticando...')
    const cpfSemFormatacao = this.retirarFormatacao(this.creds.cpf)
    if(this.validarCPF(cpfSemFormatacao)){
      const creds:CreadenciaisDTO = {
        cpf:cpfSemFormatacao,
        senha:this.creds.senha
      }
      this.auth.authenticate(creds)
        .subscribe(response => {
          loading.dismiss()
          this.auth.successfulLogin(response.headers.get('Authorization'))
          .then(()=>{           
            this.usuarioService
            .findPacienteByPessoaCpf()
            .then((paciente) => {
            if(paciente.pessoa.perfis.length === 0){
              this.notificacoesService
              .presentAlertDefault('Alerta','Seu Perfil Foi Inativado')
              this.storageService.limparStorage()
              return
            }
            this.secureStorageService.setSenha(this.creds.senha)
            this.alertSalvarLogin(this.creds.cpf);
            this.events.publish('buscar:foto');
            this.navCtrl.setRoot('HomePage');
          })          
          })
          .catch(()=>{
            this.notificacoesService.presentAlertJustMessage('Acesso negado','Você não tem permissão para acessar esse aplicativo')
          })  
        }, error => {                
           loading.dismiss();
           this.tratarErro(error);
          })
    }else{
      loading.dismiss();
      this.notificacoesService.presentAlertJustMessage('Falha!','CPF Inválido')
    }
  }
  tratarErro(error){
    if(error.status==401){
      this.notificacoesService.presentAlertJustMessage('Login ou senha incorreto','Favor, Verifique suas credenciais')
    }
    else if(error.status == 404 ||  error.status == 500){
    this.notificacoesService.presentAlertJustMessage('Servidor indisponível','Contate a equipe de suporte')
    }else if (error.status == 0){
      this.notificacoesService.presentAlertJustMessage('Problema na conexão','Verifique sua conexão com a internet')
    }
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

  retirarFormatacao(cpfFormatado) {
     return  cpfFormatado.replace(/(\.|\/|\-)/g,"");
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

     focusPasswordInput() {
    if(this.hasFingerprint){
      const cpfUsuario = String(this.retirarFormatacao(this.creds.cpf))
      this.keychainService.verify(cpfUsuario,"Coloque o Dedo no leitor")
      .then(password_user=>{
      this.creds.senha = password_user;
      this.login();
      this.events.publish('assinatura:adicionada')
      })
      .catch(error=>error)
    }
  }

}
