import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs/Observable";
import { ToastController,NavController } from "ionic-angular";




@Injectable()
export class NotificacoesService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController

    ) {
  }

  presentToast(message:string,css:string,duration:number,position:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      cssClass:css
    });
    toast.present();
  }
  presentAlertDefault(title,message,page?,navCtrl?:NavController){
    let alert = this.alertCtrl.create({
      title:title,
      message:message,
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
          handler:() =>{
            if(page){
              navCtrl.setRoot(page)
            }else{
              console.log('chegou aqu')
              navCtrl.pop()
            }
          }
        }
      ]
    });
    alert.present();
  }



}




