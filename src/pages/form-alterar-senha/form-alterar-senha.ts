import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { StorageService } from '../../services/storage.service';


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
              public usuarioService:UsuarioService,
              public keychainService:KeychainTouchId,
              public storageService:StorageService,
              public events: Events
              ) {

    this.formGroup = this.formBuilder.group({
      senhaAtual: ['', [Validators.required]],
      novaSenha: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(60)]],
      confirmacaoNovaSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]]
    });
    this.keychainService.isAvailable()
    .then(()=>{
      this.keychainService.has((String(this.storageService.getUser().pessoa.cpf)))
      .then(()=>{
        this.notificacoesService.presentToast('Sua Biometria será removida, caso altere sua senha','toast-attention',3000,'top')
      })
      .catch(error=>error)
    })
    .catch(error=>error)

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
      this.removerBiometria()
      this.notificacoesService.presentToast('Senha Alterada!','default',2000,'middle')
      this.navCtrl.pop()
    })
    .catch(()=>{
      this.notificacoesService.presentToast('Senhal atual é diferente da registrada no sistema','toast-error',2000,'middle')
    })
  }
  removerBiometria(){
  this.keychainService.isAvailable()
  .then(()=>{
    this.keychainService.has((String(this.storageService.getUser().pessoa.cpf)))
    .then(()=>{
      const userCpf = (String(this.storageService.getUser().pessoa.cpf))
      return this.keychainService.delete(userCpf)
      .then(() => {
      this.events.publish('biometria:removida')
      }, err => err);
    })
  .catch(error=>error)
  })
  .catch(error=>error)
}
}
