import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ViewController } from "../../node_modules/ionic-angular/navigation/view-controller";
import { Component } from "@angular/core";
import { UsuarioService } from "../services/domain/usuario.service";
import { StorageService } from "../services/storage.service";
import { NotificacoesService } from '../services/domain/notificacoes.service';
import {Events, NavController, NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'popover.html',
})
export class PopoverPage {
  picture;
  navCtrl;
  constructor(
    public navParams:NavParams,
    public viewCtrl:ViewController,
    public usuarioService:UsuarioService,
    public storageService:StorageService,
    public camera: Camera,
    public sanitazer:DomSanitizer,
    public events: Events,
    public notificacoesService:NotificacoesService
    ) {
    this.navCtrl = this.navParams.get('navCtrl');


}

  close() {
    this.viewCtrl.dismiss();
  }
  getCameraPicture() {
    this.close();
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
     this.sendPicture()
    }, (err) => {

    });
  }

  getGalleryPicture() {
    this.close();
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
     this.sendPicture()
    }, (err) => {
    });
  }
  sendPicture() {
    this.notificacoesService.presentToast('Fazendo upload, Aguarde...','toast-attention',1500,'middle');
    this.usuarioService.uploadPicture(this.picture)
      .then(response => {
      this.events.publish('buscar:foto')
      this.notificacoesService.presentToast('Foto Alterada, Caso não tenha alterado, atualize esta página',null,3000,'middle')
      },
      error => {
      this.notificacoesService
      .presentToast('Ocorreu Algum erro na tentiva de envio da foto, Desculpe, tente novamente','toast-error',3,'middle');
     });
  }
  alterarSenha(){
    this.close()
    this.navCtrl.push('FormAlterarSenhaPage')
  }

}
