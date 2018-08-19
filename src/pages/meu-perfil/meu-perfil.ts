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
import { PopoverPage } from "../../popover/popover";
import {
  PhotoViewer,
  PhotoViewerOptions
} from "../../../node_modules/@ionic-native/photo-viewer";

/**
 * Generated class for the MeuPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
      this.events.subscribe("foto:enviada", () => {
        this.getImageIfExists();
      });
    });
  }
  ionViewDidLoad() {
    this.findPessoaByPessoaCpf();
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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage,{navCtrl:this.navCtrl});
    popover.present({
      ev: myEvent
    });
  }
  viewFoto() {
    this.zone.run(() => {
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
    });
  }
}
