import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs/Observable";




@Injectable()
export class MedicamentoService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public alertCtrl:AlertController
    ) {
  }


}




