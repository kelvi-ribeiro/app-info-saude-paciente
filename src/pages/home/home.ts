import { UsuarioService} from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { NavController, IonicPage, Events } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  carregou: boolean;
  constructor(
            public navCtrl: NavController,
            public usuarioService:UsuarioService,
            public storageService:StorageService,
            public sanitazer: DomSanitizer,
            public events: Events) {

  }



}

