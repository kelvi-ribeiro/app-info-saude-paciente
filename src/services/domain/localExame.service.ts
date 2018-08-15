import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Http, Headers } from '@angular/http';


@Injectable()
export class LocalExameService {

  constructor(
    public http: Http,
    public storage: StorageService,
    public storageService: StorageService,
    public handlerResponseService:HandlerResponseProvider
    ) {
  }


  findAllLocaisExameByPacienteId() {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      let pacienteId = this.storage.getUser().id;
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/locaisExame?idPaciente=${pacienteId}`,
        null,
        headers
      );
    });
  }

  insert(localExame) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "post",
        `${API_CONFIG.baseUrl}/locaisExame`,
        localExame,
        headers
      );
    });
  }
  delete(id){
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "delete",
        `${API_CONFIG.baseUrl}/locaisExame/${id}`,
        null,
        headers
      );
    });
  }
  update(localExame,id) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "put",
        `${API_CONFIG.baseUrl}/locaisExame/${id}`,
        localExame,
        headers
      );
    });
  }
}
