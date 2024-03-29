
import {Events, NavController, NavParams, ViewController} from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { Component } from '@angular/core';


@Component({
  templateUrl: 'popover-meu-perfil.html',
})
export class PopoverMeuPerfilPage {
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
     this.events.publish('foto:meu-perfil',this.picture)
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
     this.events.publish('foto:meu-perfil',this.picture)
     this.sendPicture()
    }, (err) => {
    });
  }
  sendPicture() {
    this.usuarioService.uploadPicture(this.picture)
      .then(response => {
      this.events.publish('buscar:foto')
      },
     ).catch(()=>{
      this.notificacoesService
      .presentToast('Ocorreu Algum erro na tentiva de envio da foto, Desculpe, tente novamente','toast-error',3000,'middle');
      this.events.publish('foto:meu-perfil',"assets/imgs/avatar-blank.png")
     });
  }
  alterarSenha(){
    this.close()
    this.navCtrl.push('FormAlterarSenhaPage')
  }

}
