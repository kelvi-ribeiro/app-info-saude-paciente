import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Http, Headers } from '@angular/http';


@Injectable()
export class GoogleMapsService {

  constructor(
    public http: Http,
    public storage: StorageService,
    public storageService: StorageService,
    public handlerResponseService: HandlerResponseProvider
  ) {
  }

  findLocationByCep(cep) {
        return this.handlerResponseService.handlerResponse(
          "get",
          `${API_CONFIG.urlGeolocation}address=${cep.substr(0,5)}-${cep.substr(5,8)}&sensor=false&key=${API_CONFIG.apiKeyGeolocation}`,
          null,
          null
        );
  }
}




