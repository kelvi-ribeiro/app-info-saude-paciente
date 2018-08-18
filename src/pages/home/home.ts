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
  cpfPessoa:string;
  paciente: any;
  carregou: boolean;
  constructor(
            public navCtrl: NavController,
            public usuarioService:UsuarioService,
            public storageService:StorageService,
            public sanitazer: DomSanitizer,
            public events: Events) {
    this.cpfPessoa = this.storageService.getCpf()
  }
  ionViewDidLoad(){
    this.findPessoaByPessoaCpf()
  }

  

  findPessoaByPessoaCpf() {
    this.usuarioService
      .findPacienteByPessoaCpf()
      .then(paciente => {
        this.paciente = paciente;
        this.paciente.profileImage = this.sanitazer.bypassSecurityTrustUrl(
          this.storageService.getUser().imageDataUrl
        );
        this.carregou = true;
        this.getImageIfExists();
      })
      .catch(() => {
        this.carregou = true;
      });
  }

  getImageIfExists() {
    this.usuarioService.getImageFromBucket().subscribe(
      response => {
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.paciente.profileImage = this.sanitazer.bypassSecurityTrustUrl(
            str
          );
          this.paciente.imageDataUrl = str;
          this.storageService.setUser(this.paciente);
          this.events.publish("foto:atualizada", this.paciente.profileImage);
          this.carregou = true;
        });
      },
      error => {
        this.carregou = true;
        this.events.publish(
          "foto:atualizada",
          this.paciente.profileImage.changingThisBreaksApplicationSecurity
            ? this.paciente.profileImage
            : "assets/imgs/avatar-blank.png"
        );
      }
    );
  }

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = e => fulfill(reader.result);
      reader.readAsDataURL(blob);
    });
  }

}

