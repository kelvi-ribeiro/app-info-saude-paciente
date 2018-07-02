import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs/Observable";
import { ToastController,NavController } from "ionic-angular";




@Injectable()
export class UtilsService {
  transformaDataPadraoAmericano(data:string){
    // Pega Mês
    // data.substr(data.indexOf('/')+1,data.lastIndexOf('/')-3)
    // Pega dia
    // data.substr(0,data.indexOf('/'))
    // Pega Ano
    // data.substr(data.lastIndexOf('/')+1,data.length -1 )
    let dataFormatada = new Date(parseInt(data.substr(data.lastIndexOf('/')+1,data.length -1 )),
    parseInt(data.substr(data.indexOf('/')+1,data.lastIndexOf('/')-3)) -1,
    parseInt(data.substr(0,data.indexOf('/')))
    );
      return dataFormatada.toISOString().substr(0, 10).split('/').reverse().join('-');
  }


}




