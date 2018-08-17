import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { API_CONFIG } from '../../config/api.config';
import { DomSanitizer } from '@angular/platform-browser';

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
  picture: string;
  cameraOn: boolean = false;
  profileImage;
  apertouOpcaoFoto = false;
  mandandoFoto = false;
  tocouFoto = false;
  constructor(
            public navCtrl: NavController,
            public usuarioService:UsuarioService,
            public storageService:StorageService,
            public camera: Camera,
            public sanitazer:DomSanitizer,
            public events: Events,
            public notificacoesService:NotificacoesService) {

  }
  ionViewDidLoad(){
    console.log(this.storageService.getUser())
    this.usuarioService.findPacienteByPessoaCpf()
    .then(paciente=>{
      this.paciente = paciente
      this.getImageIfExists();
    })
  }
  getImageIfExists() {
    this.usuarioService.getImageFromBucket()
    .subscribe(response => {
      this.paciente.imageUrl = `${API_CONFIG.bucketBaseUrl}/${this.storageService.getUser().pessoa.urlFoto}`;
      this.blobToDataURL(response).then(dataUrl => {
        let str:string = dataUrl as string;
        this.profileImage = this.sanitazer.bypassSecurityTrustUrl(str);
        this.events.publish('foto:atualizada',this.profileImage)
      })
    },
    error => {
      this.profileImage = 'assets/imgs/avatar-blank.png';
    });
  }

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
  }

  getCameraPicture() {
    this.apertouOpcaoFoto = true;
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 65,
      targetWidth: 720,
      targetHeight: 720,
      correctOrientation:true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
     this.sendPicture()
    }, (err) => {
     this.cameraOn = false;
    });
  }

  getGalleryPicture() {
    this.cameraOn = true;
    this.apertouOpcaoFoto = true; // Também servindo para foto
    const options: CameraOptions = {
      quality: 65,
      targetWidth: 720,
      targetHeight: 720,
      allowEdit: true,
      correctOrientation:true,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
     this.sendPicture()
    }, (err) => {
     this.cameraOn = false;
    });
  }
  sendPicture() {
    this.notificacoesService.presentToast('Fazendo upload, sua foto será alterada dentro de alguns segundos...','toast-attention',3,'middle');
    this.mandandoFoto = true;
    this.apertouOpcaoFoto = false;
    this.usuarioService.uploadPicture(this.picture)
      .then(response => {
          this.getImageIfExists()
          this.notificacoesService.presentToast('Foto Alterada 😀',null,3,'middle')
      },
      error => {
      this.notificacoesService
      .presentToast('Ocorreu Algum erro na tentiva de envio da foto, Desculpe, tente novamente','toast-error',3,'middle');
     });
  }

  tocarFoto(){
    this.tocouFoto = true;
    setTimeout(() => {
      this.tocouFoto = false;
    }, 2000);

  }

}
