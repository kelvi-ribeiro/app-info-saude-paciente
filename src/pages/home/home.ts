import { UsuarioService} from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cpfPessoa:string;
  constructor(
            public navCtrl: NavController,
            public usuarioService:UsuarioService,
            public storageService:StorageService) {
    this.cpfPessoa = this.storageService.getCpf()
  }
  ionViewDidLoad(){
    this.obterDadosPerfil()
  }

  obterDadosPerfil(){
    this.usuarioService.findPacienteByPessoaCpf(this.cpfPessoa).subscribe(res=>{
      console.log(res)
    })
  }

}
