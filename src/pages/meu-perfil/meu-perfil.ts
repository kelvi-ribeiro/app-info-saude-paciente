import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';

/**
 * Generated class for the MeuPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meu-perfil',
  templateUrl: 'meu-perfil.html',
})
export class MeuPerfilPage {
  cpfPessoa:string;
  perfil;
  constructor(
            public navCtrl: NavController,
            public usuarioService:UsuarioService,
            public storageService:StorageService) {
    this.cpfPessoa = this.storageService.getLocalUser().cpf
  }
  ionViewDidLoad(){
    this.obterDadosPerfil()
  }

  obterDadosPerfil(){
    this.usuarioService.findPacienteByPessoaCpf(this.cpfPessoa).subscribe(res=>{
      this.perfil = res;
      console.log(res)
      this.storageService.setUserName(res['pessoa'].nome)
    })
  }

}
