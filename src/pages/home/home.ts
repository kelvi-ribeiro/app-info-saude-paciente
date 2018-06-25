import { UsuarioService} from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  emailPessoa:string;
  constructor(
            public navCtrl: NavController,
            public usuarioService:UsuarioService,
            public storageService:StorageService) {
    this.emailPessoa = this.storageService.getEmail()
  }
  ionViewDidLoad(){
    this.obterDadosPerfil()
  }

  obterDadosPerfil(){
    this.usuarioService.findPacienteByPessoaEmail(this.emailPessoa).subscribe(res=>{
      console.log(res)
    })
  }

}
