import { API_CONFIG } from "./../../config/api.config";
import { StorageService } from "./../../services/storage.service";
import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  PopoverController,
  Platform
} from "ionic-angular";
import { UsuarioService } from "../../services/domain/usuario.service";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { NotificacoesService } from "../../services/domain/notificacoes.service";
import { DomSanitizer } from "@angular/platform-browser";
import {
  PhotoViewer,
  PhotoViewerOptions
} from "../../../node_modules/@ionic-native/photo-viewer";
import { PopoverMeuPerfilPage } from "../../popovers/popover-meu-perfil/popover-meu-perfil";



@IonicPage()
@Component({
  selector: "page-meu-perfil",
  templateUrl: "meu-perfil.html"
})
export class MeuPerfilPage {
  paciente;
  picture: string;
  apertouOpcaoFoto = false;
  tocouFoto = false;
  carregou = false;
  constructor(
    public navCtrl: NavController,
    public usuarioService: UsuarioService,
    public storageService: StorageService,
    public camera: Camera,
    public sanitazer: DomSanitizer,
    public events: Events,
    public notificacoesService: NotificacoesService,
    public popoverCtrl: PopoverController,
    public platform: Platform,
    private zone: NgZone
  ) {
    platform.ready().then(() => {
      this.events.subscribe("foto:meu-perfil", picture => {
          this.paciente.profileImage = picture
      });
    });
  }
  ionViewDidLoad() {
    this.findPessoaByPessoaCpf();

  }
  findPessoaByPessoaCpf() {
   return  this.usuarioService
      .findPacienteByPessoaCpf()
      .then(paciente => {
        this.paciente = paciente;
        this.pegarFotoUser()
        this.carregou = true;
      })
      .catch(() => {
        this.carregou = true;
      });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverMeuPerfilPage,{navCtrl:this.navCtrl});
    popover.present({
      ev: myEvent
    });
  }
  viewFoto() {
      if(this.paciente.profileImage.changingThisBreaksApplicationSecurity !=undefined){
        const photoViewer = new PhotoViewer();
      let options: PhotoViewerOptions = {
        share: true // default is false
      };
      photoViewer.show(
        `${API_CONFIG.bucketBaseUrl}/${
          this.storageService.getUser().pessoa.urlFoto
        }`,
        "Minha Foto de Perfil",
        options
      );

      }

  }
  pegarFotoUser(){
      if(this.storageService.getUser().imageDataUrl != undefined)
  {
      this.paciente.profileImage = this.sanitazer.bypassSecurityTrustUrl(
        this.storageService.getUser().imageDataUrl)
    }else{
      this.paciente.profileImage = "assets/imgs/avatar-blank.png"
    }
  }
  doRefresh(refresher){
    this.findPessoaByPessoaCpf().then(()=>{
    refresher.complete();
    });
}
}
