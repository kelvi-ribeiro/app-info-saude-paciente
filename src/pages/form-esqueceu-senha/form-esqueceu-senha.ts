import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/domain/usuario.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';

/**
 * Generated class for the FormEsqueceuSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-esqueceu-senha',
  templateUrl: 'form-esqueceu-senha.html',
})
export class FormEsqueceuSenhaPage {

  formGroup:FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder:FormBuilder,
              public usuarioService:UsuarioService,
              public notificacoesService:NotificacoesService,
              ) {

    this.formGroup = this.formBuilder.group({
      pessoaEmail: ['', [Validators.required, Validators.email,]],
      novaSenha: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(60)]],
      confirmacaoNovaSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]]
    });
  }

  verificarSenhas(){
    if(this.formGroup.value.novaSenha != this.formGroup.value.confirmacaoNovaSenha){
      this.notificacoesService.presentToast('As senhas devem ser iguais','toast-error',2000,'middle')
      return true
    }
    return false
  }

  enviarSenhaNova(){
    if(this.verificarSenhas()){
      return
    }
    const objNovaSenha = {
      pessoaEmail:this.formGroup.value.pessoaEmail,
      novaSenha:this.formGroup.value.novaSenha
    }
    const loading = this.notificacoesService.presentLoadingDefault('Aguarde...')
    this.usuarioService.esqueceuSenha(objNovaSenha)
    .then(()=>{
      this.notificacoesService.presentAlertJustMessage('Sucesso!!!','Verifique seu email para confirmar sua nova senha');
      loading.dismiss()
      this.navCtrl.pop();
    })
    .catch(() => {
        loading.dismiss()
        this.notificacoesService.presentAlertJustMessage('Falha!!!','Não foi possível encontrar alguém com esse email')

    })
  }
 

}
