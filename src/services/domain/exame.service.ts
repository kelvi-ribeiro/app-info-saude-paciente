import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Http, Headers } from '@angular/http';


@Injectable()
export class ExameService {

  constructor(
    public http: Http,
    public storage: StorageService,
    public storageService: StorageService,
    public handlerResponseService:HandlerResponseProvider
    ) {
  }

  findExamesByPacienteId() {
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
        `${API_CONFIG.baseUrl}/exames?idPaciente=${pacienteId}`,
        null,
        headers
      );
    });
  }
  insert(exame) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "post",
        `${API_CONFIG.baseUrl}/exames`,
        exame,
        headers
      );
    });
  }
  update(exame,id) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "post",
        `${API_CONFIG.baseUrl}/exames/${id}`,
        exame,
        headers
      );
    });
  }
  delete(id){
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      let headers = new Headers();
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "delete",
        `${API_CONFIG.baseUrl}/exames/${id}`,
        null,
        headers
      );
    });
  }
}




