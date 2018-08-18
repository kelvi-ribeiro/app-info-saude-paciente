import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { UsuarioService } from '../../services/domain/usuario.service';

/**
 * Generated class for the FormAlterarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-alterar-senha',
  templateUrl: 'form-alterar-senha.html',
})
export class FormAlterarSenhaPage {
  formGroup:FormGroup;


  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder:FormBuilder,
              public notificacoesService:NotificacoesService,
              public usuarioService:UsuarioService
              ) {

    this.formGroup = this.formBuilder.group({
      senhaAtual: ['', [Validators.required]],
      novaSenha: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(60)]],
      confirmacaoNovaSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]]
    });
  }
  verificarSenhas(){
    if(this.formGroup.value.novaSenha != this.formGroup.value.confirmacaoNovaSenha){
      return  true
    }
    return  false
  }
  enviarNovaSenha(){
    if(this.verificarSenhas()){
      this.notificacoesService.presentToast('As senhas devem ser iguais','toast-error',2000,'middle')
      return
    }
    const objNovaSenha = {
      senhaAtual:this.formGroup.value.senhaAtual,
      novaSenha:this.formGroup.value.confirmacaoNovaSenha
    }
    this.usuarioService.alterarSenha(objNovaSenha)
    .then(()=>{
      this.notificacoesService.presentToast('Senha Alterada!','default',2000,'middle')
      this.navCtrl.pop()
    })
    .catch(()=>{
      this.notificacoesService.presentToast('Senhal atual é diferente da registrada no sitema','toast-error',2000,'middle')
    })
  }
}
