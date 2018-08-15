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
  perfil;
  paciente;
  constructor(
            public navCtrl: NavController,
            public usuarioService:UsuarioService,
            public storageService:StorageService) {

  }
  ionViewDidLoad(){
    console.log(this.storageService.getUser())
    this.usuarioService.findPacienteByPessoaCpf()
    .then(paciente=>{
      this.paciente = paciente
    })
  }
}
